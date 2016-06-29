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
var Rx_1 = require('rxjs/Rx');
var nextUniqueId = 0;
var FileUploader = (function () {
    function FileUploader() {
        this.queue = [];
        this.isUploading = false;
        this.progress = 0;
        console.log('Wow Im a file uploader');
    }
    Object.defineProperty(FileUploader.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    FileUploader.prototype.setUrl = function (url) {
        console.log('ImageUploader set URL to ' + url);
        this._url = url;
    };
    Object.defineProperty(FileUploader.prototype, "authToken", {
        get: function () {
            return this._authToken;
        },
        enumerable: true,
        configurable: true
    });
    FileUploader.prototype.setAuthToken = function (token) {
        console.warn('ImageUploader set authtoken to ' + token);
        this._authToken = token;
    };
    FileUploader.prototype.addToQueue = function (items) {
        console.debug('Uploader.addToQueue() # ', items);
        var list = [];
        var count = this.queue.length;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var file = items_1[_i];
            this.queue.push(file);
        }
        if (this.queue.length !== count) {
            this.progress = this._getTotalProgress();
        }
        console.debug('ImageUploader added ' + (this.queue.length - count) + ' images.');
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
        var items = this.queue;
        console.log('ImageUploader.uploadAll() #', items);
        if (!items.length) {
            return Rx_1.Observable.of(false).delay(5000).do(function (val) { return val; });
        }
        return Rx_1.Observable.create(function (observer) {
            var items = _this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
            items.forEach(function (item) {
                _this.prepareItem(item);
                _this.uploadItem(item);
            });
        });
    };
    FileUploader.prototype.uploadItem = function (image) {
        console.log('ImageUploader.uploadItem()  # ', image);
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this._upload(image);
    };
    FileUploader.prototype.prepareItem = function (item) {
        item.index = item.index || nextUniqueId++;
    };
    FileUploader.prototype.isFile = function (value) {
        return (File && value instanceof File);
    };
    FileUploader.prototype.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
        return false;
    };
    FileUploader.prototype._upload = function (image) {
        var _this = this;
        console.log('ImageUploader._upload() #', image);
        var xhr = image._xhr = new XMLHttpRequest();
        var form = new FormData();
        image.map(function (key, val) {
            console.log('appending to form ', { key: key, val: val });
            form.append(key, val);
        });
        console.log('going to upload this here image: ', {
            image: image,
            form: form,
            xhr: xhr
        });
        image.isUploading = true;
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            var total = _this._getTotalProgress(progress);
            _this.progress = total;
            console.log('progress!!!!!!', { event: event, progress: progress, total: total, xhr: xhr });
        };
        xhr.onerror = function (e) { console.log('xhr on error', { e: e, xhr: xhr }); };
        xhr.onload = function (e) { console.log('xhr on load ', { e: e, xhr: xhr }); };
        xhr.onabort = function (e) { console.log('xhr on abort', { e: e, xhr: xhr }); };
        xhr.open('POST', this.url, true);
        if (this.authToken) {
            console.log('Setting Request Header "Authorization" to ', 'Bearer ' + this.authToken);
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.authToken);
        }
        xhr.send(form);
        console.log('just sent xhr!', xhr);
    };
    FileUploader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FileUploader);
    return FileUploader;
}());
exports.FileUploader = FileUploader;

//# sourceMappingURL=uploader.js.map
