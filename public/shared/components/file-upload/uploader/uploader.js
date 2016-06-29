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
var file_like_object_1 = require('./file-like-object');
var nextUniqueId = 0;
var FileUploader = (function () {
    function FileUploader() {
        this.queue = [];
        this.isUploading = false;
        this.progress = 0;
        console.log('Wow Im a file uploader');
    }
    FileUploader.prototype.addToQueue = function (files) {
        var list = [];
        var count = this.queue.length;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            this.queue.push(file);
        }
        if (this.queue.length !== count) {
            this.progress = this._getTotalProgress();
        }
    };
    FileUploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploader.prototype.uploadAll = function () {
        var _this = this;
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.forEach(function (item) {
            _this.prepareItem(item);
            _this.uploadItem(item);
        });
    };
    FileUploader.prototype.uploadItem = function (file) {
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this._upload(file);
    };
    FileUploader.prototype.prepareItem = function (item) {
        item.index = item.index || nextUniqueId++;
    };
    FileUploader.prototype.isFile = function (value) {
        return (File && value instanceof File);
    };
    FileUploader.prototype.isFileLikeObject = function (value) {
        return value instanceof file_like_object_1.FileLikeObject;
    };
    FileUploader.prototype._upload = function (file) {
    };
    FileUploader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FileUploader);
    return FileUploader;
}());
exports.FileUploader = FileUploader;

//# sourceMappingURL=uploader.js.map
