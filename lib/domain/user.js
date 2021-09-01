'use strict';

module.exports = class {
    constructor(username, password, group, level) {
        this.username = username;
        this.password = password;
        this.group = group;
        this.level = level;
    }
}