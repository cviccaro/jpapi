import { StaffIndexComponent, StaffComponent } from './index';

import { AuthGuard, StaffGuard } from '../shared/index';

export const StaffRoutes = [
    {
        path: '',
        redirectTo: '/staff',
        terminal: true
    },
    {
        path: 'staff',
        component: StaffIndexComponent,
        children: [
            { path: '', component: StaffComponent, canActivate: [StaffGuard] },
        ],
        canActivate: [AuthGuard]
    },
];
