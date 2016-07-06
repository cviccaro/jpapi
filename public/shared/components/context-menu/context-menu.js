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
var focus_trap_1 = require('./focus-trap');
var JpaContextMenu = (function () {
    function JpaContextMenu(_cr) {
        this._cr = _cr;
    }
    JpaContextMenu.prototype.setContainer = function (vc) {
        this.viewContainer = vc;
    };
    JpaContextMenu.prototype.resolveBackdrop = function () {
        var _this = this;
        this._cr.resolveComponent(focus_trap_1.ContextMenuFocusTrap).then(function (cmpFactory) {
            var injector = _this.viewContainer.parentInjector;
            return _this.viewContainer.createComponent(cmpFactory, _this.viewContainer.length, injector);
        }).then(function (cmpRef) {
            _this._cmpRef = cmpRef;
            document.body.appendChild(cmpRef.location.nativeElement);
        });
    };
    JpaContextMenu.prototype.ngOnDestroy = function () {
        var _this = this;
        if (typeof this._cmpRef.instance.canDestroy === 'function') {
            this._cmpRef.instance.canDestroy().then(function () { return _this._cmpRef.destroy(); });
        }
        else {
            this._cmpRef.destroy();
        }
    };
    JpaContextMenu = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentResolver])
    ], JpaContextMenu);
    return JpaContextMenu;
}());
exports.JpaContextMenu = JpaContextMenu;

//# sourceMappingURL=context-menu.js.map
