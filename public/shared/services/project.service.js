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
var auth_service_1 = require('./auth.service');
var angular2_jwt_1 = require('angular2-jwt');
var ProjectService = (function () {
    function ProjectService(http, authHttp, authService) {
        this.http = http;
        this.authHttp = authHttp;
        this.http = http;
        this.authToken = authService.getToken();
    }
    ProjectService.prototype.all = function (params) {
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        return this.http.get('/projects/paged', { search: query })
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.setList = function (res) {
        this.list = res;
        return this;
    };
    ProjectService.prototype.getList = function () {
        return this.list;
    };
    ProjectService.prototype.find = function (id, cached) {
        if (cached && this.byId[id] !== undefined) {
            return this.byId[id];
        }
        return this.http.get('/projects/' + id)
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.cache = function (project) {
        this.byId[project.id] = project;
        return this;
    };
    ProjectService.prototype.destroy = function (id) {
        return this.http.delete('/projects/' + id);
    };
    ProjectService.prototype.update = function (id, attributes) {
        var url = window.location.protocol + '//' + window.location.hostname + '/projects/update/' + id;
        var form = new FormData();
        var _form = {};
        Object.keys(attributes).forEach(function (key) {
            var val = attributes[key];
            switch (key) {
                case 'images':
                    val.forEach(function (item, i) {
                        Object.keys(item).forEach(function (k) {
                            var v = item[k];
                            form.append(key + "[" + i + "][" + k + "]", v);
                            _form[(key + "[" + i + "][" + k + "]")] = v;
                        });
                    });
                    break;
                case 'image':
                    form.append(key, val);
                    _form[key] = val;
                    break;
                case 'client':
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        console.log('appending to form ', { key: key, val: val });
                        form.append(key, val);
                        _form[key] = val;
                    }
                    else {
                        console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
                    }
            }
        });
        console.debug('ProjectService is sending POST request to ' + url + ' with form ', _form);
        return this.http.post(url, form)
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
        return false;
    };
    ProjectService.prototype.create = function (attributes) {
        var url = window.location.protocol + '//' + window.location.hostname + '/projects';
        var form = new FormData();
        var _form = {};
        Object.keys(attributes).forEach(function (key) {
            var val = attributes[key];
            switch (key) {
                case 'images':
                    val.forEach(function (item, i) {
                        Object.keys(item).forEach(function (k) {
                            var v = item[k];
                            form.append(key + "[" + i + "][" + k + "]", v);
                            _form[(key + "[" + i + "][" + k + "]")] = v;
                        });
                    });
                    break;
                case 'image':
                    form.append(key, val);
                    _form[key] = val;
                    break;
                case 'client':
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        console.log('appending to form ', { key: key, val: val });
                        form.append(key, val);
                        _form[key] = val;
                    }
                    else {
                        console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
                    }
            }
        });
        console.log("Created a form to upload to project create", _form);
        return this.http.post(url, form)
            .map(function (res) { return res.json(); });
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.AuthService])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;

//# sourceMappingURL=project.service.js.map
