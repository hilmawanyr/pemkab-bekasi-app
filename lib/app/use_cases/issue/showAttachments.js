'use strict';

module.exports = async (issue, getAttachment) => {
    return await getAttachment(issue);
}