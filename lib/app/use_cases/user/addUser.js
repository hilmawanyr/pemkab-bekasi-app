'use strict';

module.exports = async (userData, userRepo) => {

    try {
        return await userRepo(userData);
    } catch (error) {
        throw error;
    }

}