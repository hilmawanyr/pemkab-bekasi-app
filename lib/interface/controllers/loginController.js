'use strict';

module.exports = {
    
    index(req, res) {
        const data = {
            template: {
                'title': 'Login',
                'pageName': 'Login Page'
            }
        }
        res.render('pages/login', data);
    },

}