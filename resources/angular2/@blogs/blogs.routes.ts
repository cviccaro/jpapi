import { BlogIndexComponent, BlogListComponent, BlogComponent } from './index';

import { AuthGuard, BlogsGuard, BlogGuard } from '../shared/index';

export const BlogsRoutes = [
    {
        path: '',
        redirectTo: '/blogs',
        terminal: true
    },
    {
        path: 'blogs',
        component: BlogIndexComponent,
        children: [
            { path: ':id', component: BlogComponent },
            { path: '', component: BlogListComponent, canActivate: [BlogsGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
