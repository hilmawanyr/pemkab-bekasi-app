'use strict';

const { Employee } = require('../orm/models/employeeModel');

module.exports = {
    
    async create ( { id, name, creator } ) {
        try {
            let persist = await Employee.create({
                id,
                name,
                created_by: creator
            });
            return persist;
        } catch (err) {
            throw `Error while creating employee. Message: ${err}`;
        }
    },

    async showAll ( limit=10, offset=0 ) {
        try {
            let show = await Employee.findAll({
                limit,
                offset
            });
            return show;
        } catch (err) {
            throw `Error while get employees. Message: ${err}`;
        }
    },

    async showDetail ( { id } ) {
        try {
            let get = await Employee.findAll({
                where: { id },
                limit,
                offset
            });
            return get;
        } catch (err) {
            throw `Error while get employee detail. Message: ${err}`;
        }
    },

}