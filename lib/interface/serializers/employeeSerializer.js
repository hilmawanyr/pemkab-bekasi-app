'use strict';

const _serialize = employee => {
    return {
        'id': employee.id,
        'name': employee.name,
        'createdAt': employee.created_at,
        'createdBy': employee.created_by
    }
}

module.exports = {

    serialize(employee) {
        if (!employee) {
            throw new Error('No data received');            
        }

        if (Array.isArray(employee)) {
            return employee.map(_serialize)
        }

        return _serialize(employee);
    }

}