import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular2-material/sidenav';
import { Subscription } from 'rxjs/Subscription';

import {
    AuthService,
    JpaContextMenu,
  //  JpaTooltip,
    XhrService,
    RegistersSubscribers
} from './shared/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, RegistersSubscribers {
   // toasterConfig: ToasterConfig;
    loading = true;
    loggedIn = false;

    _subscriptions: Subscription[] = [];

    private _routeDepth: number = 0;
    private _routeUrl: string = '';

    @ViewChild(MdSidenav) private _sidenav: MdSidenav;

    constructor(
        public router: Router,
        public authService: AuthService,
        public contextMenu: JpaContextMenu,
        // public tooltip: JpaTooltip,
        public container: ViewContainerRef,
        public progress: XhrService
    ) {
        console.log('AppComponent constructed', this);
        // this.tooltip.registerContainer(container);
        this.contextMenu.registerContainer(container);
        // this.toasterConfig = new ToasterConfig({
        //     showCloseButton: true
        // });
        this.loggedIn = this.authService.authorized;
    }

    /**
     * Initialize the directive/component after Angular initializes the data-bound input properties.
     */
    ngOnInit(): void {
        let sub1 = this.authService.whenAuthorized.subscribe(authorized => this.loggedIn = authorized);
        let sub2 = this.router.events.subscribe(evt => {
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
        this._subscriptions = [sub1, sub2, sub3, sub4];
    }

    /**
     * Navigate up one level in the route tree
     */
    back(): void {
        let parentRoute = this._routeUrl.split('/')[2];
        this.router.navigate(['/admin/'+parentRoute]);
    }

    /**
     * Logout of the app
     */
    logout(): void {
        this.authService.reset();
        this.router.navigate(['/admin/login']);
    }

    /**
     * Determine if the route matches a URL string
     * @param  {string} URL 
     * @param  {boolean} strict 
     * @return {boolean}
     */
    routeIs(url: string, strict: boolean = false): boolean {
        if (strict) return this._routeUrl === url;
        return !!this._routeUrl.match(url);
    }

    /**
     * Determine if the current route is a certain depth
     * with the route tree
     * @param  {boolean} strict 
     * @return {boolean}
     */
    routeDepthIs(num: number): boolean {
        return this._routeDepth === num;
    }

    /**
     * Close the sidebar if opened
     */
    closeSidebarIfOpen(): void {
        if (this._sidenav.opened) {
            this._sidenav.close();
        }
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
}
