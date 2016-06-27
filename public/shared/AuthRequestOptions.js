"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var index_1 = require('./index');
var AuthRequestOptions = (function (_super) {
    __extends(AuthRequestOptions, _super);
    function AuthRequestOptions(service) {
        _super.call(this);
        this.service = service;
        console.log('AuthRequestOptions constructed.', this, service);
        setTimeout(function () {
            console.log(service);
        }, 500);
    }
    AuthRequestOptions.prototype.ngOnInit = function () {
        console.log('initialized');
    };
    AuthRequestOptions = __decorate([
        __param(0, core_1.Inject("AuthService")), 
        __metadata('design:paramtypes', [index_1.AuthService])
    ], AuthRequestOptions);
    return AuthRequestOptions;
}(http_1.BaseRequestOptions));
exports.AuthRequestOptions = AuthRequestOptions;

//# sourceMappingURL=AuthRequestOptions.js.map
