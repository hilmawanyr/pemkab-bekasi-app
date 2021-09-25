'use strict';

const { Password, Op, sequelize, QueryTypes } = require('../orm/models/forgetpassModel');

module.exports = {

    async persist(email, key) {
        try {
            let store = await Password.create({
                email,
                key_string: key
            });
            return store;
        } catch (err) {
            throw `Can not save recovery link, reason ${err}`;
        }
    },

    async find(key) {
        try {
            let findKey = await Password.findOne({
                where: {
                    key_string: key,
                    is_used: {
                        [Op.eq]: null
                    }
                }
            });
            return findKey;
        } catch (err) {
            throw `Can not find key, reason ${err}`;
        }
    },
    
    async validateKey(key) {
        try {
            let validate = await Password.update({ is_used: 1 }, {
                where: {
                    key_string: key
                }
            });
            return validate;
        } catch (err) {
            throw `Can not validate recovery password, reason ${err}`;
        }
    },

    async updatePassword(email, password) {
        try {
            let update = await sequelize.query(`UPDATE users SET password = :password WHERE email = :email`, {
                where: {
                    email
                },
                replacements: {
                    email,
                    password
                },
                type: QueryTypes.UPDATE
            });
            return update;
        } catch (err) {
            throw `Can not update password, reason ${err}`;
        }
    }

}