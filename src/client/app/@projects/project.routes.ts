import { ProjectIndexComponent, ProjectListComponent, ProjectComponent } from './index';

import { AuthGuard, ProjectListGuard, ProjectGuard, CkEditorGuard } from '../shared/index';

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
            { path: ':id', component: ProjectComponent, canActivate: [ProjectGuard], canDeactivate: [ CkEditorGuard ] },
            { path: '', component: ProjectListComponent, canActivate: [ProjectListGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
