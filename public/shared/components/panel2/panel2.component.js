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
var angular2_material_1 = require('../../libs/angular2-material');
var index_1 = require('./content/index');
var index_2 = require('./bar/index');
var PanelComponent = (function () {
    function PanelComponent(el) {
        this.el = el;
        this._expanded = false;
        this.onToggle = new core_1.EventEmitter();
    }
    Object.defineProperty(PanelComponent.prototype, "expandedClass", {
        get: function () { return this.expanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "jpapanelClass", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "expanded", {
        get: function () { return this._expanded; },
        set: function (v) {
            this._expanded = v;
            this.content.hidden = !v;
        },
        enumerable: true,
        configurable: true
    });
    PanelComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._toggleSub = this.bar.onToggle.subscribe(function (e) {
            _this.expanded = !_this.expanded;
            _this.onToggle.emit(_this.expanded);
        });
    };
    PanelComponent.prototype.ngOnDestroy = function () {
        if (this._toggleSub)
            this._toggleSub.unsubscribe();
    };
    __decorate([
        core_1.HostBinding('class.expanded'), 
        __metadata('design:type', Object)
    ], PanelComponent.prototype, "expandedClass", null);
    __decorate([
        core_1.HostBinding('class.jpa-panel'), 
        __metadata('design:type', Object)
    ], PanelComponent.prototype, "jpapanelClass", null);
    __decorate([
        core_1.ContentChild(index_1.PanelContentComponent), 
        __metadata('design:type', index_1.PanelContentComponent)
    ], PanelComponent.prototype, "content", void 0);
    __decorate([
        core_1.ContentChild(index_2.PanelBarComponent), 
        __metadata('design:type', index_2.PanelBarComponent)
    ], PanelComponent.prototype, "bar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelComponent.prototype, "onToggle", void 0);
    PanelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2',
            templateUrl: './panel2.component.html',
            styleUrls: ['./panel2.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                index_1.PanelContentComponent,
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PanelComponent);
    return PanelComponent;
}());
exports.PanelComponent = PanelComponent;

//# sourceMappingURL=panel2.component.js.map
