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
var ClientService = (function () {
    function ClientService(http, xhr) {
        this.http = http;
        this.xhr = xhr;
        this.http = http;
    }
    ClientService.prototype.all = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        this.xhr.started();
        return this.http.get('/clients/paged', { search: query })
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ClientService.prototype.options = function () {
        var _this = this;
        this.xhr.started();
        return this.http.get('/options/clients')
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ClientService.prototype.update = function (id, values) {
        var _this = this;
        var form = new FormData();
        var _form = {};
        values.forEach(function (col) {
            var key = col.name;
            var value = col.value;
            switch (key) {
                case 'image':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value[0]);
                        _form[key] = col.value[0];
                    }
                    break;
                case 'featured':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value ? 1 : 0);
                        _form[key] = col.value ? 1 : 0;
                    }
                    break;
                default:
                    if (value !== undefined && value !== null) {
                        form.append(key, value);
                        _form[key] = value;
                    }
            }
        });
        console.log('update client with data: ', {
            values: values,
            form: form,
            _form: _form
        });
        this.xhr.started();
        return this.http.post('/clients/update/' + id, form)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ClientService.prototype.create = function (values) {
        var _this = this;
        var form = new FormData();
        var _form = {};
        values.forEach(function (col) {
            var key = col.name;
            var value = col.value;
            switch (key) {
                case 'image':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value[0]);
                        _form[key] = col.value[0];
                    }
                    break;
                case 'featured':
                    if (value !== undefined && value !== null) {
                        form.append(key, col.value ? 1 : 0);
                        _form[key] = col.value ? 1 : 0;
                    }
                    break;
                default:
                    if (value !== undefined && value !== null) {
                        form.append(key, value);
                        _form[key] = value;
                    }
            }
        });
        console.log('create client with data: ', {
            values: values,
            form: form,
            _form: _form
        });
        this.xhr.started();
        return this.http.post('/clients', form)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ClientService.prototype.destroy = function (id) {
        var _this = this;
        this.xhr.started();
        return this.http.delete('/clients/' + id)
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    ClientService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, xhr_1.XhrService])
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;

//# sourceMappingURL=client.service.js.map
