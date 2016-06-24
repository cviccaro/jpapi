"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./@home/index');
var index_2 = require('./@blogs/index');
var index_3 = require('./@work/index');
var index_4 = require('./shared/index');
var routes = index_1.HomeRoutes.concat(index_2.BlogsRoutes, index_3.WorkRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
    index_4.BlogsGuard,
    index_4.BlogGuard,
    index_4.WorkListGuard
];

//# sourceMappingURL=app.routes.js.map
