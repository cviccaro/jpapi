import { BlogIndexComponent, BlogListComponent, BlogComponent } from './index';

import { AuthGuard, BlogListGuard, BlogGuard, CkEditorGuard } from '../shared/index';

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
            { path: ':id', component: BlogComponent, canActivate: [BlogGuard], canDeactivate: [ CkEditorGuard ] },
            { path: '', component: BlogListComponent, canActivate: [BlogListGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
