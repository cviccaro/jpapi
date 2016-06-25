import { provideRouter, RouterConfig } from '@angular/router';

import { LoginRoutes } from './@login/index';
import { HomeRoutes } from './@home/index';
import { BlogsRoutes } from './@blogs/index';
import { WorkRoutes } from './@work/index';

import { AuthGuard, BlogsGuard, BlogGuard, LoginGuard, WorkListGuard } from './shared/index';

const routes: RouterConfig = [
    ...LoginRoutes,
    ...HomeRoutes,
    ...BlogsRoutes,
    ...WorkRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthGuard,
    LoginGuard,
    BlogsGuard,
    BlogGuard,
    WorkListGuard
];