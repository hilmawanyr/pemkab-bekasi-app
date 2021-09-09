'use strict';

module.exports = class {
    constructor(username, password, role, email, isBan, created_by) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.isBan = isBan;
        this.createdBy = created_by;
    }
}