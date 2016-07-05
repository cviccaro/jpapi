import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

//import {LocalStorageService, LocalStorageSubscriber} from 'angular2-localstorage/LocalStorageEmitter';
import {AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { APP_SERVICES } from './shared/index';

import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

var appPromise = bootstrap(AppComponent, [
	disableDeprecatedForms(),
	provideForms(),
    //LocalStorageService,
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    APP_SERVICES,
    DND_PROVIDERS,
    JwtHelper
    //provide(RequestOptions, {useClass: AuthRequestOptions})
]);

// register LocalStorage, this registers our change-detection.
//LocalStorageSubscriber(appPromise);
