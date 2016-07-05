"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.ProjectRoutes = [
    {
        path: '',
        redirectTo: '/projects',
        terminal: true
    },
    {
        path: 'projects',
        component: index_1.ProjectIndexComponent,
        children: [
            { path: ':id', component: index_1.ProjectComponent, canActivate: [index_2.ProjectGuard] },
            { path: '', component: index_1.ProjectListComponent, canActivate: [index_2.ProjectListGuard] }
        ],
        canActivate: [index_2.AuthGuard]
    },
];

//# sourceMappingURL=project.routes.js.map
