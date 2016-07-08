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
var Rx_1 = require('rxjs/Rx');
var focus_trap_1 = require('./focus-trap');
var JpaContextMenu = (function () {
    function JpaContextMenu(_cr) {
        this._cr = _cr;
        this._closeEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(JpaContextMenu.prototype, "onClose", {
        get: function () { return this._closeEmitter.asObservable(); },
        enumerable: true,
        configurable: true
    });
    JpaContextMenu.prototype.registerContainer = function (vc) {
        this.viewContainer = vc;
    };
    JpaContextMenu.prototype.resolveBackdrop = function (component) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            document.body.appendChild(component.element.nativeElement);
            _this._cr.resolveComponent(focus_trap_1.ContextMenuFocusTrap).then(function (cmpFactory) {
                return _this.viewContainer.createComponent(cmpFactory, _this.viewContainer.length);
            }).then(function (cmpRef) {
                _this._focusTrapRef = cmpRef;
                _this._focusTrapRef.instance.onClickOutside.subscribe(function (e) {
                    _this.close();
                });
                _this.viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
                observer.next(_this._focusTrapRef);
                observer.complete();
            });
        });
    };
    JpaContextMenu.prototype.close = function () {
        this._closeEmitter.emit(true);
    };
    JpaContextMenu.prototype.ngOnDestroy = function () {
        var _this = this;
        if (typeof this._focusTrapRef.instance.canDestroy === 'function') {
            this._focusTrapRef.instance.canDestroy().then(function () { return _this._focusTrapRef.destroy(); });
        }
        else {
            this._focusTrapRef.destroy();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Rx_1.Observable)
    ], JpaContextMenu.prototype, "onClose", null);
    JpaContextMenu = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentResolver])
    ], JpaContextMenu);
    return JpaContextMenu;
}());
exports.JpaContextMenu = JpaContextMenu;

//# sourceMappingURL=context-menu.js.map
