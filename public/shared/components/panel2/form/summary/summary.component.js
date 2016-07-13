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
var angular2_material_1 = require('../../../../libs/angular2-material');
var control_1 = require('../control');
var PanelFormControlSummary = (function () {
    function PanelFormControlSummary() {
    }
    Object.defineProperty(PanelFormControlSummary.prototype, "summary", {
        get: function () {
            return this._summary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControlSummary.prototype, "_summary", {
        get: function () {
            return this.control.summary(this.expanded);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', control_1.PanelFormControl)
    ], PanelFormControlSummary.prototype, "control", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelFormControlSummary.prototype, "expanded", void 0);
    PanelFormControlSummary = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2-form-control-summary',
            templateUrl: './summary.component.html',
            directives: [angular2_material_1.MATERIAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelFormControlSummary);
    return PanelFormControlSummary;
}());
exports.PanelFormControlSummary = PanelFormControlSummary;

//# sourceMappingURL=summary.component.js.map
