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
var ContextMenuFocusTrap = (function () {
    function ContextMenuFocusTrap() {
        this._clickOutsideEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(ContextMenuFocusTrap.prototype, "onClickOutside", {
        get: function () { return this._clickOutsideEmitter.asObservable(); },
        enumerable: true,
        configurable: true
    });
    ContextMenuFocusTrap.prototype.clickedOutside = function (e) {
        this._clickOutsideEmitter.emit('');
    };
    __decorate([
        core_1.Output('clickOutside'), 
        __metadata('design:type', Rx_1.Observable)
    ], ContextMenuFocusTrap.prototype, "onClickOutside", null);
    ContextMenuFocusTrap = __decorate([
        core_1.Component({
            selector: 'jpa-context-menu-focus-trap',
            template: '',
            styles: [
                ':host { display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 75; }'
            ],
            host: { '(click)': 'clickedOutside($event)' }
        }), 
        __metadata('design:paramtypes', [])
    ], ContextMenuFocusTrap);
    return ContextMenuFocusTrap;
}());
exports.ContextMenuFocusTrap = ContextMenuFocusTrap;

//# sourceMappingURL=focus-trap.js.map
