"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./@home/index');
var index_2 = require('./@blogs/index');
var routes = index_1.HomeRoutes.concat(index_2.BlogsRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
];

//# sourceMappingURL=app.routes.js.map
