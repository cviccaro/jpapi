import {Component} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from './shared/libs/angular2-material';

import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

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
	public toasterConfig: ToasterConfig;

	constructor(public router: Router) {
		this.toasterConfig = new ToasterConfig({
		    showCloseButton: true
		});
	}

    navigateTo(link) {
        console.log('navigate to: ', link);
        this.router.navigate(link);
    }
}
