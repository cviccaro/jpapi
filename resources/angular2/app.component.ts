import {Component} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from './shared/libs/angular2-material';

@Component({
    selector: 'jpa-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    viewProviders: [HTTP_PROVIDERS],
    providers: [MATERIAL_PROVIDERS],
    directives: [
        ROUTER_DIRECTIVES,
        MATERIAL_DIRECTIVES
    ]
})
export class AppComponent { }
