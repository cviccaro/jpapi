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
var Rx_1 = require('rxjs/Rx');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.authorized = false;
        this.hasStorage = !(localStorage === undefined);
        this.token = '';
        this.ngOnInit();
    }
    AuthService.prototype.ngOnInit = function () {
        console.log('authService#init', this);
        if (this.hasStorage) {
            var token = localStorage.getItem('jpa_token');
            if (token) {
                this.setToken(token);
            }
        }
        else {
            console.warn('local storage is not supported.');
        }
        if (this.token != '') {
            this.authorized = true;
        }
    };
    AuthService.prototype.setToken = function (token) {
        if (this.hasStorage)
            localStorage.setItem('jpa_token', token);
        this.token = token;
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        console.log('authService#login: ', email, password);
        return Rx_1.Observable.create(function (observer) {
            _this.http.post('authenticate', { email: email, password: password })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.setToken(res.token);
                _this.authorized = true;
                observer.next(res);
            }, function (error) { return observer.error(_this.parseError(error)); });
        });
    };
    AuthService.prototype.logout = function () {
        this.authorized = false;
        this.token = '';
        if (this.hasStorage)
            localStorage.removeItem('jpa_token');
    };
    AuthService.prototype.parseError = function (error) {
        var title = 'Error';
        var message = "Something went wrong and I'm not sure what.  Try again later.";
        if (error.status === 500) {
            title = 'Server Error';
            message = 'An error occured on the server.  Come back later and try again.';
        }
        else {
            try {
                var json = JSON.parse(error._body);
                message = json.errorText || json.error;
                if (json.error === 'invalid_credentials')
                    title = 'Login failed';
            }
            catch (e) {
                console.log('couldnt parse the json: ', e);
            }
        }
        return { title: title, message: message };
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
