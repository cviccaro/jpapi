import { Route } from '@angular/router';
import { SettingsComponent } from './index';

import { AuthGuard, SettingsGuard } from '../shared/index';

export const SettingsRoutes: Route[] = [
    {
        path: 'admin/settings',
        component: SettingsComponent,
        canActivate: [AuthGuard, SettingsGuard]
    },
];
