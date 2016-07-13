import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from './shared/libs/angular2-material';
import { MdSidenav} from '@angular2-material/sidenav';
import { Subscription } from 'rxjs/Subscription';

import { AuthService, MODAL_DIRECTIVES, JpaModal, JpaContextMenu, TooltipDirective, JpaTooltip, XhrService } from './shared/index';

@Component({
    selector: 'jpa-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    viewProviders: [HTTP_PROVIDERS],
    providers: [MATERIAL_PROVIDERS, ToasterService, JpaModal, JpaContextMenu, JpaTooltip],
    directives: [
        ROUTER_DIRECTIVES,
        MATERIAL_DIRECTIVES,
        ToasterContainerComponent,
        MODAL_DIRECTIVES,
        TooltipDirective
    ]
})
export class AppComponent implements OnInit, OnDestroy {
    toasterConfig: ToasterConfig;
    loggedIn = false;

    private _routeDepth: number = 0;
    private _routeUrl: string = '';
    private subscriptions: Subscription[];

    private loading = true;

    @ViewChild(MdSidenav) private _sidenav: MdSidenav;

    constructor(
        public router: Router,
        private authService: AuthService,
        private contextMenu: JpaContextMenu,
        private tooltip: JpaTooltip,
        private container: ViewContainerRef,
        private progress: XhrService
    ) {
        this.tooltip.registerContainer(container);
        this.contextMenu.registerContainer(container);
        this.toasterConfig = new ToasterConfig({
            showCloseButton: true
        });
        this.loggedIn = this.authService.authorized;
    }

    ngOnInit() {
        let sub1 = this.authService.whenAuthorized.subscribe(authorized => this.loggedIn = authorized);
        let sub2 = this.router.events.subscribe(evt => {
            //console.warn(evt.toString());
            if (evt.toString().match('^NavigationEnd')) {
                this._sidenav.close();
                this._routeDepth = evt.url.split('/').length - 1;
                this._routeUrl = evt.url;
                this.loading = false;
            } else if (evt.toString().match('^NavigationStart')) {
                this.loading = true;
            }
        });
        let sub3 = this.progress.start.subscribe(e => this.loading = true);
        let sub4 = this.progress.done.subscribe(e => this.loading = false);
        this.subscriptions = [sub1, sub2, sub3, sub4];
    }

    back() {
        let parentRoute = this._routeUrl.split('/')[1];
        this.router.navigate(['/'+parentRoute]);
    }

    navigateTo(link) {
        this.router.navigate(link);
    }

    logout() {
        this.authService.reset();
        this.router.navigate(['/login']);
    }

    routeIs(url: any, strict: boolean = false): boolean {
        if (strict) return this._routeUrl === url;
        return !!this._routeUrl.match(url);
    }

    routeDepthIs(num: number): boolean {
        return this._routeDepth === num;
    }

    closeSidebarIfOpen() {
        if (this._sidenav.opened) {
            this._sidenav.close();
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
