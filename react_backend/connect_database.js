const redis = require('redis')

const redisClient = redis.createClient()
redisClient.on('connect', function () {
  console.log('database connected')
})

module.exports = redisClient
