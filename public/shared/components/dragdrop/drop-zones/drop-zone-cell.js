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
    }
    Object.defineProperty(DropZoneCell.prototype, "dropZoneCellClass", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    DropZoneCell.prototype.onDragEnter = function (event) {
        console.log('Drop Zone Cell ' + this.id + ' Drag Enter', event);
    };
    DropZoneCell.prototype.onDragLeave = function (event) {
        console.log('Drop Zone Cell ' + this.id + ' Drag Leave', event);
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
        core_1.HostBinding('class.drop-zone-cell'), 
        __metadata('design:type', Object)
    ], DropZoneCell.prototype, "dropZoneCellClass", null);
    __decorate([
        core_1.HostListener('dragenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropZoneCell.prototype, "onDragEnter", null);
    __decorate([
        core_1.HostListener('dragleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropZoneCell.prototype, "onDragLeave", null);
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
