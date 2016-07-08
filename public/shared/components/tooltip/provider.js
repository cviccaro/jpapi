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
var Rx_1 = require('rxjs/Rx');
var interfaces_1 = require('./interfaces');
var component_1 = require('./component');
var JpaTooltip = (function () {
    function JpaTooltip(_cr) {
        this._cr = _cr;
    }
    JpaTooltip.prototype.registerContainer = function (container) {
        this.viewContainer = container;
    };
    JpaTooltip.prototype.open = function (el, text, align) {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this._cr.resolveComponent(component_1.TooltipComponent).then(function (cmpFactory) {
                var providers = core_1.ReflectiveInjector.resolve([
                    { provide: interfaces_1.TooltipData, useValue: new interfaces_1.TooltipData(el, text, align) },
                ]);
                var injector = core_1.ReflectiveInjector.fromResolvedProviders(providers, _this.viewContainer.parentInjector);
                return _this.viewContainer.createComponent(cmpFactory, _this.viewContainer.length, injector);
            }).then(function (cmpRef) {
                _this._toolTipCmp = cmpRef;
                _this.viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
                observer.next(_this._toolTipCmp);
                observer.complete();
            });
        });
    };
    JpaTooltip.prototype.close = function () {
        if (this._toolTipCmp)
            this._toolTipCmp.destroy();
    };
    JpaTooltip = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentResolver])
    ], JpaTooltip);
    return JpaTooltip;
}());
exports.JpaTooltip = JpaTooltip;

//# sourceMappingURL=provider.js.map
