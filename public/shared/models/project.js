"use strict";
var client_1 = require('./client');
var Project = (function () {
    function Project() {
        this.id = undefined;
        this.title = '';
        this.body = '';
        this.image = undefined;
        this.image_id = undefined;
        this.images = [];
        this.client = new client_1.JpClient();
        this.client_id = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
    }
    return Project;
}());
exports.Project = Project;

//# sourceMappingURL=project.js.map
