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
var nextUniqueId = 0;
var DropZoneCell = (function () {
    function DropZoneCell(el) {
        this.el = el;
        this.id = nextUniqueId++;
        this.zoneEntered = new core_1.EventEmitter();
        this.zoneLeft = new core_1.EventEmitter();
        this.onDrop = new core_1.EventEmitter();
        this.dragEnd = new core_1.EventEmitter();
    }
    Object.defineProperty(DropZoneCell.prototype, "dropZoneCellClass", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    DropZoneCell.prototype.onDragEnter = function (event) {
        this.zoneEntered.emit(this.id);
    };
    DropZoneCell.prototype.onDragLeave = function (event) {
        this.zoneLeft.emit(this.id);
    };
    DropZoneCell.prototype.onDragEnd = function (event) {
        this.dragEnd.emit(this.id);
    };
    DropZoneCell.prototype.handleOnDrop = function (e) {
        this.onDrop.emit(this.id);
    };
    DropZoneCell.prototype.ngOnInit = function () {
        this.el.nativeElement.style.width = 'calc(100% / ' + this.cols + ')';
        console.log('DropZoneCell directive initialized.', this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DropZoneCell.prototype, "cols", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropZoneCell.prototype, "zoneEntered", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropZoneCell.prototype, "zoneLeft", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropZoneCell.prototype, "onDrop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropZoneCell.prototype, "dragEnd", void 0);
    __decorate([
        core_1.HostBinding('class.drop-zone-cell'), 
        __metadata('design:type', Object)
    ], DropZoneCell.prototype, "dropZoneCellClass", null);
    __decorate([
        core_1.HostListener('dragenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [DragEvent]), 
        __metadata('design:returntype', void 0)
    ], DropZoneCell.prototype, "onDragEnter", null);
    __decorate([
        core_1.HostListener('dragleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [DragEvent]), 
        __metadata('design:returntype', void 0)
    ], DropZoneCell.prototype, "onDragLeave", null);
    __decorate([
        core_1.HostListener('dragend'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [DragEvent]), 
        __metadata('design:returntype', void 0)
    ], DropZoneCell.prototype, "onDragEnd", null);
    __decorate([
        core_1.HostListener('drop'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DropZoneCell.prototype, "handleOnDrop", null);
    DropZoneCell = __decorate([
        core_1.Component({
            selector: 'drop-zone-cell',
            template: '',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DropZoneCell);
    return DropZoneCell;
}());
exports.DropZoneCell = DropZoneCell;

//# sourceMappingURL=drop-zone-cell.js.map
