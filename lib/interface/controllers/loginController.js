'use strict';

const authUsecase = require('../../app/use_cases/auth/auth');
const { loginAttemp } = require('../../infrastructure/repositories/userRepository');
const checkPassword = require('../../app/use_cases/auth/comparePassword');

module.exports = {
    
    index(req, res) {
        const data = {
            template: {
                'title': 'Login',
                'pageName': 'Login Page',
                'attempLogin': req.session.attempLogin
            }
        }
        delete req.session.attempLogin;
        return res.render('pages/login', data);
    },

    async attempLogin(req, res) {
        try {
            let login = await authUsecase(req.body.username, loginAttemp);
            if (login.length === 1) {
                let checkPass = await checkPassword(req.body.password, login[0].password);
                if (checkPass) {
                    delete login[0].password;
                    req.session._authData = login[0]
                    res.redirect('/');
                    return;
                }
                req.session.attempLogin = 'failed';
                return res.redirect('/auth');
            }
            req.session.attempLogin = 'failed';
            return res.redirect('/auth')
        } catch (error) {
            throw `Error while try to login. Message: ${error}`;
        }
    },

    signOut(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                req.session.attempLogout = 'failed';
                res.redirect('/');
            }
            res.redirect('/auth');
        })
    }

}