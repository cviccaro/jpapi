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
var dragdrop_service_1 = require('./dragdrop.service');
var DragDropAbstractComponent = (function () {
    function DragDropAbstractComponent(el, service, _cdr) {
        var _this = this;
        this.el = el;
        this.service = service;
        this._cdr = _cdr;
        this._elem = this.el.nativeElement;
        this._elem.addEventListener('dragover', function (e) {
            _this._onDragOver(e);
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = 'copy';
            }
            return false;
        });
        this._elem.addEventListener('drop', function (e) { return _this._onDrop(e); });
        this._elem.addEventListener('dragstart', function (event) {
            if (event.dataTransfer != null) {
                event.dataTransfer.setData('text', '');
                event.dataTransfer.effectAllowed = 'copy';
                _this._elem.style.cursor = 'move';
            }
        });
    }
    DragDropAbstractComponent.prototype._onDragOver = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
    };
    DragDropAbstractComponent.prototype._onDrop = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.detectChanges();
    };
    DragDropAbstractComponent.prototype.detectChanges = function () {
        var _this = this;
        setTimeout(function () {
            _this._cdr.detectChanges();
        }, 250);
    };
    DragDropAbstractComponent = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ElementRef, dragdrop_service_1.DragDropService, core_1.ChangeDetectorRef])
    ], DragDropAbstractComponent);
    return DragDropAbstractComponent;
}());
exports.DragDropAbstractComponent = DragDropAbstractComponent;

//# sourceMappingURL=dragdrop.component.js.map
