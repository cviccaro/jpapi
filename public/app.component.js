"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var angular2_toaster_1 = require('angular2-toaster');
var angular2_material_1 = require('./shared/libs/angular2-material');
var sidenav_1 = require('@angular2-material/sidenav');
var index_1 = require('./shared/index');
var AppComponent = (function () {
    function AppComponent(router, authService, contextMenu, container) {
        this.router = router;
        this.authService = authService;
        this.contextMenu = contextMenu;
        this.container = container;
        this.loggedIn = false;
        this._routeDepth = 0;
        this._routeUrl = '';
        this.loading = true;
        this.contextMenu.setContainer(container);
        this.toasterConfig = new angular2_toaster_1.ToasterConfig({
            showCloseButton: true
        });
        this.loggedIn = this.authService.authorized;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _sub1 = this.authService.whenAuthorized.subscribe(function (authorized) { return _this.loggedIn = authorized; });
        var _sub2 = this.router.events.subscribe(function (evt) {
            console.warn(evt.toString());
            if (evt.toString().match('^NavigationEnd')) {
                _this._sidenav.close();
                _this._routeDepth = evt.url.split('/').length - 1;
                _this._routeUrl = evt.url;
                _this.loading = false;
            }
            else if (evt.toString().match('^NavigationStart')) {
                _this.loading = true;
            }
        });
        this.subscriptions = [_sub1, _sub2];
    };
    AppComponent.prototype.back = function () {
        var parentRoute = this._routeUrl.split('/')[1];
        this.router.navigate(['/' + parentRoute]);
    };
    AppComponent.prototype.navigateTo = function (link) {
        this.router.navigate(link);
    };
    AppComponent.prototype.logout = function () {
        this.authService.reset();
        this.router.navigate(['/login']);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    AppComponent.prototype.routeIs = function (url, strict) {
        if (strict === void 0) { strict = false; }
        if (strict)
            return this._routeUrl === url;
        return !!this._routeUrl.match(url);
    };
    AppComponent.prototype.routeDepthIs = function (num) {
        return this._routeDepth === num;
    };
    AppComponent.prototype.closeSidebarIfOpen = function () {
        if (this._sidenav.opened) {
            this._sidenav.close();
        }
    };
    __decorate([
        core_1.ViewChild(sidenav_1.MdSidenav), 
        __metadata('design:type', sidenav_1.MdSidenav)
    ], AppComponent.prototype, "_sidenav", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'jpa-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            viewProviders: [http_1.HTTP_PROVIDERS],
            providers: [angular2_material_1.MATERIAL_PROVIDERS, angular2_toaster_1.ToasterService, index_1.JpaModal, index_1.JpaContextMenu],
            directives: [
                router_1.ROUTER_DIRECTIVES,
                angular2_material_1.MATERIAL_DIRECTIVES,
                angular2_toaster_1.ToasterContainerComponent,
                index_1.MODAL_DIRECTIVES
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthService, index_1.JpaContextMenu, core_1.ViewContainerRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
