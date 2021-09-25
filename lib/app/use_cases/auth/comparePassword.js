'use strict';

const bcrypt = require('bcryptjs');

module.exports = async (password, hash) => {
    let compare = await bcrypt.compare(password, hash);
    return compare;
}
