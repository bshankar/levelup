var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.send('will handle login here')
})

module.exports = router
