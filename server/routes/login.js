const express = require('express')
const bcrypt = require('bcrypt')
const redisClient = require('../db_utils')
const router = express.Router()

router.post('/', function (req, res, next) {
  redisClient.hmget('user:' + req.body.username,
                    'password',
                    'active',
                    function (err, dbres) {
                      if (err) res.send('database error')

                      const hash = dbres[0]
                      const active = dbres[1]
                      if (hash !== null && active !== '0') {
                        bcrypt.compare(req.body.password, hash, function (berr, bres) {
                          if (berr) res.send(berr.message)
                          if (bres === true) {
                            req.session.user = req.body.username
                            res.redirect('/dashboard')
                          } else res.send('password is wrong')
                        })
                      } else if (active === '0') res.send('this account is closed')
                        else res.send('user doesn\'t exist')
                    })
})

router.get('/', function (req, res, next) {
  res.send('Redirected to login')
})

module.exports = router
