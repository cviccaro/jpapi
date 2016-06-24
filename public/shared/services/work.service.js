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
var WorkService = (function () {
    function WorkService(http) {
        this.http = http;
        this.http = http;
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
    WorkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WorkService);
    return WorkService;
}());
exports.WorkService = WorkService;

//# sourceMappingURL=work.service.js.map
