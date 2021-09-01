'use strict';

const { User } = require('../orm/models/userModel');

module.exports = {

    async create ( { username, password, group, level, createdBy } ) {
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

    async get ( {username, password} ) {
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

}