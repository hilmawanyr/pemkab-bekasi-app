'use strict';

module.exports = async (objectUpdated, id, updateData) => {
    try {
        return await updateData(objectUpdated, id)
    } catch (error) {
        throw err;
    }
}