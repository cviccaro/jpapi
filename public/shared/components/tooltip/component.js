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
var index_1 = require('./index');
var TooltipComponent = (function () {
    function TooltipComponent(data) {
        this.data = data;
        this._top = 0;
        this._left = 0;
        var boundingRect = this.data.el.nativeElement.getBoundingClientRect();
        this._top = boundingRect.top + (boundingRect.height / 4);
        if (data.align === 'left') {
            this._left = boundingRect.left - (this.data.text.length * 10);
        }
        else {
            this._left = boundingRect.left + boundingRect.width + 12;
        }
        this.text = this.data.text;
    }
    Object.defineProperty(TooltipComponent.prototype, "topStyle", {
        get: function () { return this._top + 'px'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipComponent.prototype, "leftStyle", {
        get: function () { return this._left + 'px'; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.HostBinding('style.top'), 
        __metadata('design:type', Object)
    ], TooltipComponent.prototype, "topStyle", null);
    __decorate([
        core_1.HostBinding('style.left'), 
        __metadata('design:type', Object)
    ], TooltipComponent.prototype, "leftStyle", null);
    TooltipComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-tooltip',
            template: '<div class="tooltip">{{ text }}</div>',
            styleUrls: ['./tooltip.css']
        }), 
        __metadata('design:paramtypes', [index_1.TooltipData])
    ], TooltipComponent);
    return TooltipComponent;
}());
exports.TooltipComponent = TooltipComponent;

//# sourceMappingURL=component.js.map
