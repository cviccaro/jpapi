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
var angular2_material_1 = require('../../../libs/angular2-material');
var PagerComponent = (function () {
    function PagerComponent() {
        this.pageChanged = new core_1.EventEmitter();
    }
    PagerComponent.prototype.ngOnInit = function () {
        this.pages = new Array(this.pagerData.lastPage);
    };
    PagerComponent.prototype.previous = function () {
        this.changePage(this.pagerData.currentPage - 1);
    };
    PagerComponent.prototype.next = function () {
        this.changePage(this.pagerData.currentPage + 1);
    };
    PagerComponent.prototype.changePage = function (page) {
        if (page === this.pagerData.currentPage) {
            return;
        }
        this.pageChanged.emit(page);
    };
    PagerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('pagerData')) {
            this.pages = new Array(this.pagerData.lastPage);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PagerComponent.prototype, "pagerData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PagerComponent.prototype, "pageChanged", void 0);
    PagerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-pager',
            templateUrl: './pager.component.html',
            styleUrls: ['./pager.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PagerComponent);
    return PagerComponent;
}());
exports.PagerComponent = PagerComponent;

//# sourceMappingURL=pager.component.js.map
