var express = require('express');
var router = express.Router();
const Stock = require('../controllers/stock');

router.get('/', function (req, res, next) {
    Stock.search(req.degiroInstance, req.query.text).then(results => {
        res.status(200).json(results);
    }).catch(next);
});

module.exports = router;
