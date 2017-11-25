const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  if (req.session && req.session.user) req.session.destroy()
  res.send('logged out')
})

module.exports = router
