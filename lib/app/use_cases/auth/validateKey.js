'use strict';

module.exports = async (key, validate) => {
    return await validate(key);
}