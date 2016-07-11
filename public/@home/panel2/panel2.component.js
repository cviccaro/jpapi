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
var ng2_ckeditor_1 = require('ng2-ckeditor');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var angular2_material_1 = require('../../shared/libs/angular2-material');
var index_1 = require('../../shared/components/chip/index');
var panel_content_component_1 = require('./panel-content.component');
var PanelComponent = (function () {
    function PanelComponent() {
    }
    PanelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2',
            templateUrl: './panel2.component.html',
            styleUrls: ['./panel2.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                panel_content_component_1.PanelContentComponent,
                index_1.ChipComponent,
                ng2_dnd_1.DND_DIRECTIVES,
                ng2_ckeditor_1.CKEditor
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelComponent);
    return PanelComponent;
}());
exports.PanelComponent = PanelComponent;

//# sourceMappingURL=panel2.component.js.map
