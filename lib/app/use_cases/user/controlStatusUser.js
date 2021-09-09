'use strict';

module.exports = async (id, status, suspend) => {
    return await suspend(id, status);
}