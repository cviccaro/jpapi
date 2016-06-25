import { LoginComponent } from './index';

import { LoginGuard } from '../shared/index';

export const LoginRoutes = [
    {
        path: 'login',
        component: LoginComponent,
        index: true,
        canActivate: [LoginGuard]
    }
];
