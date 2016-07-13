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
var xhr_1 = require('./xhr');
var BlogService = (function () {
    function BlogService(http, xhr) {
        this.http = http;
        this.xhr = xhr;
        this.http = http;
    }
    BlogService.prototype.all = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        this.xhr.started();
        return this.http.get('/blogs/paged', { search: query })
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    BlogService.prototype.find = function (id, cached) {
        var _this = this;
        this.xhr.started();
        return this.http.get("/blogs/" + id)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    BlogService.prototype.destroy = function (id) {
        var _this = this;
        this.xhr.started();
        return this.http.delete("/blogs/" + id)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    BlogService.prototype.create = function (attributes) {
        var _this = this;
        var form = this.createFormData(attributes);
        this.xhr.started();
        return this.http.post('/blogs', form)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    BlogService.prototype.update = function (id, attributes) {
        var _this = this;
        var form = this.createFormData(attributes);
        this.xhr.started();
        return this.http.post("/blogs/update/" + id, form)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    BlogService.prototype.createFormData = function (attributes) {
        var form = new FormData();
        var _loop_1 = function(key) {
            var val = attributes[key];
            switch (key) {
                case 'images':
                    break;
                case 'image':
                    if (val === '') {
                        form.append(key, val);
                    }
                    else if (!!val && val._file) {
                        form.append(key, val._file);
                    }
                    break;
                case 'divisions':
                case 'tags':
                    val.forEach(function (item, i) {
                        for (var k in item) {
                            form.append(key + "[" + i + "][" + k + "]", item[k]);
                        }
                    });
                    break;
                default:
                    if (val !== undefined && val !== null)
                        form.append(key, val);
            }
        };
        for (var key in attributes) {
            _loop_1(key);
        }
        return form;
    };
    BlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, xhr_1.XhrService])
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;

//# sourceMappingURL=blog.service.js.map
