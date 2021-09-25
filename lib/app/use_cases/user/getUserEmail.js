'use strict';

module.exports = async (email, findUser) => {
    return await findUser(email);
}