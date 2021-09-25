'use strict';

module.exports = async (users, project, updatedby, time, discharge) => {
    try {
        return await discharge(users, project, updatedby, time,);
    } catch (err) {
        throw err;
    }
}