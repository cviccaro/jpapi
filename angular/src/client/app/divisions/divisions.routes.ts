import { Route } from '@angular/router';

import { DivisionsIndexComponent, DivisionsComponent, DivisionComponent } from './index';

import { AuthGuard, DivisionsGuard } from '../shared/index';

export const DivisionRoutes: Route[] = [
    {
        path: 'admin/divisions',
        component: DivisionsIndexComponent,
        children: [
            { path: ':id', component: DivisionComponent },
            { path: '', component: DivisionsComponent, canActivate: [DivisionsGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
