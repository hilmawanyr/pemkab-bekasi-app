'use strict';

const bcrypt = require('bcryptjs');

module.exports = async password => {

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash;

}