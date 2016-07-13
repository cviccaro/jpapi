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
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var logger_service_1 = require('./logger.service');
var AuthService = (function () {
    function AuthService(http, authHttp, helper, log) {
        var _this = this;
        this.http = http;
        this.authHttp = authHttp;
        this.helper = helper;
        this.log = log;
        this._authorized = false;
        this.hasStorage = !(localStorage === undefined);
        this.token = '';
        this._authTokenSource = new ReplaySubject_1.ReplaySubject(1);
        this.authToken$ = this._authTokenSource.asObservable();
        this._authorizedSource = new ReplaySubject_1.ReplaySubject(1);
        this.whenAuthorized = this._authorizedSource.asObservable();
        if (this.hasStorage) {
            ['token', 'expires'].forEach(function (key) {
                var val = localStorage.getItem("id_" + key);
                if (val)
                    _this[key] = val;
            });
        }
        else {
            this.log.warn('authService#local storage is not supported.');
        }
        if (this.token != '') {
            this.log.log('authService#Found authorization token in localStorage.  Checking expiration date...');
            if (this.expires !== undefined && this.timeLeft(this.expires) > 0) {
                this.authorized = true;
            }
            else {
                this.log.log('authService#FAIL: Authorization token expired on ', this.expires);
                this.refresh()
                    .subscribe(function (res) {
                    _this.log.log('refresh response to subscription receiver', res);
                });
            }
        }
        else {
            this.log.log('authService#no token found in storage.');
        }
        this.log.log('authService#init END', this);
    }
    Object.defineProperty(AuthService.prototype, "authorized", {
        get: function () { return this._authorized; },
        set: function (v) {
            this._authorized = v;
            this._authorizedSource.next(v);
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.timeLeft = function (expires) {
        return expires - (new Date().getTime() / 1000);
    };
    AuthService.prototype.setToken = function (token) {
        if (this.hasStorage)
            localStorage.setItem('id_token', token);
        this.token = token;
        this.informObservers(token);
        return this;
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService.prototype.informObservers = function (token) {
        if (token === undefined)
            token = this.token;
        this._authTokenSource.next(token);
    };
    AuthService.prototype.setExpires = function (expires) {
        if (this.hasStorage)
            localStorage.setItem('id_expires', expires);
        this.expires = expires;
        return this;
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        this.log.log('authService#login: ', email, password);
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
        this.log.log('authService#refresh');
        return Rx_1.Observable.create(function (observer) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + _this.token });
            _this.http.get('authenticate/refresh', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.log.log('authService#refresh Success', res);
                _this.setToken(res.token);
                _this.setExpires(res.expires);
                _this.authorized = true;
                observer.next(res);
            }, function (error) {
                _this.log.log('error in jwt refresh ', error);
                observer.error(error);
            });
        });
    };
    AuthService.prototype.reset = function () {
        this.authorized = false;
        this.token = '';
        if (this.hasStorage)
            localStorage.removeItem('id_token');
        this.expires = undefined;
        if (this.hasStorage)
            localStorage.removeItem('id_expires');
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
                this.log.log('authService#parseError couldnt parse the json: ', {
                    error: error,
                    reason: e
                });
            }
        }
        return { title: title, message: message };
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, angular2_jwt_1.JwtHelper, logger_service_1.LoggerService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
