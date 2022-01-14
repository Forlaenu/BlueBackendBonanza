function checkAuth(req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({
            error: 'please log in'
        })
    }
}

module.exports = checkAuth;