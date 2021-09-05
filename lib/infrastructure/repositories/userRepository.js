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
            let auth = await sequelize.query(`SELECT u.username, u.password, u.id AS userid, u.group_code, u.level, g.name AS groupName, l.name AS levelName, e.name AS empName 
                FROM users u
                JOIN \`groups\` g ON u.group_code = g.code
                JOIN levels l ON u.level = l.code
                JOIN employees e ON u.id = e.id 
                WHERE u.username = :username
                AND u.is_active = 1`, {
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