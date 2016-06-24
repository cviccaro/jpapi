import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { APP_SERVICES } from './shared/index';

bootstrap(AppComponent, [
	disableDeprecatedForms(),
	provideForms(),
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    APP_SERVICES
]);
