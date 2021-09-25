'use strict';

module.exports = class {
    constructor(name, code, description, created_by) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.createdBy = created_by;
    }
}