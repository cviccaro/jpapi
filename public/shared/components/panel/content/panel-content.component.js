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
var grid_list_1 = require('@angular2-material/grid-list');
var JpaPanelContent = (function () {
    function JpaPanelContent(el) {
        this.el = el;
        this._hasImage = false;
        this.imageExtension = '';
        this.image = null;
        this.align = 'right';
    }
    JpaPanelContent.prototype.ngOnInit = function () {
        if (this.image !== null && this.image !== undefined)
            this._hasImage = true;
    };
    JpaPanelContent.prototype.ngAfterContentInit = function () {
        if (this._hasImage) {
            this.imageExtension = 'image/' + this.image.split('.').pop();
        }
        if (this.el.nativeElement.classList.contains('bottom')) {
            this.align = 'bottom';
        }
    };
    JpaPanelContent.prototype.ngAfterViewInit = function () {
        console.debug('PanelContent view initialized.', this);
    };
    JpaPanelContent.prototype.onToggle = function (expanded) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanelContent.prototype, "image", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanelContent.prototype, "align", void 0);
    __decorate([
        core_1.ContentChild(grid_list_1.MdGridList), 
        __metadata('design:type', grid_list_1.MdGridList)
    ], JpaPanelContent.prototype, "_gridList", void 0);
    JpaPanelContent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-content',
            templateUrl: './panel-content.component.html',
            styleUrls: ['./panel-content.component.css'],
            directives: [grid_list_1.MdGridList]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], JpaPanelContent);
    return JpaPanelContent;
}());
exports.JpaPanelContent = JpaPanelContent;

//# sourceMappingURL=panel-content.component.js.map
