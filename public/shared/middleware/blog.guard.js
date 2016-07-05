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
var index_1 = require('../services/index');
var Rx_1 = require('rxjs/Rx');
var BlogGuard = (function () {
    function BlogGuard(blogService, tagService, divisionService, route) {
        this.blogService = blogService;
        this.tagService = tagService;
        this.divisionService = divisionService;
        this.route = route;
        this.subs = [];
    }
    BlogGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            var gotTags = false;
            var gotBlog = false;
            var gotDivisions = false;
            var _sub = _this.tagService.options().subscribe(function (res) {
                console.log('got tag options!', res);
                _this.tagService.cache(res);
                gotTags = true;
                if (gotBlog && gotDivisions)
                    observer.complete(true);
            });
            var _sub2 = _this.divisionService.options().subscribe(function (res) {
                _this.divisionService.cache(res);
                gotDivisions = true;
                if (gotTags && gotBlog)
                    observer.complete(true);
            });
            _this.subs.push(_sub2);
            var _sub3 = _this.route.params.subscribe(function (params) {
                var id = params['id'];
                if (id === undefined || id === 'new') {
                    gotBlog = true;
                }
                else {
                    id = +id;
                    var _sub3_1 = _this.blogService.find(id).subscribe(function (res) {
                        _this.blogService.cache(res);
                        gotBlog = true;
                        if (gotTags && gotDivisions)
                            observer.complete(true);
                    });
                    _this.subs.push(_sub3_1);
                }
            });
            _this.subs.push(_sub3);
        });
    };
    BlogGuard.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    BlogGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.BlogService, index_1.TagService, index_1.DivisionService, router_1.ActivatedRoute])
    ], BlogGuard);
    return BlogGuard;
}());
exports.BlogGuard = BlogGuard;

//# sourceMappingURL=blog.guard.js.map
