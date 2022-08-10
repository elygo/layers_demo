/**
 * auth function which checks if data belongs to user
 */
function auth (req, res, next) {
    if (req.cookies.userName == null) {
        res.status(403)
        return res.redirect('/login');
    }
    next()
}

/**
 * admin function which checks if data belongs to admin
 */
function admin (req, res, next) {
    if (req.cookies.userRole !== 'admin') {
        res.status(403)
        return res.redirect('/login');
    }
    next()
}

module.exports = { auth, admin };