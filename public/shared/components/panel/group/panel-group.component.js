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
var index_1 = require('../index');
var JpaPanelGroup = (function () {
    function JpaPanelGroup() {
        this.childExpanded = false;
    }
    Object.defineProperty(JpaPanelGroup.prototype, "expandedClass", {
        get: function () { return this.childExpanded; },
        enumerable: true,
        configurable: true
    });
    JpaPanelGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        console.log('Subscribing to ' + this._panelChildren.length + ' panel changes. ');
        this._panelChildren.forEach(function (panel) {
            console.log('Subscribing to onExpand for this panel', panel);
            panel.onExpand.subscribe(function (e) {
                console.log('expand event: ', e);
                _this.childExpanded = e;
            });
        });
    };
    JpaPanelGroup.prototype.ngAfterViewInit = function () {
        console.log('JpaPanelGroup#afterViewInit', this);
    };
    __decorate([
        core_1.HostBinding('class.child-expanded'), 
        __metadata('design:type', Object)
    ], JpaPanelGroup.prototype, "expandedClass", null);
    __decorate([
        core_1.ContentChildren(index_1.JpaPanel), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanelGroup.prototype, "_panelChildren", void 0);
    JpaPanelGroup = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-group',
            template: '<ng-content></ng-content>',
            styleUrls: ['./panel-group.component.css'],
            directives: [index_1.JpaPanel]
        }), 
        __metadata('design:paramtypes', [])
    ], JpaPanelGroup);
    return JpaPanelGroup;
}());
exports.JpaPanelGroup = JpaPanelGroup;

//# sourceMappingURL=panel-group.component.js.map
