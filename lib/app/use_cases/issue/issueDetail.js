'use strict';

module.exports = async (id, showDetail) => {
    try {
        return await showDetail(id);
    } catch (err) {
        throw err;
    }
}