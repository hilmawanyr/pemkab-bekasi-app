'use strict';

const storeUsecase = require('../../app/use_cases/employee/store');
const employeeRepo = require('../../infrastructure/repositories/employeeRepository');
const Employee = require('../../domain/employee');
const { serialize } = require('../serializers/employeeSerializer');

module.exports = {

    add (req, res) {
        let  { id, name, creator } = req.body;
        let admin = new Employee(id, name, creator);
        let persist = await storeUsecase(admin, employeeRepo.create);
        let mockResponse = serialize(persist);
        return mockResponse;
    }

}