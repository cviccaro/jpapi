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
var angular2_material_1 = require('../../libs/angular2-material');
var menu_item_1 = require('./menu-item');
var focus_trap_1 = require('./focus-trap');
var context_menu_1 = require('./context-menu');
var ContextMenuComponent = (function () {
    function ContextMenuComponent(service, element) {
        this.service = service;
        this.opened = false;
        this._topPos = '0px';
        this._leftPos = '0px';
        this.showOnHover = false;
        this.element = element;
    }
    Object.defineProperty(ContextMenuComponent.prototype, "topPos", {
        get: function () { return this._topPos; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuComponent.prototype, "leftPos", {
        get: function () { return this._leftPos; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuComponent.prototype, "hiddenAttr", {
        get: function () { return this.opened ? null : true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuComponent.prototype, "hiddenClass", {
        get: function () { return this.opened ? false : true; },
        enumerable: true,
        configurable: true
    });
    ContextMenuComponent.prototype.ngAfterViewInit = function () {
        this.registerSubscribers();
    };
    ContextMenuComponent.prototype.registerSubscribers = function () {
        var _this = this;
        this.closeSubscriber = this.service.onClose.subscribe(function (e) {
            if (_this.backdrop)
                _this.backdrop.destroy();
            _this.opened = false;
            _this.element.nativeElement.remove();
        });
    };
    ContextMenuComponent.prototype.open = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        if (this.opened) {
            return;
        }
        this.backdropSubscription = this.service.resolveBackdrop(this).subscribe(function (cmpRef) {
            _this.backdrop = cmpRef;
        });
        this._topPos = (e.clientY + 10) + 'px';
        this._leftPos = (e.clientX + 10) + 'px';
        this.opened = true;
    };
    ContextMenuComponent.prototype.ngOnDestroy = function () {
        if (this.closeSubscriber)
            this.closeSubscriber.unsubscribe();
        if (this.backdropSubscription)
            this.backdropSubscription.unsubscribe();
        if (this.backdrop)
            this.backdrop.destroy();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ContextMenuComponent.prototype, "showOnHover", void 0);
    __decorate([
        core_1.HostBinding('style.top'), 
        __metadata('design:type', Object)
    ], ContextMenuComponent.prototype, "topPos", null);
    __decorate([
        core_1.HostBinding('style.left'), 
        __metadata('design:type', Object)
    ], ContextMenuComponent.prototype, "leftPos", null);
    __decorate([
        core_1.HostBinding('attr.hidden'), 
        __metadata('design:type', Object)
    ], ContextMenuComponent.prototype, "hiddenAttr", null);
    __decorate([
        core_1.HostBinding('class.hidden'), 
        __metadata('design:type', Object)
    ], ContextMenuComponent.prototype, "hiddenClass", null);
    ContextMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-context-menu',
            templateUrl: './context-menu.component.html',
            styleUrls: ['./context-menu.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, menu_item_1.ContextMenuItem, focus_trap_1.ContextMenuFocusTrap]
        }), 
        __metadata('design:paramtypes', [context_menu_1.JpaContextMenu, core_1.ElementRef])
    ], ContextMenuComponent);
    return ContextMenuComponent;
}());
exports.ContextMenuComponent = ContextMenuComponent;

//# sourceMappingURL=context-menu.component.js.map
