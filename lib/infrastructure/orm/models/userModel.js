'use strict';

const { DataTypes, QueryTypes, Op } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_ban: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deleted_by: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { User, sequelize, QueryTypes, Op };