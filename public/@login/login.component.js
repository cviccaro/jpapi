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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var angular2_material_1 = require('../shared/libs/angular2-material');
var angular2_toaster_1 = require('angular2-toaster');
var index_1 = require('../shared/index');
var LoginComponent = (function () {
    function LoginComponent(router, service, toaster) {
        this.router = router;
        this.service = service;
        this.toaster = toaster;
        this.submitted = false;
        this.working = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('LoginComponent initialized.', this);
        this.service.whenAuthorized.subscribe(function (authorized) { return _this.router.navigate(['']); });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.working = true;
        this.submitted = true;
        this.service.login(this.email, this.password)
            .subscribe(function (res) { return _this.success(res); }, function (error) { return _this.fail(error); });
    };
    LoginComponent.prototype.success = function (res) {
        var _this = this;
        console.log('Authservice returned successfully: ', res);
        this.working = false;
        this.toaster.pop('success', 'Success!', 'Logging you in now.');
        setTimeout(function () { return _this.router.navigate(['']); }, 500);
    };
    LoginComponent.prototype.fail = function (error) {
        this.working = false;
        this.toaster.pop('error', error.title, error.message);
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES],
            providers: [forms_1.NgForm]
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthService, angular2_toaster_1.ToasterService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=login.component.js.map
