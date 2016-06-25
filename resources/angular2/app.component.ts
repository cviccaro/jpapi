import {Component} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from './shared/libs/angular2-material';

import { AuthService } from './shared/index';

@Component({
    selector: 'jpa-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    viewProviders: [HTTP_PROVIDERS],
    providers: [MATERIAL_PROVIDERS, ToasterService],
    directives: [
        ROUTER_DIRECTIVES,
        MATERIAL_DIRECTIVES,
        ToasterContainerComponent
    ]
})
export class AppComponent {
	toasterConfig: ToasterConfig;
    loggedIn = false;

	constructor(public router: Router, private authService: AuthService) {
		this.toasterConfig = new ToasterConfig({
		    showCloseButton: true
		});

        this.loggedIn = this.authService.authorized;
	}

    navigateTo(link) {
        console.log('navigate to: ', link);
        this.router.navigate(link);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
