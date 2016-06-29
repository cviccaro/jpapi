"use strict";
var ImageItem = (function () {
    function ImageItem(file) {
        this.index = void 0;
        this.progress = 0;
        this.isUploading = false;
        this.isUploaded = false;
        this._file = file;
        this.name = file.name;
        this.type = file.type;
        this.size = file.size;
        this.last_modified = file.lastModifiedDate;
        if (file['webkitRelativePath']) {
            this.webkitRelativePath = file['webkitRelativePath'];
        }
        console.info('ImageItem constructed ...', this);
    }
    ImageItem.prototype.map = function (mapFn) {
        var _this = this;
        var keys = Object.keys(this);
        keys.forEach(function (key) {
            switch (key) {
                case 'progress':
                case 'isUploading':
                case 'isUploaded':
                case '_xhr':
                    break;
                default:
                    var value = _this[key];
                    mapFn.apply(_this, [key, value]);
            }
        });
    };
    return ImageItem;
}());
exports.ImageItem = ImageItem;

//# sourceMappingURL=image-item.js.map
