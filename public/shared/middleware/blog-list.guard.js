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
var index_1 = require('../services/index');
var Rx_1 = require('rxjs/Rx');
var BlogListGuard = (function () {
    function BlogListGuard(blogService, cache) {
        this.blogService = blogService;
        this.cache = cache;
    }
    BlogListGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this.sub = _this.blogService.all({
                current_page: 1,
                length: 15,
                order_by: 'updated_at',
                descending: true
            }).subscribe(function (res) {
                _this.cache.store('blogList', res);
                observer.complete(true);
            });
        });
    };
    BlogListGuard.prototype.ngOnDestroy = function () {
        if (this.sub)
            this.sub.unsubscribe();
    };
    BlogListGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.BlogService, index_1.JpaCache])
    ], BlogListGuard);
    return BlogListGuard;
}());
exports.BlogListGuard = BlogListGuard;

//# sourceMappingURL=blog-list.guard.js.map
