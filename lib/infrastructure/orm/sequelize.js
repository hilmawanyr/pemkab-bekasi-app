'use strict';

const { Sequelize } = require('sequelize');
const config = require('../config/constants');
const logger = require('../logger/winston');

const sequelize = new Sequelize(config.DATABASE.mysql);

// sequelize.authenticate()
//     .then(_ => {
//         logger.info('DB connection has been established successfully!');
//     })
//     .catch(error => {
//         logger.error('Unable to connect to database. Message: ' + error);
//     });

module.exports = sequelize;