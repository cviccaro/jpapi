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
require('rxjs/add/operator/map');
var auth_service_1 = require('./auth.service');
var angular2_jwt_1 = require('angular2-jwt');
var WorkService = (function () {
    function WorkService(http, authHttp, authService) {
        this.http = http;
        this.authHttp = authHttp;
        this.http = http;
        this.authToken = authService.getToken();
    }
    WorkService.prototype.all = function (params) {
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        return this.http.get('/work/paged', { search: query })
            .map(function (res) { return res.json(); });
    };
    WorkService.prototype.setList = function (res) {
        this.list = res;
        return this;
    };
    WorkService.prototype.getList = function () {
        return this.list;
    };
    WorkService.prototype.find = function (id, cached) {
        if (cached && this.byId[id] !== undefined) {
            return this.byId[id];
        }
        return this.http.get('/work/' + id)
            .map(function (res) { return res.json(); });
    };
    WorkService.prototype.cache = function (work) {
        this.byId[work.id] = work;
        return this;
    };
    WorkService.prototype.update = function (id, attributes) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var url = window.location.protocol + '//' + window.location.hostname + '/work/update/' + id;
            console.debug('WorkService.update called with arguments: ', { id: id, attributes: attributes });
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            var xsrf = _this.getCookie('XSRF-TOKEN');
            if (xsrf) {
                console.log('appending xsrf', xsrf);
                form.append('_token', xsrf);
            }
            var _form = {};
            Object.keys(attributes).forEach(function (key) {
                var val = attributes[key];
                switch (key) {
                    case 'gallery':
                        val.forEach(function (item) {
                            form.append(key + '[][id]', item.id);
                            form.append(key + '[][weight]', item.weight);
                            _form[key + '[][id]'] = item.id;
                            _form[key + '[][weight]'] = item.weight;
                        });
                        break;
                    case 'client':
                        form.append(key, val.id);
                        _form[key] = val.id;
                        break;
                    case 'gallery_new':
                        val.forEach(function (file) {
                            form.append(key + '[]', file);
                            _form[key + '[]'] = file;
                        });
                        break;
                    default:
                        form.append(key, val);
                        _form[key] = val;
                }
            });
            console.log("Created a form to upload to work update", _form);
        });
    };
    WorkService.prototype.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
        return false;
    };
    WorkService.prototype.create = function (attributes) {
        var url = window.location.protocol + '//' + window.location.hostname + '/work';
        var form = new FormData();
        var _form = {};
        Object.keys(attributes).forEach(function (key) {
            var val = attributes[key];
            switch (key) {
                case 'gallery':
                    val.forEach(function (item, i) {
                        form.append(key + "[" + i + "][id]", item.id);
                        form.append(key + "[" + i + "][weight]", item.weight);
                        _form[(key + "[" + i + "][id]")] = item.id;
                        _form[(key + "[" + i + "][weight]")] = item.weight;
                    });
                    break;
                case 'client':
                    form.append(key, val.id);
                    _form[key] = val.id;
                    break;
                case 'image_new':
                    form.append(key + '[]', val);
                    _form[key] = val;
                    break;
                case 'gallery_new':
                    val.forEach(function (file) {
                        form.append(key + '[]', file);
                        _form[key + '[]'] = file;
                    });
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        form.append(key, val);
                        _form[key] = val;
                    }
                    else {
                        console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
                    }
            }
        });
        console.log("Created a form to upload to work update", _form);
        return this.http.post(url, form)
            .map(function (res) { return res.json(); });
    };
    WorkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.AuthService])
    ], WorkService);
    return WorkService;
}());
exports.WorkService = WorkService;

//# sourceMappingURL=work.service.js.map
