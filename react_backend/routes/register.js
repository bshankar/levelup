var express = require('express')
var redis = require('redis')
var bcrypt = require('bcrypt')

var router = express.Router()

var redisClient = redis.createClient()
redisClient.on('connect', function () {
  console.log('database connected')
})

router.post('/', function (req, res, next) {
  // register user
})

module.exports = router
