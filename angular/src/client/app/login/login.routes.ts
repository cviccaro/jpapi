import { Route } from '@angular/router';

import { LoginComponent } from './index';

import { LoginGuard } from '../shared/index';

export const LoginRoutes: Route[] = [
    {
        path: 'admin/login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    }
];
