"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./@login/index');
var index_2 = require('./@home/index');
var index_3 = require('./@blogs/index');
var index_4 = require('./@work/index');
var index_5 = require('./shared/index');
var routes = index_1.LoginRoutes.concat(index_2.HomeRoutes, index_3.BlogsRoutes, index_4.WorkRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
    index_5.AuthGuard,
    index_5.LoginGuard,
    index_5.BlogsGuard,
    index_5.BlogGuard,
    index_5.WorkListGuard
];

//# sourceMappingURL=app.routes.js.map
