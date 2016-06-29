"use strict";
var FileItem = (function () {
    function FileItem() {
        this.alias = 'file';
        this.url = '/';
        this.method = 'POST';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
    }
    return FileItem;
}());
exports.FileItem = FileItem;

//# sourceMappingURL=file-item.js.map
