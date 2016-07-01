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
var ImageUploadDropZones = (function () {
    function ImageUploadDropZones() {
    }
    ImageUploadDropZones.prototype.ngOnInit = function () {
        this._rows = new Array(this.rows);
        this._cols = new Array(this.cols);
        console.log('DropZones Component initialized', this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageUploadDropZones.prototype, "cols", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageUploadDropZones.prototype, "rows", void 0);
    ImageUploadDropZones = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-image-upload-drop-zones',
            templateUrl: './drop-zones.component.html',
            styleUrls: ['./drop-zones.component.css'],
            directives: [drop_zone_cell_1.DropZoneCell, droppable_1.Droppable]
        }), 
        __metadata('design:paramtypes', [])
    ], ImageUploadDropZones);
    return ImageUploadDropZones;
}());
exports.ImageUploadDropZones = ImageUploadDropZones;

//# sourceMappingURL=drop-zones.component.js.map
