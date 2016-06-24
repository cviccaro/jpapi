"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.WorkRoutes = [
    {
        path: '',
        redirectTo: '/work',
        terminal: true
    },
    {
        path: 'work',
        component: index_1.WorkIndexComponent,
        children: [
            { path: ':id', component: index_1.WorkComponent },
            { path: '', component: index_1.WorkListComponent, canActivate: [index_2.WorkListGuard] }
        ]
    },
];

//# sourceMappingURL=work.routes.js.map
