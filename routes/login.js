var express = require('express');
var router = express.Router();
const DeGiro = require('degiro-api').default;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("Login");
});

module.exports = router;
