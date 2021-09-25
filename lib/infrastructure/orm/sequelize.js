'use strict';

const { Sequelize } = require('sequelize');
const config = require('../config/constants');

const sequelize = new Sequelize(config.DATABASE.mysql);

module.exports = sequelize;