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
var FileIconComponent = (function () {
    function FileIconComponent() {
        this.size = 48;
    }
    Object.defineProperty(FileIconComponent.prototype, "iconUrl", {
        get: function () {
            return this.extension ?
                "/libs/Free-file-icons-master/" + this.size + "px/" + this.extension + ".png"
                : '';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileIconComponent.prototype, "extension", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileIconComponent.prototype, "size", void 0);
    FileIconComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-file-icon',
            templateUrl: './file-icon.component.html',
            styleUrls: ['./file-icon.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], FileIconComponent);
    return FileIconComponent;
}());
exports.FileIconComponent = FileIconComponent;

//# sourceMappingURL=file-icon.component.js.map
