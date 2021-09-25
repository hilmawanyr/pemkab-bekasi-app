'use strict';

module.exports = async (username, email, role, status, updateUser) => {
    return await updateUser(username, email, role, status);
}