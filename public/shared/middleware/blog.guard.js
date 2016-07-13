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
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
var index_1 = require('../services/index');
var BlogGuard = (function () {
    function BlogGuard(cache, tagService, divisionService, route) {
        this.cache = cache;
        this.tagService = tagService;
        this.divisionService = divisionService;
        this.route = route;
    }
    BlogGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var gotDivisions = false;
            var gotTags = false;
            _this.divisionsSub = _this.divisionService.options().subscribe(function (res) {
                _this.cache.store('divisions', res);
                gotDivisions = true;
                if (gotTags)
                    observer.complete(true);
            });
            _this.tagsSub = _this.tagService.options().subscribe(function (res) {
                _this.cache.store('tags', res);
                gotTags = true;
                if (gotDivisions)
                    observer.complete(true);
            });
        });
    };
    BlogGuard.prototype.ngOnDestroy = function () {
        if (this.divisionsSub)
            this.divisionsSub.unsubscribe();
        if (this.tagsSub)
            this.tagsSub.unsubscribe();
    };
    BlogGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.CacheService, index_1.TagService, index_1.DivisionService, router_1.ActivatedRoute])
    ], BlogGuard);
    return BlogGuard;
}());
exports.BlogGuard = BlogGuard;

//# sourceMappingURL=blog.guard.js.map
