import { provideRouter, RouterConfig } from '@angular/router';

import { BlogRoutes } from './@blogs/index';
import { ClientRoutes } from './@clients/index';
import { DivisionRoutes } from './@divisions/index';
import { HomeRoutes } from './@home/index';
import { LoginRoutes } from './@login/index';
import { ProjectRoutes } from './@projects/index';
import { SettingsRoutes } from './@settings/index';
import { StaffRoutes } from './@staff/index';

import {
    AuthGuard,
    BlogListGuard,
    BlogGuard,
    ClientsGuard,
    CkEditorGuard,
    DivisionsGuard,
    LoginGuard,
    CanDeactivateGuard,
    ProjectGuard,
    ProjectListGuard,
    SettingsGuard,
    StaffGuard
} from './shared/index';

const routes: RouterConfig = [
    ...HomeRoutes,
    ...BlogRoutes,
    ...ClientRoutes,
    ...DivisionRoutes,
    ...LoginRoutes,
    ...ProjectRoutes,
    ...SettingsRoutes,
    ...StaffRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthGuard,
    BlogListGuard,
    BlogGuard,
    ClientsGuard,
    CkEditorGuard,
    DivisionsGuard,
    LoginGuard,
    CanDeactivateGuard,
    ProjectGuard,
    ProjectListGuard,
    SettingsGuard,
    StaffGuard
];
