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
var panel2_component_1 = require('../panel2.component');
var PanelGroupComponent = (function () {
    function PanelGroupComponent() {
        this.childExpanded = false;
    }
    Object.defineProperty(PanelGroupComponent.prototype, "expandedClass", {
        get: function () { return this.childExpanded; },
        enumerable: true,
        configurable: true
    });
    PanelGroupComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._panelChildren.forEach(function (panel) {
            panel.onToggle.subscribe(function (expanded) {
                _this.childExpanded = !!_this._panelChildren.filter(function (panel) { return panel.expanded; }).length;
            });
        });
    };
    __decorate([
        core_1.HostBinding('class.child-expanded'), 
        __metadata('design:type', Object)
    ], PanelGroupComponent.prototype, "expandedClass", null);
    __decorate([
        core_1.ContentChildren(panel2_component_1.PanelComponent), 
        __metadata('design:type', core_1.QueryList)
    ], PanelGroupComponent.prototype, "_panelChildren", void 0);
    PanelGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2-group',
            template: '<ng-content></ng-content>',
            styleUrls: ['./panel-group.component.css'],
            directives: [panel2_component_1.PanelComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelGroupComponent);
    return PanelGroupComponent;
}());
exports.PanelGroupComponent = PanelGroupComponent;

//# sourceMappingURL=panel-group.component.js.map
