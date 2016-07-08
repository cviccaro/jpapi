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
require('rxjs/add/operator/map');
var DivisionService = (function () {
    function DivisionService(http) {
        this.http = http;
        this.http = http;
    }
    DivisionService.prototype.all = function (params) {
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        return this.http.get('/divisions/paged', { search: query })
            .map(function (res) { return res.json(); });
    };
    DivisionService.prototype.options = function () {
        return this.http.get('/options/divisions')
            .map(function (res) { return res.json(); });
    };
    DivisionService.prototype.cache = function (v) {
        this._cached = v;
    };
    DivisionService.prototype.cached = function () {
        return this._cached;
    };
    DivisionService.prototype.find = function (id) {
        return this.http.get('/divisions/' + id)
            .map(function (res) { return res.json(); });
    };
    DivisionService.prototype.update = function (id, attributes) {
        var form = new FormData();
        var _form = {};
        Object.keys(attributes).forEach(function (key) {
            var val = attributes[key];
            switch (key) {
                case 'image':
                    form.append(key, val);
                    _form[key] = val;
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        form.append(key, val);
                        _form[key] = val;
                    }
            }
        });
        console.debug('DivisionService is sending POST update request with form ', _form);
        return this.http.post('/divisions/' + id, form)
            .map(function (res) { return res.json(); });
    };
    DivisionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DivisionService);
    return DivisionService;
}());
exports.DivisionService = DivisionService;

//# sourceMappingURL=division.service.js.map
