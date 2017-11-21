const express = require('express')
const redisClient = require('../connect_database')
const router = express.Router()

router.get('/', function (req, res, next) {
  if (req.session && req.session.user) {
    if (redisClient.exists(req.session.user) !== 0) {
      res.json({user: req.session.user, currentGraph: 'javascript'})
    } else res.redirect('/login')
  } else res.redirect('/login')
})

module.exports = router
