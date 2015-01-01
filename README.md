# wants-json

[![Build Status](https://travis-ci.org/binarykitchen/wants-json.svg?branch=master)](https://travis-ci.org/binarykitchen/wants-json)

A tiny ExpressJS middleware to figure out if a JSON response is wanted.

When you have a single page app, you probably communicate in JSON with the server. But on the first page load you send the HTML. With this middleware you can distinct between these two requests.

## ExpressJS middleware example for single page apps

```js
var wantsJson = require('wants-json'),
    express   = require('express'),
    app       = express()

app.use(wantsJson())

app.get('/data', function(req, res, ext) {
    if (req.wantsJson()) {
        // load data and send to client
    } else {
        // send single page app
        next && next()
    }
})
```
