'use strict';

module.exports = async (username, email, role , updateUser) => {
    return await updateUser(username, email, role);
}