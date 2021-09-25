'use strict';

const { DataTypes, QueryTypes, Op } = require('sequelize');
const sequelize = require('../sequelize');

const Password = sequelize.define('password_recovery', {
    'email': {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    'key_string': {
        type: DataTypes.STRING,
        allowNull: false
    },
    'is_used': {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    'created_at': {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { Password, sequelize, QueryTypes, Op }