import { Route } from '@angular/router';
import { StaffComponent } from './index';

import { AuthGuard, StaffGuard } from '../shared/index';

export const StaffRoutes: Route[] = [
    {
        path: 'admin/staff',
        component: StaffComponent,
        canActivate: [AuthGuard, StaffGuard]
    },
];
