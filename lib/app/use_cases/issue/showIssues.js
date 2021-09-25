'use strict';

module.exports = async (id, getIssues) => {
    try {
        return await getIssues(id);
    } catch (err) {
        throw err;
    }
}