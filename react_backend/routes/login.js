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

                      const pass = dbres[0]
                      const active = dbres[1]
                      if (pass !== null && pass === req.body.password && active !== '0') {
                        res.send('ok')
                      } else if (active === '0') res.send('this account is closed')
                        else res.send('invalid username/password')
                    })
})

module.exports = router
