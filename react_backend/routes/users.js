const express = require('express')
const redisClient = require('../connect_database')
const router = express.Router()

router.get('/:user/graph/:graph', function (req, res, next) {
  redisClient.get(req.params.user + ':graph:' + req.params.graph, function (dberr, dbres) {
    if (dberr) res.send('database error')
    if (dbres !== null) res.send(dbres)
    else res.send('This graph was not found')
  })
})

router.post('/:user/graph/:graph', function (req, res, next) {
  redisClient.set(req.params.user + ':graph:' + req.params.graph, req.body, function (dberr, dbres) {
    if (dberr) res.send('database error')
    res.send('ok')
  })
})

module.exports = router
