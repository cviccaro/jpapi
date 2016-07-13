"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./auth.service'));
__export(require('./blog.service'));
__export(require('./client.service'));
__export(require('./division.service'));
__export(require('./project.service'));
__export(require('./tag.service'));
__export(require('./cache'));
__export(require('./xhr'));
var auth_service_2 = require('./auth.service');
var blog_service_2 = require('./blog.service');
var client_service_2 = require('./client.service');
var division_service_2 = require('./division.service');
var project_service_2 = require('./project.service');
var tag_service_2 = require('./tag.service');
var cache_2 = require('./cache');
var xhr_2 = require('./xhr');
exports.APP_SERVICES = [
    auth_service_2.AuthService,
    blog_service_2.BlogService,
    client_service_2.ClientService,
    division_service_2.DivisionService,
    tag_service_2.TagService,
    project_service_2.ProjectService,
    cache_2.JpaCache,
    xhr_2.XhrService
];

//# sourceMappingURL=index.js.map
