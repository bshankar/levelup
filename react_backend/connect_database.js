var redis = require('redis')

var redisClient = redis.createClient()
redisClient.on('connect', function () {
  console.log('database connected')
})

module.exports = redisClient
