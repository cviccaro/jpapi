import { provideRouter, RouterConfig } from '@angular/router';

import { HomeRoutes } from './@home/index';
import { BlogsRoutes } from './@blogs/index';

const routes: RouterConfig = [
    ...HomeRoutes,
    ...BlogsRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
];