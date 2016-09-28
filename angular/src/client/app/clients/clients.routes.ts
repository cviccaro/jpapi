import { Route } from '@angular/router';

import { ClientsComponent } from './index';

import { AuthGuard, ClientsGuard } from '../shared/index';

export const ClientRoutes: Route[] = [
    // {
    //     path: '',
    //     redirectTo: '/clients',
    //     terminal: true
    // },
    {
        path: 'admin/clients',
        component: ClientsComponent,
        canActivate: [AuthGuard, ClientsGuard]
    },
];
