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
var angular2_jwt_1 = require('angular2-jwt');
var AuthService = (function () {
    function AuthService(http, authHttp, helper) {
        this.http = http;
        this.authHttp = authHttp;
        this.helper = helper;
        this.authorized = false;
        this.hasStorage = !(localStorage === undefined);
        this.token = '';
        this.ngOnInit();
    }
    AuthService.prototype.ngOnInit = function () {
        var _this = this;
        if (this.hasStorage) {
            ['token', 'expires'].forEach(function (key) {
                var val = localStorage.getItem("id_" + key);
                if (val)
                    _this[key] = val;
            });
        }
        else {
            console.warn('authService#local storage is not supported.');
        }
        if (this.token != '') {
            console.log('authService#Found authorization token in localStorage.  Checking expiration date...');
            if (this.expires !== undefined && this.timeLeft(this.expires) > 0) {
                this.authorized = true;
                console.log('authService#PASS: Authorization token is still valid for ' + this.timeLeft(this.expires) + ' seconds.');
            }
            else {
                console.log('authService#FAIL: Authorization token expired on ', this.expires);
                this.refresh()
                    .subscribe(function (res) {
                    console.log('refresh response to subscription receiver', res);
                });
            }
        }
        else {
            console.log('authService#no token found in storage.');
        }
        console.log('authService#init END', this);
    };
    AuthService.prototype.timeLeft = function (expires) {
        return expires - (new Date().getTime() / 1000);
    };
    AuthService.prototype.setToken = function (token) {
        if (this.hasStorage)
            localStorage.setItem('id_token', token);
        this.token = token;
        return this;
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService.prototype.setExpires = function (expires) {
        if (this.hasStorage)
            localStorage.setItem('id_expires', expires);
        this.expires = expires;
        return this;
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        console.log('authService#login: ', email, password);
        return Rx_1.Observable.create(function (observer) {
            _this.http.post('authenticate', { email: email, password: password })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.setToken(res.token);
                _this.setExpires(res.expires);
                _this.authorized = true;
                observer.next(res);
            }, function (error) { return observer.error(_this.parseError(error)); });
        });
    };
    AuthService.prototype.refresh = function () {
        var _this = this;
        console.log('authService#refresh');
        return Rx_1.Observable.create(function (observer) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + _this.token });
            _this.http.get('authenticate/refresh', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                console.log('authService#refresh Success', res);
                _this.setToken(res.token);
                _this.setExpires(res.expires);
                _this.authorized = true;
                observer.next(res);
            }, function (error) {
                console.log('error in jwt refresh ', error);
                observer.error(error);
            });
        });
    };
    AuthService.prototype.reset = function () {
        this.authorized = false;
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
                console.log('authService#parseError couldnt parse the json: ', {
                    error: error,
                    reason: e
                });
            }
        }
        return { title: title, message: message };
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, angular2_jwt_1.JwtHelper])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
