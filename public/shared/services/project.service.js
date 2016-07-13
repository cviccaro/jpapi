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
var xhr_1 = require('./xhr');
var angular2_jwt_1 = require('angular2-jwt');
var ProjectService = (function () {
    function ProjectService(http, authHttp, authService, xhr) {
        this.http = http;
        this.authHttp = authHttp;
        this.authService = authService;
        this.xhr = xhr;
        this.http = http;
        this.authToken = authService.getToken();
    }
    ProjectService.prototype.all = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        this.xhr.started();
        return this.http.get('/projects/paged', { search: query })
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ProjectService.prototype.find = function (id, cached) {
        var _this = this;
        this.xhr.started();
        return this.http.get("/projects/" + id)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ProjectService.prototype.destroy = function (id) {
        var _this = this;
        this.xhr.started();
        return this.http.delete("/projects/" + id)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ProjectService.prototype.update = function (id, attributes) {
        var _this = this;
        var form = this.createFormData(attributes);
        this.xhr.started();
        return this.http.post("/projects/update/" + id, form)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ProjectService.prototype.create = function (attributes) {
        var _this = this;
        var form = this.createFormData(attributes);
        this.xhr.started();
        return this.http.post('/projects', form)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ProjectService.prototype.createFormData = function (attributes) {
        var form = new FormData();
        var _loop_1 = function(key) {
            var val = attributes[key];
            switch (key) {
                case 'client':
                    break;
                case 'images':
                    val.forEach(function (item, i) {
                        for (var k in item) {
                            form.append(key + "[" + i + "][" + k + "]", item[k]);
                        }
                    });
                    break;
                case 'image':
                    if (val === '') {
                        form.append(key, val);
                    }
                    else if (!!val && val._file) {
                        form.append(key, val._file);
                    }
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        form.append(key, val);
                    }
            }
        };
        for (var key in attributes) {
            _loop_1(key);
        }
        return form;
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.AuthService, xhr_1.XhrService])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;

//# sourceMappingURL=project.service.js.map
