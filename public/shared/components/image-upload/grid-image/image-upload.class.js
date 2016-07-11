"use strict";
var Observable_1 = require('rxjs/Observable');
var ImageUpload = (function () {
    function ImageUpload(file, idx) {
        this._file = file;
        this.idx = idx;
        this.filename = this.alias = file.name;
        this.mimetype = file.type;
        this.size = file.size;
        this.last_modified = file['lastModified'] || file.lastModifiedDate.getTime();
        if (file['webkitRelativePath']) {
            this.webkitRelativePath = file['webkitRelativePath'];
        }
        console.debug('ImageUpload constructed ...', this);
    }
    ImageUpload.prototype.map = function (mapFn) {
        var _this = this;
        var keys = Object.keys(this);
        keys.forEach(function (key) { return mapFn.apply(_this, [key, _this[key]]); });
    };
    ImageUpload.prototype.load = function () {
        var file = this._file;
        console.info('ImageUpload # read file: start', file);
        var filename = file.name;
        return Observable_1.Observable.create(function (observer) {
            console.debug('ImageUpload # read file: working', file);
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                console.debug('ImageUpload # read file: complete');
                observer.next(reader.result);
            };
            setTimeout(function () { return reader.readAsDataURL(file); }, 50);
        });
    };
    return ImageUpload;
}());
exports.ImageUpload = ImageUpload;

//# sourceMappingURL=image-upload.class.js.map
