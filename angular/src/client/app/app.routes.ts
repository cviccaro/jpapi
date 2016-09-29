import { Routes } from '@angular/router';

import { BlogRoutes } from './blogs/index';
import { ClientRoutes } from './clients/index';
import { DivisionRoutes } from './divisions/index';
import { HomeRoutes } from './home/index';
import { LoginRoutes } from './login/index';
import { ProjectRoutes } from './projects/index';
import { SettingsRoutes } from './settings/index';
import { StaffRoutes } from './staff/index';

export const routes: Routes = [
    ...HomeRoutes,
    ...LoginRoutes,
    ...BlogRoutes,
    ...ClientRoutes,
    ...DivisionRoutes,
    ...ProjectRoutes,
    ...SettingsRoutes,
    ...StaffRoutes
];
