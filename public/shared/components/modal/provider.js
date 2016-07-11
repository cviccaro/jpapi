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
        this._modes = ['alert', 'form'];
        this.openModal = new Rx_1.Observable(function (observer) { return _this._openModal = observer; }).share();
    }
    Object.defineProperty(JpaModal.prototype, "defaults", {
        get: function () {
            switch (this._config.mode) {
                case 'form':
                    return {
                        okText: 'Save',
                        cancelText: 'Cancel',
                        inputs: [],
                        showTitle: true
                    };
                default:
                    return {
                        okText: 'GOT IT!',
                        cancelText: 'Cancel',
                        message: 'Are you sure?',
                        showTitle: false
                    };
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    JpaModal.prototype.open = function (config) {
        var _this = this;
        this._config = config;
        if (this._modes.indexOf(config.mode) < 0) {
            config.mode = 'alert';
        }
        this._config = Object.assign(this.defaults, config);
        if (this._config.mode === 'form' && this._config.inputs.length === 0) {
            throw new Error('Modal with type \'form\' needs some inputs.');
        }
        if (!this._openModal) {
            throw new Error("No Modal Containers have been initialized to receive modals.");
        }
        this._openModal.next(this._config);
        console.log('Opened modal with config', this._config);
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
