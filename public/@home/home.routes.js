"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.HomeRoutes = [
    {
        path: '',
        component: index_1.HomeComponent,
        index: true,
        canActivate: [index_2.AuthGuard]
    },
];

//# sourceMappingURL=home.routes.js.map
