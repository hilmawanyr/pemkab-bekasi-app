const User = require('../../domain/user');
const addUser = require('../../app/use_cases/user/addUser');
const showUsers = require('../../app/use_cases/user/showAllUser');
const controlStatusUser = require('../../app/use_cases/user/controlStatusUser');
const findUser = require('../../app/use_cases/user/findUser');
const updateUser = require('../../app/use_cases/user/updateUser');
const removeUser = require('../../app/use_cases/user/deleteUser');
const { showAll, create, controlStatus, find, update, remove } = require('../../infrastructure/repositories/userRepository');
const hash = require('../../app/use_cases/auth/hashPassword');
const moment = require('moment');

const _getDate = () => {
    let timenow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    return timenow;
}

module.exports = {

    async index(req, res) {
        let data = {
            template: {
                pageTitle: 'Pengguna',
                pageName: 'Kelola Pengguna',
                page: 'user'
            },
            users: await showUsers(showAll)
        }
        return res.render('partials/template', data)
    },

    async createNew(req, res) {
        try {
            let { username, role, email, status } = req.body;
            const pass = await hash(username);
            const user = new User(username, pass, role, email, (status === undefined ? 1 : 0), req.session._authData.username);
            const persist = await addUser(user, create);
            return res.redirect('/user');
        } catch (err) {
            return res.status(500).json({
                status: 88,
                description: 'error process',
                message: err
            })
        }
    },

    async setStatus(req, res) {
        try {
            let id = req.params.username;
            let status = req.params.status === 'active' ? 0 : 1;
            let suspend = await controlStatusUser(id, status, controlStatus);
            if (suspend.toString() === '1') {
                return res.status(200).json({
                    status: 1,
                    description: 'success'
                });
            }
            return res.status(500).json({
                status: 88,
                description: 'error process'
            });
        } catch (err) {
            return res.status(500).json({
                status: 88,
                description: 'error process',
                message: err
            });
        }
    },

    async find(req, res) {
        try {
            let username = req.params.username;
            let user = await findUser(username, find);
            return res.json({
                status: 1,
                description: 'success',
                message: 'user found',
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                status: 88,
                description: 'error process',
                message: err
            });
        }
    },

    async update(req, res) {
        try {
            let { updateusername, email, role, status } = req.body;
            let updUser = await updateUser(updateusername, email, role, status, update);
            return res.redirect('/user');
        } catch (err) {
            return res.status(500).json({
                status: 88,
                description: 'error process',
                message: err
            });
        }
    },

    async remove(req, res) {
        try {
            let id = req.params.username;
            let now = _getDate();
            let rmUser = await removeUser(id, req.session._authData.username, now, remove);
            if (rmUser.toString() === '1') {
                return res.status(200).json({
                    status: 1,
                    description: 'success'
                });
            }
            return res.status(500).json({
                status: 88,
                description: 'error process'
            });
        } catch (err) {
            return res.status(500).json({
                status: 88,
                description: 'error process',
                message: err
            });
        }
    }

}