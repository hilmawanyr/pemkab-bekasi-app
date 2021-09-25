'use strict';

const { DataTypes, QueryTypes, Op } = require('sequelize');
const sequelize = require('../sequelize');

const Issue = sequelize.define('issues', {
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: true
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: true
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: true
    },  
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
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

module.exports = { Issue, sequelize, QueryTypes, Op }