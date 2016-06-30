"use strict";
var client_1 = require('./client');
var Work = (function () {
    function Work() {
        this.id = undefined;
        this.title = '';
        this.body = '';
        this.image = undefined;
        this.image_new = undefined;
        this.client = new client_1.JpClient();
        this.created_at = undefined;
        this.updated_at = undefined;
        this.gallery = [];
        this.gallery_new = [];
    }
    return Work;
}());
exports.Work = Work;

//# sourceMappingURL=work.js.map
