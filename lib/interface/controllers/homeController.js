'use strict';

module.exports = {

    index(req, res) {
        const data = {
            template: {
                pageTitle: 'Home Page',
                pageName: 'Home',
                page: 'home'
            }
        }
        res.render('partials/template', data);
    }    

}