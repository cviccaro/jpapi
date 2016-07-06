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
require('rxjs/add/operator/share');
var JpaModal = (function () {
    function JpaModal(_cr) {
        var _this = this;
        this._cr = _cr;
        this.defaults = {
            okText: 'GOT IT!',
            cancelText: 'Cancel',
            mode: 'alert',
            message: 'Are you sure?'
        };
        this.openModal = new Rx_1.Observable(function (observer) { return _this._openModal = observer; }).share();
    }
    JpaModal.prototype.open = function (config) {
        var _this = this;
        config = Object.assign(this.defaults, config);
        if (!this._openModal) {
            throw new Error("No Modal Containers have been initialized to receive modals.");
        }
        this._openModal.next(config);
        console.log('Opened modal with config', config);
        return Rx_1.Observable.create(function (observer) { return _this.buttonClicked = observer; });
    };
    JpaModal = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentResolver])
    ], JpaModal);
    return JpaModal;
}());
exports.JpaModal = JpaModal;

//# sourceMappingURL=provider.js.map
