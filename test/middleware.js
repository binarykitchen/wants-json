const wanstJson = require('../')
const test = require('tape')
const express = require('express')
const request = require('superagent')

var app = express()

app.use(wanstJson())

app.get('/test', function (req, res) {
  console.log('req.wantsJson()', req.wantsJson())
  res.json({ result: req.wantsJson() })
})

var server = app.listen(3210)

function doRequest (type, t, cb) {
  request
    .get('http://localhost:3210/test')
    .set('Accept', type)
    .end(function (err, res) {
      t.error(err, 'no error is thrown')
      t.equal(res.status, 200, 'status is 200')
      cb(res.body)
      t.end()
    })
}

test('middleware with:', function (t) {
  t.test('application/json', function (t) {
    doRequest('application/json', t, function (body) {
      t.ok(body.result, 'result is true')
    })
  })

  t.test('html/json', function (t) {
    doRequest('html/json', t, function (body) {
      t.notOk(body.result, 'result is false')
    })
  })

  t.test('png', function (t) {
    doRequest('png', t, function (body) {
      t.notOk(body.result, 'result is false')
    })
  })
})

test('teardown', function (t) {
  server.close()
  t.end()
})
