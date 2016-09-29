import { Route } from '@angular/router';
import { BlogIndexComponent, BlogListComponent, BlogComponent } from './index';

import { AuthGuard, BlogListGuard, BlogGuard, CkEditorGuard } from '../shared/index';

export const BlogRoutes: Route[] = [
    {
        path: 'admin/blogs',
        component: BlogIndexComponent,
        children: [
            { path: ':id', component: BlogComponent, canActivate: [BlogGuard], canDeactivate: [ CkEditorGuard ] },
            { path: '', component: BlogListComponent, canActivate: [BlogListGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
