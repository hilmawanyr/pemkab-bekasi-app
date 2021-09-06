'use strict';

const { Level } = require("../orm/models/levelModel");

module.exports = {

    async create ({ code, name, group, creator }) {
        try {
            let persist = await Level.create({
                code,
                name,
                group_code: group,
                created_by: creator
            });
            return persist;
        } catch (err) {
            throw `Error while creating level. Message: ${err}`;
        }
    },

    async showAll (limit=10, offset=0) {
        try {
            let show = await Level.findAll({
                limit,
                offset
            });
            return show;
        } catch (err) {
            throw `Error while show levels. Message: ${err}`;
        }
    },

    async showDetail ({ code }) {
        try {
            let get = await Level.findAll({
                where: {
                    code
                }
            });
            return get;
        } catch (err) {
            throw `Error while get level. Message: ${err}`;
        }
    },

}