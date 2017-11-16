var express = require('express')
var redis = require('redis')
var bcrypt = require('bcrypt')

var router = express.Router()

var redisClient = redis.createClient()
redisClient.on('connect', function () {
  console.log('database connected')
})

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
                          if (bres === true) res.send('ok')
                          else res.send('password is wrong')
                        })
                      } else if (active === '0') res.send('this account is closed')
                        else res.send('user doesn\'t exist')
                    })
})

module.exports = router
