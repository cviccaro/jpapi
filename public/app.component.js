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
var index_1 = require('./shared/index');
var AppComponent = (function () {
    function AppComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.loggedIn = false;
        this.toasterConfig = new angular2_toaster_1.ToasterConfig({
            showCloseButton: true
        });
        this.loggedIn = this.authService.authorized;
    }
    AppComponent.prototype.navigateTo = function (link) {
        console.log('navigate to: ', link);
        this.router.navigate(link);
    };
    AppComponent.prototype.logout = function () {
        this.authService.reset();
        this.router.navigate(['/login']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'jpa-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            viewProviders: [http_1.HTTP_PROVIDERS],
            providers: [angular2_material_1.MATERIAL_PROVIDERS, angular2_toaster_1.ToasterService],
            directives: [
                router_1.ROUTER_DIRECTIVES,
                angular2_material_1.MATERIAL_DIRECTIVES,
                angular2_toaster_1.ToasterContainerComponent
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
