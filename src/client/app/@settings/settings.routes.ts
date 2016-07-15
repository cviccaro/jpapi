import { SettingsIndexComponent, SettingsComponent } from './index';

import { AuthGuard, SettingsGuard } from '../shared/index';

export const SettingsRoutes = [
    {
        path: '',
        redirectTo: '/settings',
        terminal: true
    },
    {
        path: 'settings',
        component: SettingsIndexComponent,
        children: [
            { path: '', component: SettingsComponent, canActivate: [SettingsGuard] },
        ],
        canActivate: [AuthGuard]
    },
];
