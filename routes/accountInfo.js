var express = require('express');
var router = express.Router();
const User = require('../controllers/user');

router.get('/', function (req, res) {
    User.getCashFunds(req.degiroInstance).then(funds => {
        res.json(funds);
    }).catch(error => res.status(500).json(error));
});

module.exports = router;
