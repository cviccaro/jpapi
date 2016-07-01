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
var icon_1 = require('@angular2-material/icon');
var PanelSummaryImage = (function () {
    function PanelSummaryImage() {
        this.loaded = false;
    }
    PanelSummaryImage.prototype.ngOnInit = function () {
        this.url = this.image;
    };
    PanelSummaryImage.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('PanelSummaryImage AfterViewInit. ', this);
        var img = this._preview.nativeElement;
        img.addEventListener('load', function (e) {
            _this.loaded = true;
            _this.imageHeight = img.naturalHeight;
            _this.imageWidth = img.naturalWidth;
            var parts = img.currentSrc.split('/');
            _this.imageName = parts[parts.length - 1];
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryImage.prototype, "image", void 0);
    __decorate([
        core_1.ViewChild('preview'), 
        __metadata('design:type', core_1.ElementRef)
    ], PanelSummaryImage.prototype, "_preview", void 0);
    PanelSummaryImage = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-summary-image',
            templateUrl: './summary-image.component.html',
            styleUrls: ['./summary-image.component.css'],
            directives: [icon_1.MD_ICON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelSummaryImage);
    return PanelSummaryImage;
}());
exports.PanelSummaryImage = PanelSummaryImage;

//# sourceMappingURL=summary-image.component.js.map
