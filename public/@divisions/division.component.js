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
var common_1 = require('@angular/common');
var angular2_toaster_1 = require('angular2-toaster');
var angular2_material_1 = require('../shared/libs/angular2-material');
var index_1 = require('../shared/index');
var DivisionComponent = (function () {
    function DivisionComponent(cache, route, service, toaster, log) {
        this.cache = cache;
        this.route = route;
        this.service = service;
        this.toaster = toaster;
        this.log = log;
        this.ready = false;
        this.isNew = false;
        this.submitted = false;
        this.division = this.cache.get('division');
    }
    Object.defineProperty(DivisionComponent.prototype, "division", {
        get: function () { return this._division; },
        set: function (v) {
            this._division = v;
            if (this._division !== undefined && this._division !== null) {
                this.setup();
            }
        },
        enumerable: true,
        configurable: true
    });
    DivisionComponent.prototype.setup = function () {
        this._originalTitle = this._division.name;
        this._divisionImage = this._division.image;
        this._division.image = null;
        this.isNew = this.division.id === undefined;
    };
    DivisionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['id'];
        if (id === 'new') {
            this.ready = true;
            this.isNew = true;
        }
        else {
            this.service.find(+id).subscribe(function (res) {
                _this.division = res;
                _this.log.debug('setting division model to ', res);
                _this.ready = true;
            });
        }
    };
    DivisionComponent.prototype.ngAfterViewInit = function () {
        this.log.log('Division Component View Initialized', this);
    };
    DivisionComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.service.update(this.division.id, this.division)
            .subscribe(function (res) {
            _this.log.log('response from update: ', res);
            _this.division = res;
            _this.reset();
            _this.toaster.pop('success', 'Success!', _this.division.name + ' has been saved.');
        }, function (err) {
            _this.log.log('Error when saving: ', err);
            _this.toaster.pop('error', 'Uh oh.', 'Something went wrong when saving this division.  Sorry.  Try again later and/or alert the developer!');
        });
    };
    DivisionComponent.prototype.reset = function (e) {
        var _this = this;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.ready = false;
        setTimeout(function () { _this.ready = true; }, 0);
    };
    DivisionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-division',
            templateUrl: './division.component.html',
            styleUrls: ['./division.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                common_1.NgSwitch,
                common_1.NgSwitchCase,
                common_1.NgSwitchDefault
            ]
        }), 
        __metadata('design:paramtypes', [index_1.CacheService, router_1.ActivatedRoute, index_1.DivisionService, angular2_toaster_1.ToasterService, index_1.LoggerService])
    ], DivisionComponent);
    return DivisionComponent;
}());
exports.DivisionComponent = DivisionComponent;

//# sourceMappingURL=division.component.js.map
