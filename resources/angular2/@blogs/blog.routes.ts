import { BlogIndexComponent, BlogListComponent, BlogComponent } from './index';

import { AuthGuard, BlogListGuard, BlogGuard } from '../shared/index';

export const BlogRoutes = [
    {
        path: '',
        redirectTo: '/blogs',
        terminal: true
    },
    {
        path: 'blogs',
        component: BlogIndexComponent,
        children: [
            { path: ':id', component: BlogComponent, canActivate: [BlogGuard] },
            { path: '', component: BlogListComponent, canActivate: [BlogListGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
