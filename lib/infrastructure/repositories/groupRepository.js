'use strict';

const { Group } = require('../orm/models/groupModel');

module.exports = {

    async create ({ code, name, creator }) {
        try {
            let persist = await Group.create({
                code,
                name,
                created_by: creator
            });
            return persist;
        } catch (err) {
            throw `Error while creating group. Message: ${err}`;
        }
    },

    async showAll (limit=10, offset=0) {
        try {
            let show = await Group.findAll({
                limit,
                offset
            });
            return show;
        } catch (err) {
            throw `Error while show groups. Message: ${err}`;
        }
    },

    async showDetail ({ code }) {
        try {
            let get = await Group.findAll({
                where: {
                    code
                }
            });
            return get;
        } catch (err) {
            throw `Error while get group. Message: ${err}`;
        }
    },

}