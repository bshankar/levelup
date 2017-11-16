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
                      if (hash !== null) res.send('user already exists.')
                      else {
                        bcrypt.genSalt(10, function (err, salt) {
                          if (err) res.send(err.message)
                          bcrypt.hash(req.body.password, salt, function (err, h) {
                            if (err) res.send(err.message)
                            redisClient.hmset('user:' + req.body.username,
                                              'password', h,
                                              'active', '1',
                                              function (dberr, dbres) {
                                                if (dberr) res.send(dberr)
                                                res.send('ok')
                                              }
                            )
                          })
                        })
                      }
                    })
})

module.exports = router
