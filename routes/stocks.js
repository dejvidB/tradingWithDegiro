var express = require('express');
var router = express.Router();
const Stock = require('../controllers/stock');
const Util = require('../controllers/util');

router.post('/buy', function (req, res, next) {
    Util.convertCurrency(req.body.cashCurrency - process.env.DEGIRO_TRANSACTION_FEES, req.body.stockCurrency, req.body.cash)
        .then(convertedCash => {
            Stock.getPrice(req.body.symbol)
                .then(price => {
                    const quantity = Stock.calculateTradeSize(convertedCash, price);
                    Stock.buy(req.degiroInstance, req.body.stockId, price, quantity)
                        .then(orderId => {
                            return res.json({
                                orderId,
                                price,
                                quantity
                            });
                        })
                })
        })
});

router.post('/sell', function (req, res, next) {
    Stock.getPrice(req.body.symbol)
        .then(stockPrice => {
            Stock.sell(req.degiroInstance, req.body.stockId, stockPrice, req.body.quantity)
                .then(orderId => {
                    return res.json({
                        orderId: orderId,
                        price: stockPrice
                    });
                })
        })
});

module.exports = router;
