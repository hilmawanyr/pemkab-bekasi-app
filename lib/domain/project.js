'use strict';

module.exports = class {
    constructor(name, description, created_by) {
        this.name = name;
        this.description = description;
        this.createdBy = created_by;
    }
}