'use strict';

module.exports = async (objectUpdated, id, updater, updateData) => {
    try {
        return await updateData(objectUpdated, id, updater)
    } catch (error) {
        throw err;
    }
}