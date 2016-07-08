"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.ClientRoutes = [
    {
        path: '',
        redirectTo: '/clients',
        terminal: true
    },
    {
        path: 'clients',
        component: index_1.ClientIndexComponent,
        children: [
            { path: '', component: index_1.ClientsComponent, canActivate: [index_2.ClientsGuard] }
        ],
        canActivate: [index_2.AuthGuard]
    },
];

//# sourceMappingURL=clients.routes.js.map
