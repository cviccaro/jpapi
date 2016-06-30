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
var angular2_material_1 = require('../../../../shared/libs/angular2-material');
var PanelSummaryComponent = (function () {
    function PanelSummaryComponent() {
        this.imageLoaded = false;
        this._currentImageSize = null;
        this._currentImageName = false;
        this.summary = '';
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
        var _this = this;
        console.log('PanelSummary# AfterViewInit', this);
        if (this._imagePreview) {
            console.log('Binding to image preview to check its loaded status ', this._imagePreview);
            this._imagePreview.nativeElement.addEventListener('load', function (e) {
                _this.imageLoaded = true;
                _this.currentImageSize = { w: _this._imagePreview.nativeElement.naturalWidth, h: _this._imagePreview.nativeElement.naturalHeight };
                var parts = _this._imagePreview.nativeElement.currentSrc.split('/');
                _this._currentImageName = parts[parts.length - 1];
                console.log(_this);
            });
        }
        else {
            console.log('Skipping image preview check because it is does not exist. ', this);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelSummaryComponent.prototype, "summary", void 0);
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
            directives: [angular2_material_1.MATERIAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelSummaryComponent);
    return PanelSummaryComponent;
}());
exports.PanelSummaryComponent = PanelSummaryComponent;

//# sourceMappingURL=panel-summary.component.js.map
