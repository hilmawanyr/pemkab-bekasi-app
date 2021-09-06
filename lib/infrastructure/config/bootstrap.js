'use strict';

const logger = require('../logger/winston');
const sequelize = require('../orm/sequelize');
const { redisClient } = require('../session/sessionStore');

module.exports = {
    
    async init() {
        try {
            await sequelize.authenticate();
            logger.info('DB connection has been established successfully!');
        } catch (error) {
            throw `Unable to connect to database. ${error}`;
        }
    }

}