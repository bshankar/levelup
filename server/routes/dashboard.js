const express = require('express')
const redisClient = require('../db_utils')
const router = express.Router()

router.get('/', function (req, res, next) {
  if (req.session && req.session.user) {
    res.json({user: req.session.user, currentGraph: 'javascript'})
  } else res.redirect('/login')
})

module.exports = router
