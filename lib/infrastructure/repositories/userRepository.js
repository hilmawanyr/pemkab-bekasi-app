'use strict';

const { User, sequelize, QueryTypes } = require('../orm/models/userModel');

module.exports = {

    async create ({ username, password, group, level, createdBy }) {
        try {
            let persist = await User.create({
                username,
                password,
                group_code: group,
                level,
                created_by: createdBy
            });
            return persist;
        } catch (err) {
            throw `Can not create new user. Message ${err}`;
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