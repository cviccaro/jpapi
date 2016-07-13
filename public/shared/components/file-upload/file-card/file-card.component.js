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
var angular2_material_1 = require('../../../libs/angular2-material');
var index_1 = require('../file-icon/index');
var ActionDelegate = (function () {
    function ActionDelegate(el) {
        this.el = el;
        this.clicked = new core_1.EventEmitter();
        this.hover = new core_1.EventEmitter();
        this.hoverOut = new core_1.EventEmitter();
    }
    ActionDelegate.prototype.onClick = function (e) {
        this.clicked.emit(e);
    };
    ActionDelegate.prototype.onMouseEnter = function (e) {
        this.hover.emit(e);
    };
    ActionDelegate.prototype.onMouseLeaver = function (e) {
        this.hoverOut.emit(e);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionDelegate.prototype, "clicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionDelegate.prototype, "hover", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionDelegate.prototype, "hoverOut", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], ActionDelegate.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], ActionDelegate.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], ActionDelegate.prototype, "onMouseLeaver", null);
    ActionDelegate = __decorate([
        core_1.Directive({
            selector: '[jpa-action-delegate]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ActionDelegate);
    return ActionDelegate;
}());
exports.ActionDelegate = ActionDelegate;
var FileCardComponent = (function () {
    function FileCardComponent() {
        this.hovering = false;
        this.actions = true;
        this.clickedRemove = new core_1.EventEmitter();
    }
    Object.defineProperty(FileCardComponent.prototype, "actionsHoveringClass", {
        get: function () { return this.hovering; },
        enumerable: true,
        configurable: true
    });
    FileCardComponent.prototype.remove = function (e) {
        this.clickedRemove.emit(e);
    };
    FileCardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.actionDelegate) {
            this.hoverSub = this.actionDelegate.hover.subscribe(function (e) { return _this.hovering = true; });
            this.hoverOutSub = this.actionDelegate.hoverOut.subscribe(function (e) { return _this.hovering = false; });
        }
    };
    FileCardComponent.prototype.ngOnDestroy = function () {
        if (this.hoverSub)
            this.hoverSub.unsubscribe();
        if (this.hoverOutSub)
            this.hoverOutSub.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileCardComponent.prototype, "file", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FileCardComponent.prototype, "actions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileCardComponent.prototype, "clickedRemove", void 0);
    __decorate([
        core_1.ViewChild(ActionDelegate), 
        __metadata('design:type', ActionDelegate)
    ], FileCardComponent.prototype, "actionDelegate", void 0);
    __decorate([
        core_1.HostBinding('class.actions-hovering'), 
        __metadata('design:type', Object)
    ], FileCardComponent.prototype, "actionsHoveringClass", null);
    FileCardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-file-card',
            templateUrl: './file-card.component.html',
            styleUrls: ['./file-card.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, index_1.FileIconComponent, ActionDelegate],
            pipes: [angular2_moment_1.DateFormatPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], FileCardComponent);
    return FileCardComponent;
}());
exports.FileCardComponent = FileCardComponent;

//# sourceMappingURL=file-card.component.js.map
