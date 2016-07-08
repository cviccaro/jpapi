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
var angular2_moment_1 = require('angular2-moment');
var angular2_material_1 = require('../../libs/angular2-material');
var index_1 = require('../tooltip/index');
var index_2 = require('./pager/index');
var ListComponent = (function () {
    function ListComponent() {
        this.listUpdate = new core_1.EventEmitter();
        this.listItemEdit = new core_1.EventEmitter();
        this.listItemDelete = new core_1.EventEmitter();
        this.listItemAdd = new core_1.EventEmitter();
        this.onPageChange = new core_1.EventEmitter();
    }
    ListComponent.prototype.ngOnInit = function () {
        console.log('ListComponent initialized.', this);
    };
    ListComponent.prototype.add = function () {
        this.listItemAdd.emit({});
    };
    ListComponent.prototype.fetch = function () {
        this.listUpdate.emit({});
    };
    ListComponent.prototype.edit = function (item, $event) {
        this.listItemEdit.emit(item);
    };
    ListComponent.prototype.delete = function (item, $event) {
        this.listItemDelete.emit(item);
    };
    ListComponent.prototype.pageChanged = function (num) {
        this.onPageChange.emit(num);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListComponent.prototype, "listTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ListComponent.prototype, "listData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listItemEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listItemDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listItemAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "onPageChange", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'jpa-list',
            moduleId: module.id,
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                index_2.PagerComponent,
                index_1.TooltipDirective
            ],
            pipes: [angular2_moment_1.TimeAgoPipe, angular2_moment_1.CalendarPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;

//# sourceMappingURL=list.component.js.map
