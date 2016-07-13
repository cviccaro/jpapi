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
var TooltipDirective = (function () {
    function TooltipDirective(el, provider) {
        this.el = el;
        this.provider = provider;
        this._hasRef = false;
    }
    TooltipDirective.prototype.onMouseEnter = function (e) {
        var _this = this;
        clearTimeout(this._openTimer);
        this._openTimer = setTimeout(function () {
            _this.provider.open(_this.el, _this.tooltip, _this.tooltipAlign)
                .subscribe(function (e) {
                _this._cmpRef = e;
                _this._hasRef = true;
            });
        }, 500);
    };
    TooltipDirective.prototype.onMouseLeave = function (e) {
        clearTimeout(this._openTimer);
        this.destroyElement();
    };
    TooltipDirective.prototype.destroyElement = function () {
        if (this._hasRef) {
            this._cmpRef.destroy();
        }
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.destroyElement();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipDirective.prototype, "tooltip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipDirective.prototype, "tooltipAlign", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onMouseLeave", null);
    TooltipDirective = __decorate([
        core_1.Directive({
            selector: '[jpa-tooltip]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, index_1.JpaTooltip])
    ], TooltipDirective);
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;

//# sourceMappingURL=tooltip.js.map
