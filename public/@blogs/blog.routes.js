"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.BlogRoutes = [
    {
        path: '',
        redirectTo: '/blogs',
        terminal: true
    },
    {
        path: 'blogs',
        component: index_1.BlogIndexComponent,
        children: [
            { path: ':id', component: index_1.BlogComponent, canActivate: [index_2.BlogGuard] },
            { path: '', component: index_1.BlogListComponent, canActivate: [index_2.BlogListGuard] }
        ],
        canActivate: [index_2.AuthGuard]
    },
];

//# sourceMappingURL=blog.routes.js.map
