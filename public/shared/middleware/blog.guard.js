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
    function BlogGuard(blogService, route) {
        this.blogService = blogService;
        this.route = route;
    }
    BlogGuard.prototype.ngOnInit = function () {
    };
    BlogGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this.route.params.subscribe(function (params) {
                var id = +params['id'];
                _this.sub = _this.blogService.find(id).subscribe(function (res) {
                    _this.blogService.cache(res);
                    observer.complete(true);
                });
            });
        });
    };
    BlogGuard.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BlogGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.BlogService, router_1.ActivatedRoute])
    ], BlogGuard);
    return BlogGuard;
}());
exports.BlogGuard = BlogGuard;

//# sourceMappingURL=blog.guard.js.map
