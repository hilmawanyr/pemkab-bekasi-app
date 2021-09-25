'use strict';

module.exports = async (users, project, assignUsers) => {
    try {
        return await assignUsers(users, project);
    } catch (err) {
        throw err;
    }
}