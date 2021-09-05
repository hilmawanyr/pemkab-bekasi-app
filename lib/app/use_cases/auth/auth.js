'use strict';

module.exports = async (credential, authRepo) => {
    try {
        let attempLogin = await authRepo(credential);
        return attempLogin;
    } catch (err) {
        throw err;
    }
}