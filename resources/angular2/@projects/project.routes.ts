import { ProjectIndexComponent, ProjectListComponent, ProjectComponent } from './index';

import { AuthGuard, ProjectListGuard, ProjectGuard } from '../shared/index';

export const ProjectRoutes = [
    {
        path: '',
        redirectTo: '/projects',
        terminal: true
    },
    {
        path: 'projects',
        component: ProjectIndexComponent,
        children: [
            { path: ':id', component: ProjectComponent, canActivate: [ProjectGuard] },
            { path: '', component: ProjectListComponent, canActivate: [ProjectListGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
