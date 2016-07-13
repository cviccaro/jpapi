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
var ChipComponent = (function () {
    function ChipComponent() {
        this.removeEnabled = true;
        this.onRemove = new core_1.EventEmitter();
    }
    ChipComponent.prototype.remove = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.onRemove.emit(this.id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChipComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChipComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ChipComponent.prototype, "removeEnabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ChipComponent.prototype, "onRemove", void 0);
    ChipComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-chip',
            templateUrl: './chip.component.html',
            styleUrls: ['./chip.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ChipComponent);
    return ChipComponent;
}());
exports.ChipComponent = ChipComponent;

//# sourceMappingURL=chip.component.js.map
