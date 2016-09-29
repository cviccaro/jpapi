import { Route } from '@angular/router';
import { ProjectIndexComponent, ProjectListComponent, ProjectComponent } from './index';

import { AuthGuard, ProjectListGuard, ProjectGuard, CkEditorGuard } from '../shared/index';

export const ProjectRoutes: Route[] = [
    {
        path: 'admin/projects',
        component: ProjectIndexComponent,
        children: [
            { path: ':id', component: ProjectComponent, canActivate: [ProjectGuard], canDeactivate: [ CkEditorGuard ] },
            { path: '', component: ProjectListComponent, canActivate: [ProjectListGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
