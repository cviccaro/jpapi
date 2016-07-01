"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var dragdrop_component_1 = require('./dragdrop.component');
var dragdrop_service_1 = require('./dragdrop.service');
var Draggable = (function (_super) {
    __extends(Draggable, _super);
    function Draggable(el, service, cdr) {
        _super.call(this, el, service, cdr);
        this.onDragStart = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        console.log('Draggable constructed', this);
    }
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragEnd", void 0);
    Draggable = __decorate([
        core_1.Directive({ selector: '[jpa-draggable]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, dragdrop_service_1.DragDropService, core_1.ChangeDetectorRef])
    ], Draggable);
    return Draggable;
}(dragdrop_component_1.DragDropAbstractComponent));
exports.Draggable = Draggable;

//# sourceMappingURL=draggable.js.map
