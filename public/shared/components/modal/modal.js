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
var common_1 = require('@angular/common');
var Rx_1 = require('rxjs/Rx');
var modal_interface_1 = require('./modal.interface');
var ModalComponent = (function () {
    function ModalComponent() {
        this._actionEmitter = new core_1.EventEmitter();
        this._files = {};
    }
    Object.defineProperty(ModalComponent.prototype, "onAction", {
        get: function () {
            return this._actionEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.ngAfterViewInit = function () {
        console.log('ModalComponent View Initialized.', this);
    };
    ModalComponent.prototype.action = function (type, config, event) {
        console.log(type + ' button clicked.', event);
        event.preventDefault();
        event.stopPropagation();
        this._actionEmitter.emit({ type: type, config: config, event: event });
    };
    ModalComponent.prototype.modalFormSubmit = function () {
        this._actionEmitter.emit({ type: 'submit', config: this.config, event: null });
    };
    ModalComponent.prototype.handleChange = function (col, e) {
        console.log('handle change in modal', {
            col: col,
            e: e
        });
        if (col.type === 'file') {
            col.value = e.target['files'];
        }
        var inputs = this.config.inputs;
        this.config.inputs.forEach(function (col) { col.evaluateConditions(inputs); });
    };
    ModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('config')) {
            var currentValue = changes['config'].currentValue;
            if (currentValue) {
                switch (currentValue.mode) {
                    case "form":
                        this.config.inputs = this.config.inputs.map(function (input) { return new modal_interface_1.ModalFormField(input); });
                        break;
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "config", void 0);
    __decorate([
        core_1.Output('action'), 
        __metadata('design:type', Rx_1.Observable)
    ], ModalComponent.prototype, "onAction", null);
    ModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-modal',
            templateUrl: './modal.html',
            styleUrls: ['./modal.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, common_1.NgSwitch, common_1.NgSwitchCase, common_1.NgSwitchDefault]
        }), 
        __metadata('design:paramtypes', [])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;

//# sourceMappingURL=modal.js.map
