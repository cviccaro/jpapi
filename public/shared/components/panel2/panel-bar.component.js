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
var angular2_material_1 = require('../../libs/angular2-material');
var PanelBarTitleComponent = (function () {
    function PanelBarTitleComponent() {
        this.onClick = new core_1.EventEmitter();
    }
    PanelBarTitleComponent.prototype._onClick = function () {
        this.onClick.emit(this);
    };
    PanelBarTitleComponent.prototype.ngAfterViewInit = function () {
        console.log('PanelBarTitle View Initialized', this);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelBarTitleComponent.prototype, "onClick", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], PanelBarTitleComponent.prototype, "_onClick", null);
    PanelBarTitleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2-bar-title',
            template: '<ng-content></ng-content>'
        }), 
        __metadata('design:paramtypes', [])
    ], PanelBarTitleComponent);
    return PanelBarTitleComponent;
}());
exports.PanelBarTitleComponent = PanelBarTitleComponent;
var PanelBarSubtitleComponent = (function (_super) {
    __extends(PanelBarSubtitleComponent, _super);
    function PanelBarSubtitleComponent() {
        _super.apply(this, arguments);
    }
    PanelBarSubtitleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2-bar-subtitle',
            template: '<ng-content></ng-content>'
        }), 
        __metadata('design:paramtypes', [])
    ], PanelBarSubtitleComponent);
    return PanelBarSubtitleComponent;
}(PanelBarTitleComponent));
exports.PanelBarSubtitleComponent = PanelBarSubtitleComponent;
var PanelBarComponent = (function () {
    function PanelBarComponent() {
        this.onToggle = new core_1.EventEmitter();
    }
    PanelBarComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        var titles = this.titleCmps.toArray().concat(this.subTitleCmps.toArray());
        titles.forEach(function (titleCmp) {
            titleCmp.onClick.subscribe(function (e) {
                _this.toggle(e);
            });
        });
        console.log('PanelBarComponent Content Initialized ', this);
    };
    PanelBarComponent.prototype.ngAfterViewInit = function () {
        console.log('PanelBarComponent View Initialized ', this);
    };
    PanelBarComponent.prototype.toggle = function (event) {
        console.log('PanelBarComponent toggle ', event);
        this.onToggle.emit(event);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelBarComponent.prototype, "onToggle", void 0);
    __decorate([
        core_1.ContentChildren(PanelBarTitleComponent), 
        __metadata('design:type', core_1.QueryList)
    ], PanelBarComponent.prototype, "titleCmps", void 0);
    __decorate([
        core_1.ContentChildren(PanelBarSubtitleComponent), 
        __metadata('design:type', core_1.QueryList)
    ], PanelBarComponent.prototype, "subTitleCmps", void 0);
    PanelBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2-bar',
            templateUrl: './panel-bar.component.html',
            styleUrls: ['./panel-bar.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, PanelBarTitleComponent, PanelBarSubtitleComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelBarComponent);
    return PanelBarComponent;
}());
exports.PanelBarComponent = PanelBarComponent;

//# sourceMappingURL=panel-bar.component.js.map
