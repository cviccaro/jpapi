"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./@login/index');
var index_2 = require('./@home/index');
var index_3 = require('./@blogs/index');
var index_4 = require('./@projects/index');
var index_5 = require('./@clients/index');
var index_6 = require('./@divisions/index');
var index_7 = require('./shared/index');
var routes = index_1.LoginRoutes.concat(index_2.HomeRoutes, index_3.BlogRoutes, index_4.ProjectRoutes, index_5.ClientRoutes, index_6.DivisionRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
    index_7.AuthGuard,
    index_7.LoginGuard,
    index_7.BlogListGuard,
    index_7.BlogGuard,
    index_7.ProjectListGuard,
    index_7.ProjectGuard,
    index_7.ClientsGuard,
    index_7.DivisionsGuard,
    index_7.DivisionGuard,
    index_7.CkEditorGuard
];

//# sourceMappingURL=app.routes.js.map
