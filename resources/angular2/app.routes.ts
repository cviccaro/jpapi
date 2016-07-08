import { provideRouter, RouterConfig } from '@angular/router';

import { LoginRoutes } from './@login/index';
import { HomeRoutes } from './@home/index';
import { BlogRoutes } from './@blogs/index';
import { ProjectRoutes } from './@projects/index';
import { ClientRoutes } from './@clients/index';

import { AuthGuard, LoginGuard, BlogListGuard, BlogGuard, ProjectGuard, ProjectListGuard, ClientsGuard } from './shared/index';

const routes: RouterConfig = [
    ...LoginRoutes,
    ...HomeRoutes,
    ...BlogRoutes,
    ...ProjectRoutes,
    ...ClientRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthGuard,
    LoginGuard,
    BlogListGuard,
    BlogGuard,
    ProjectListGuard,
    ProjectGuard,
    ClientsGuard
];