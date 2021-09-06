'use strict';

module.exports = async (data, employeeRepo) => {
    return await employeeRepo(data)
}