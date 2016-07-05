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
var drop_zone_cell_1 = require('./drop-zone-cell');
var droppable_1 = require('../droppable');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var DropZones = (function () {
    function DropZones() {
    }
    DropZones.prototype.ngOnInit = function () {
        this._rows = new Array(this.rows);
        this._cols = new Array(this.cols);
        console.log('DropZones Component initialized', this);
    };
    DropZones.prototype.onDropSuccess = function (event) {
        console.log('OnDropSuccess', event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DropZones.prototype, "cols", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DropZones.prototype, "rows", void 0);
    DropZones = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-drop-zones',
            templateUrl: './drop-zones.component.html',
            styleUrls: ['./drop-zones.component.css'],
            directives: [drop_zone_cell_1.DropZoneCell, droppable_1.Droppable, ng2_dnd_1.DND_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DropZones);
    return DropZones;
}());
exports.DropZones = DropZones;

//# sourceMappingURL=drop-zones.component.js.map
