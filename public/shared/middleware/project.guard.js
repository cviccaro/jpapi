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
var ProjectGuard = (function () {
    function ProjectGuard(projectService, clientService, route, cache) {
        this.projectService = projectService;
        this.clientService = clientService;
        this.route = route;
        this.cache = cache;
        this.subs = [];
    }
    ProjectGuard.prototype.ngOnInit = function () {
    };
    ProjectGuard.prototype.canActivate = function () {
        var _this = this;
        console.log('ProjectGuard can activate called', this);
        return Rx_1.Observable.create(function (observer) {
            var gotClients = false;
            var gotProject = false;
            var _sub = _this.clientService.options().subscribe(function (res) {
                _this.cache.store('clients', res);
                gotClients = true;
                if (gotProject)
                    observer.complete(true);
            });
            _this.subs.push(_sub);
            var _sub2 = _this.route.params.subscribe(function (params) {
                console.log('got sweet ass router params: ', params);
                var id = params['id'];
                if (id === undefined || id === 'new') {
                    gotProject = true;
                }
                else {
                    id = +id;
                    var _sub_1 = _this.projectService.find(id).subscribe(function (res) {
                        _this.cache.store('project', res);
                        gotProject = true;
                        if (gotClients)
                            observer.complete(true);
                    });
                    _this.subs.push(_sub_1);
                }
            });
            _this.subs.push(_sub2);
        });
    };
    ProjectGuard.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ProjectGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.ProjectService, index_1.ClientService, router_1.ActivatedRoute, index_1.JpaCache])
    ], ProjectGuard);
    return ProjectGuard;
}());
exports.ProjectGuard = ProjectGuard;

//# sourceMappingURL=project.guard.js.map
