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
var GridImage = (function () {
    function GridImage() {
        this.hovering = false;
        this.clickedRemove = new core_1.EventEmitter();
        this.imageLoaded = new core_1.EventEmitter();
    }
    GridImage.prototype.onMouseEnter = function (e) {
        this.hovering = true;
    };
    GridImage.prototype.onMouseLeave = function (e) {
        this.hovering = false;
    };
    GridImage.prototype.remove = function () {
        this.clickedRemove.emit({ config: this.imageConfig, index: this.index });
    };
    GridImage.prototype.ngOnInit = function () {
        var _this = this;
        this._imageEl.nativeElement.src = this.imageConfig.url;
        this._listener = this._imageEl.nativeElement.addEventListener('load', function (e) {
            _this.imageLoaded.emit({ event: e, config: _this.imageConfig });
        });
    };
    GridImage.prototype.ngOnDestroy = function () {
        if (this._listener)
            this._imageEl.nativeElement.removeEventListener('load', this._listener);
    };
    __decorate([
        core_1.ViewChild('image'), 
        __metadata('design:type', core_1.ElementRef)
    ], GridImage.prototype, "_imageEl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "imageConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GridImage.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "clickedRemove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "imageLoaded", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], GridImage.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], GridImage.prototype, "onMouseLeave", null);
    GridImage = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-grid-image',
            templateUrl: './grid-image.html',
            styleUrls: ['./grid-image.css'],
            directives: [
                icon_1.MdIcon
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], GridImage);
    return GridImage;
}());
exports.GridImage = GridImage;

//# sourceMappingURL=grid-image.js.map
