import { provideRouter, RouterConfig } from '@angular/router';

import { HomeRoutes } from './@home/index';
import { BlogsRoutes } from './@blogs/index';
import { WorkRoutes } from './@work/index';

import { BlogsGuard, BlogGuard, WorkListGuard } from './shared/index';

const routes: RouterConfig = [
    ...HomeRoutes,
    ...BlogsRoutes,
    ...WorkRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    BlogsGuard,
    BlogGuard,
    WorkListGuard
];