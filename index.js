module.exports = function() {

    return function(req, res, next) {

        req.wantsJson = function wantsJson() {
            return this.accepts('html', 'json') === 'json'
        }

        next()
    }
}
