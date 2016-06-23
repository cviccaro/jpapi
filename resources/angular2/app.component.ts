import {Component} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    viewProviders: [ HTTP_PROVIDERS ],
    directives: [
        ROUTER_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES
    ]
})
export class AppComponent { }
