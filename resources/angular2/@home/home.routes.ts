import { HomeComponent } from './index';
import { AuthGuard } from '../shared/index';

export const HomeRoutes = [
    {
        path: '',
        component: HomeComponent,
        index: true,
        canActivate: [AuthGuard]
    },
];
