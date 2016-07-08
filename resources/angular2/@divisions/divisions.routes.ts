import { DivisionsIndexComponent, DivisionsComponent, DivisionComponent } from './index';

import { AuthGuard, DivisionGuard, DivisionsGuard } from '../shared/index';

export const DivisionRoutes = [
    {
        path: '',
        redirectTo: '/divisions',
        terminal: true
    },
    {
        path: 'divisions',
        component: DivisionsIndexComponent,
        children: [
            { path: ':id', component: DivisionComponent },
            { path: '', component: DivisionsComponent, canActivate: [DivisionsGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
