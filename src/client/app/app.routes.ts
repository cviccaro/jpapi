import { provideRouter, RouterConfig } from '@angular/router';

import { BlogRoutes } from './@blogs/index';
import { ClientRoutes } from './@clients/index';
import { DivisionRoutes } from './@divisions/index';
import { HomeRoutes } from './@home/index';
import { LoginRoutes } from './@login/index';
import { ProjectRoutes } from './@projects/index';
import { SettingsRoutes } from './@settings/index';

import {
    AuthGuard,
    LoginGuard,
    BlogListGuard,
    BlogGuard,
    ProjectGuard,
    ProjectListGuard,
    ClientsGuard,
    DivisionsGuard,
    CkEditorGuard,
    SettingsGuard
} from './shared/index';

const routes: RouterConfig = [
    ...LoginRoutes,
    ...HomeRoutes,
    ...BlogRoutes,
    ...ProjectRoutes,
    ...ClientRoutes,
    ...DivisionRoutes,
    ...SettingsRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthGuard,
    LoginGuard,
    BlogListGuard,
    BlogGuard,
    ProjectListGuard,
    ProjectGuard,
    ClientsGuard,
    DivisionsGuard,
    CkEditorGuard,
    SettingsGuard
];
