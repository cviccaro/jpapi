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
var angular2_moment_1 = require('angular2-moment');
var angular2_material_1 = require('../../../libs/angular2-material');
var index_1 = require('../../tooltip/index');
var FileUploadToolbar = (function () {
    function FileUploadToolbar() {
        this.new_file = '';
        this.type = 'file';
        this.accept = '*';
        this.icon = 'panorama';
        this.onRemoveFile = new core_1.EventEmitter();
        this.onReplaceFile = new core_1.EventEmitter();
    }
    FileUploadToolbar.prototype.removeFile = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.onRemoveFile.emit(evt);
    };
    FileUploadToolbar.prototype.replaceFile = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._newFileInput.nativeElement.dispatchEvent(new Event('click'));
    };
    FileUploadToolbar.prototype.fileReplaced = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        this.onReplaceFile.emit(evt.target['files'][0]);
    };
    FileUploadToolbar.prototype.fileDescriptionChanged = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadToolbar.prototype, "file", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadToolbar.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadToolbar.prototype, "accept", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadToolbar.prototype, "icon", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadToolbar.prototype, "onRemoveFile", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadToolbar.prototype, "onReplaceFile", void 0);
    __decorate([
        core_1.ViewChild('newFile'), 
        __metadata('design:type', core_1.ElementRef)
    ], FileUploadToolbar.prototype, "_newFileInput", void 0);
    FileUploadToolbar = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-file-upload-toolbar',
            templateUrl: './toolbar.component.html',
            styleUrls: ['./toolbar.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, common_1.NgSwitch, common_1.NgSwitchCase, index_1.TooltipDirective],
            pipes: [angular2_moment_1.DateFormatPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], FileUploadToolbar);
    return FileUploadToolbar;
}());
exports.FileUploadToolbar = FileUploadToolbar;

//# sourceMappingURL=toolbar.component.js.map
