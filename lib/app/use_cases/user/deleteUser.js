'use strict';

module.exports = async (id, removedBy, time, removeUser) => {
    return await removeUser(id, removedBy, time);
}