var express = require('express');
var router = express.Router();
const Stock = require('../controllers/stock');
const Util = require('../controllers/util');

router.post('/buy', function (req, res, next) {
    Util.convertCurrency(req.body.cashCurrency, req.body.stockCurrency, req.body.cash)
        .then(convertedCash => {
            Stock.getPrice(req.body.symbol).then(stockPrice => {
                // Stock.buy(req.degiroInstance, req.body.stockId, stockPrice, Stock.calculateTradeSize(convertedCash, stockPrice));
                res.json({
                    orderId: 1,
                    price: stockPrice,
                    quantity: Stock.calculateTradeSize(convertedCash, stockPrice)
                });
            })
        });
});

router.post('/sell', function (req, res, next) {
    Stock.getPrice(req.body.symbol)
        .then(stockPrice => {
            // Stock.sell(req.degiroInstance, req.body.stockId, stockPrice, req.body.quantity);
            res.json({
                orderId: 2,
                price: stockPrice
            });
        })
});

module.exports = router;
