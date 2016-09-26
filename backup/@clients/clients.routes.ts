import { ClientIndexComponent, ClientsComponent } from './index';

import { AuthGuard, ClientsGuard } from '../shared/index';

export const ClientRoutes = [
    {
        path: '',
        redirectTo: '/clients',
        terminal: true
    },
    {
        path: 'clients',
        component: ClientIndexComponent,
        children: [
            //{ path: ':id', component: BlogComponent, canActivate: [BlogGuard] },
            { path: '', component: ClientsComponent, canActivate: [ClientsGuard] }
        ],
        canActivate: [AuthGuard]
    },
];
