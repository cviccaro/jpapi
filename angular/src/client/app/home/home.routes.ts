import { Route } from '@angular/router';
import { HomeComponent } from './index';
import { AuthGuard } from '../shared/index';

export const HomeRoutes: Route[] = [
		{
			path: '',
			redirectTo: 'admin',
			pathMatch: 'full'
		},
    {
        path: 'admin',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
];
