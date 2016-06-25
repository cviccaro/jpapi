"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.LoginRoutes = [
    {
        path: 'login',
        component: index_1.LoginComponent,
        index: true,
        canActivate: [index_2.LoginGuard]
    }
];

//# sourceMappingURL=login.routes.js.map
