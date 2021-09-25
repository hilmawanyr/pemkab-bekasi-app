'use strict';

module.exports = {

    isLoggedIn(req, res, next) {
        if (req.session._authData) {
            return res.redirect('/');
        }
        next();
    },

    isAuthenticated(req, res, next) {
        if (req.session._authData === undefined) {
            return res.redirect('/auth');
        }
        next();
    }
    
}