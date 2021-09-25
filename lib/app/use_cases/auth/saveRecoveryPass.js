'use strict';

module.exports = async (email, key, persistRecovery) => {
    return await persistRecovery(email, key);
}