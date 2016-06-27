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
var JpaPanelContent = (function () {
    function JpaPanelContent() {
        this._hasImage = false;
        this.imageExtension = '';
        this.image = null;
    }
    JpaPanelContent.prototype.ngOnInit = function () {
        console.log('NgOnInit PanelContent!!!!');
        if (this.image !== null && this.image !== undefined)
            this._hasImage = true;
    };
    JpaPanelContent.prototype.ngAfterContentInit = function () {
        if (this._hasImage) {
            this.imageExtension = 'image/' + this.image.split('.').pop();
        }
    };
    JpaPanelContent.prototype.ngAfterViewInit = function () {
        console.debug('PanelContent view initialized.', this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanelContent.prototype, "image", void 0);
    JpaPanelContent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-content',
            templateUrl: './panel-content.component.html',
            styleUrls: ['./panel-content.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], JpaPanelContent);
    return JpaPanelContent;
}());
exports.JpaPanelContent = JpaPanelContent;

//# sourceMappingURL=panel-content.component.js.map
