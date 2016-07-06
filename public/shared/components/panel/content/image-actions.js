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
var ImageActionsDirective = (function () {
    function ImageActionsDirective() {
        this.foo = 'bar';
    }
    ImageActionsDirective.prototype.show = function () {
        console.log('show these actions!!!!');
    };
    ImageActionsDirective = __decorate([
        core_1.Directive({
            selector: '[jp-image-actions]'
        }), 
        __metadata('design:paramtypes', [])
    ], ImageActionsDirective);
    return ImageActionsDirective;
}());
exports.ImageActionsDirective = ImageActionsDirective;

//# sourceMappingURL=image-actions.js.map
