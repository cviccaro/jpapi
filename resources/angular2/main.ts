import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

//import {LocalStorageService, LocalStorageSubscriber} from 'angular2-localstorage/LocalStorageEmitter';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { APP_SERVICES } from './shared/index';

var appPromise = bootstrap(AppComponent, [
	disableDeprecatedForms(),
	provideForms(),
    //LocalStorageService,
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    APP_SERVICES
]);

// register LocalStorage, this registers our change-detection.
//LocalStorageSubscriber(appPromise);
