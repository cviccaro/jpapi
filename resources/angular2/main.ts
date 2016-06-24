import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

import { HTTP_PROVIDERS, BrowserXhr } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { APP_SERVICES } from './shared/index';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    APP_SERVICES
]);
