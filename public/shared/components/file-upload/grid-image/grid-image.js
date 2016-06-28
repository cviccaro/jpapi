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
var GridImage = (function () {
    function GridImage() {
        this.imageLoaded = new core_1.EventEmitter();
    }
    GridImage.prototype.ngOnInit = function () {
        var _this = this;
        this._imageEl.nativeElement.addEventListener('load', function (e) {
            console.log('GridImage Loaded.');
            _this.imageLoaded.emit({ event: e, config: _this.imageConfig });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "imageConfig", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "imageLoaded", void 0);
    __decorate([
        core_1.ViewChild('image'), 
        __metadata('design:type', core_1.ElementRef)
    ], GridImage.prototype, "_imageEl", void 0);
    GridImage = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-grid-image',
            template: '<img #image class="grid-image" [src]="imageConfig.image_url" [alt]="imageConfig.alt" [title]="imageConfig.title" [class.new]="imageConfig.isNew" />',
            styleUrls: ['./grid-image.css']
        }), 
        __metadata('design:paramtypes', [])
    ], GridImage);
    return GridImage;
}());
exports.GridImage = GridImage;

//# sourceMappingURL=grid-image.js.map
