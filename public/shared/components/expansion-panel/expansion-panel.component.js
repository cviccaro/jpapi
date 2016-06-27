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
var common_1 = require('@angular/common');
var angular2_material_1 = require('../../libs/angular2-material');
var JpaExpansionPanel = (function () {
    function JpaExpansionPanel() {
        this.shortValue = this.value;
    }
    JpaExpansionPanel.prototype.ngOnInit = function () {
        console.log('JpaExpansionPanel initialized.', this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaExpansionPanel.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaExpansionPanel.prototype, "value", void 0);
    JpaExpansionPanel = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-expansion-panel',
            templateUrl: './expansion-panel.component.html',
            styleUrls: ['./expansion-panel.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES],
            pipes: [common_1.SlicePipe]
        }), 
        __metadata('design:paramtypes', [])
    ], JpaExpansionPanel);
    return JpaExpansionPanel;
}());
exports.JpaExpansionPanel = JpaExpansionPanel;

//# sourceMappingURL=expansion-panel.component.js.map
