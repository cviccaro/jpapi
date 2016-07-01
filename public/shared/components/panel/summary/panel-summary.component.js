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
var common_1 = require('@angular/common');
var angular2_material_1 = require('../../../../shared/libs/angular2-material');
var summary_image_component_1 = require('../summary-image/summary-image.component');
var PanelSummaryComponent = (function () {
    function PanelSummaryComponent() {
        this.imageLoaded = false;
        this._currentImageSize = null;
        this._currentImageName = false;
        this._summary = '';
        this.expanded = false;
        this.empty = true;
        this.valueChanged = false;
    }
    Object.defineProperty(PanelSummaryComponent.prototype, "currentImageSize", {
        get: function () {
            return this._currentImageSize;
        },
        set: function (v) {
            this._currentImageSize = v;
        },
        enumerable: true,
        configurable: true
    });
    PanelSummaryComponent.prototype.ngAfterViewInit = function () {
        this.summary = this.value;
    };
    PanelSummaryComponent.prototype.report = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(this);
    };
    PanelSummaryComponent.prototype.setOptions = function (options) {
        if (options.length) {
            this._selectOptions = options.map(function (item) {
                return {
                    value: item['_element']['nativeElement']['value'],
                    label: item['_element']['nativeElement'].innerHTML
                };
            });
        }
    };
    Object.defineProperty(PanelSummaryComponent.prototype, "summary", {
        get: function () {
            return this._summary;
        },
        set: function (v) {
            this._summary = v;
        },
        enumerable: true,
        configurable: true
    });
    PanelSummaryComponent.prototype.ngOnChanges = function (changes) {
        for (var prop in changes) {
            var previousValue = changes[prop].previousValue;
            var currentValue = changes[prop].currentValue;
            var isFirstChange = changes[prop].isFirstChange;
            console.log('PanelSummary.' + prop + ' changed: ', { from: previousValue, to: currentValue, isFirstChange: isFirstChange });
            switch (prop) {
                case 'value':
                    this.setSummaryOf(currentValue);
                    break;
            }
        }
    };
    PanelSummaryComponent.prototype.setSummaryOf = function (value) {
        switch (this.type) {
            case 'select':
                var filtered = this._selectOptions.filter(function (opt) {
                    return opt['value'] == value;
                });
                if (filtered.length) {
                    this.summary = filtered[0]['label'];
                }
                break;
            default:
                this.summary = value;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelSummaryComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelSummaryComponent.prototype, "empty", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelSummaryComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryComponent.prototype, "gallery", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryComponent.prototype, "currentImage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelSummaryComponent.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelSummaryComponent.prototype, "editText", void 0);
    __decorate([
        core_1.ViewChild('imagePreview'), 
        __metadata('design:type', core_1.ElementRef)
    ], PanelSummaryComponent.prototype, "_imagePreview", void 0);
    PanelSummaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-summary',
            templateUrl: './panel-summary.component.html',
            styleUrls: ['./panel-summary.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, summary_image_component_1.PanelSummaryImage],
            viewProviders: [common_1.NgSwitch, common_1.NgSwitchCase, common_1.NgSwitchDefault]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelSummaryComponent);
    return PanelSummaryComponent;
}());
exports.PanelSummaryComponent = PanelSummaryComponent;

//# sourceMappingURL=panel-summary.component.js.map
