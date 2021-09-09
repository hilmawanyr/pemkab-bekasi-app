'use strict';

const { User, sequelize, QueryTypes, Op } = require('../orm/models/userModel');

module.exports = {

    async create ({ username, password, role, email, isBan, createdBy }) {
        try {
            let persist = await User.create({
                username,
                password,
                role,
                email,
                is_ban: isBan,
                created_by: createdBy
            });
            return persist;
        } catch (err) {
            throw `Can not create new user. Message ${err}`;
        }
    },

    async showAll() {
        try {
            let show = await User.findAll({
                where: {
                    deleted_at: {
                        [Op.eq]: null
                    }
                },
                order: [
                    ['username', 'ASC']
                ]
            });
            return show;
        } catch (err) {
            throw `Can not show users data. Message: ${err}`;
        }
    },

    async showDetail(username) {
        try {
            let detail = await User.findAll({
                where: {
                    username
                }
            });
            return detail;
        } catch (err) {
            throw `Can not show user detail. Message: ${err}`;
        }
    },

    async controlStatus(username, status) {
        try {
            let ban = await User.update({ is_ban: status }, {
                where: {
                    username
                }
            });
            return ban;
        } catch (err) {
            throw `Can not ban user. Message: ${err}`;
        }
    },

    async remove(username, by, rmDate) {
        try {
            let remove = await User.update({ deleted_at: rmDate, deleted_by: by }, {
                where: {
                    username
                }
            });
            return remove;
        } catch (err) {
            throw `Can not delete user. Message: ${err}`;
        }
    },

    async get ({ username, password }) {
        try {
            let getUser = await User.findAll({
                where: {
                    username,
                    password
                }
            });
            return getUser;
        } catch (err) {
            throw `Can not find this user. Message ${err}`;
        }
    },

    async find(username) {
        try {
            let getUser = await User.findAll({
                attributes: ['id', 'username', 'email', 'role', 'user_project', 'is_ban'],
                where: {
                    username
                }
            });
            return getUser;
        } catch (err) {
            throw `Can not find this user. Message ${err}`;
        }
    },

    async update(username, email, role) {
        try {
            let update = await sequelize.query(`UPDATE users SET email = :email, role = :role WHERE username = :username`, {
                replacements: {
                    username,
                    email,
                    role
                }
            });
            return update;
        } catch (err) {
            throw `Can not update this user. Message ${err}`;
        }
    },

    async loginAttemp(username) {
        try {
            let auth = await sequelize.query(`SELECT username, password, email, role, is_ban FROM users WHERE username = :username AND is_ban = 0`, {
                replacements: {
                    username
                },
                type: QueryTypes.SELECT
            });
            return auth;
        } catch (err) {
            throw `Can not find user. Message: ${err}`
        }
    }

}