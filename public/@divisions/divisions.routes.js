"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.DivisionRoutes = [
    {
        path: '',
        redirectTo: '/divisions',
        terminal: true
    },
    {
        path: 'divisions',
        component: index_1.DivisionsIndexComponent,
        children: [
            { path: ':id', component: index_1.DivisionComponent },
            { path: '', component: index_1.DivisionsComponent, canActivate: [index_2.DivisionsGuard] }
        ],
        canActivate: [index_2.AuthGuard]
    },
];

//# sourceMappingURL=divisions.routes.js.map
