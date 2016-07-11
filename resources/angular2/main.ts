import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';
import { DND_PROVIDERS } from 'ng2-dnd/ng2-dnd';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { APP_SERVICES } from './shared/index';

//enableProdMode();

bootstrap(AppComponent, [
	disableDeprecatedForms(),
	provideForms(),
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    APP_SERVICES,
    DND_PROVIDERS,
    JwtHelper
]);
