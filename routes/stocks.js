var express = require('express');
var router = express.Router();
const Stock = require('../controllers/stock');
const Util = require('../controllers/util');

router.post('/buy', function (req, res, next) {
    Util.convertCurrency(req.body.cashCurrency, req.body.stockCurrency, req.body.cash - (process.env.SAFETY_NET || 0))
        .then(convertedCash => {
            Stock.getPrice(req.body.symbol)
                .then(price => {
                    // +0.01, because price might have increased before the order is executed
                    price = (price + 0.01).toFixed(2);
                    const quantity = Stock.calculateTradeSize(convertedCash, price);
                    
                    if(quantity <= 0)
                        next('Insufficient cash to buy this stock');

                    Stock.buy(req.degiroInstance, req.body.stockId, price, quantity)
                        .then(orderId => {
                            return res.json({
                                orderId,
                                price,
                                quantity
                            });
                        }, next)
                }, next)
        }, next)
});

router.post('/sell', function (req, res, next) {
    Stock.getPrice(req.body.symbol)
        .then(price => {
            Stock.sell(req.degiroInstance, req.body.stockId, price, 9)
                .then(orderId => {
                    return res.json({
                        orderId,
                        price
                    });
                }, next)
        }, next)
});

module.exports = router;
