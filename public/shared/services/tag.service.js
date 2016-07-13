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
var TagService = (function () {
    function TagService(http, xhr) {
        this.http = http;
        this.xhr = xhr;
        this.http = http;
    }
    TagService.prototype.options = function () {
        var _this = this;
        this.xhr.started();
        return this.http.get('/options/tags')
            .map(function (res) {
            _this.xhr.finished();
            return res.json();
        });
    };
    TagService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, xhr_1.XhrService])
    ], TagService);
    return TagService;
}());
exports.TagService = TagService;

//# sourceMappingURL=tag.service.js.map
