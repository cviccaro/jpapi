import {Component, OnDestroy, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from './shared/libs/angular2-material';

import { AuthService } from './shared/index';

import { Subscription } from 'rxjs/Subscription';

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
export class AppComponent implements OnInit, OnDestroy {
	toasterConfig: ToasterConfig;
    loggedIn = false;

    private subscription: Subscription;

	constructor(public router: Router, private authService: AuthService) {
		this.toasterConfig = new ToasterConfig({
		    showCloseButton: true
		});

        this.loggedIn = this.authService.authorized;
	}

    ngOnInit() {
        this.subscription = this.authService.whenAuthorized.subscribe(authorized => this.loggedIn = authorized);
    }

    navigateTo(link) {
        console.log('navigate to: ', link);
        this.router.navigate(link);
    }

    logout() {
        this.authService.reset();
        this.router.navigate(['/login']);
    }

    ngOnDestroy() {
       // prevent memory leak when component is destroyed
       this.subscription.unsubscribe();
     }
}
