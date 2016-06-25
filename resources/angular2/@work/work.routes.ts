import { WorkIndexComponent, WorkListComponent, WorkComponent } from './index';

import { AuthGuard, WorkListGuard } from '../shared/index';

export const WorkRoutes = [
    {
        path: '',
        redirectTo: '/work',
        terminal: true
    },
    {
        path: 'work',
        component: WorkIndexComponent,
        children: [
            { path: ':id', component: WorkComponent },
            { path: '', component: WorkListComponent, canActivate: [WorkListGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
