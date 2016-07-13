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
var forms_1 = require('@angular/forms');
var Rx_1 = require('rxjs/Rx');
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var grid_list_1 = require('@angular2-material/grid-list');
var progress_bar_1 = require('@angular2-material/progress-bar');
var icon_1 = require('@angular2-material/icon');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var index_1 = require('./grid-image/index');
var file_1 = require('../../models/file');
var index_2 = require('./toolbar/index');
var index_3 = require('./file-card/index');
var index_4 = require('./file-icon/index');
var noop = function () { };
var nextUniqueId = 0;
exports.IMAGE_UPLOAD_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return FileUploadComponent; }),
    multi: true
});
var FileUploadComponent = (function () {
    function FileUploadComponent() {
        this.isDragOver = false;
        this.isLoading = false;
        this._imagesLoaded = 0;
        this._rows = [];
        this._cols = [];
        this._dragging = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._subscriptions = [];
        this.multiple = false;
        this.type = 'file';
        this.icon = 'panorama';
        this.name = null;
        this.accept = '*';
        this.required = false;
        this.id = "jpa-panel-" + nextUniqueId++;
        this.step = null;
        this.tabIndex = null;
        this.gutterSize = "8px";
        this.cols = 4;
        this.rowHeight = '16:9';
        this.imageLoaded = new core_1.EventEmitter();
        this.fileRemoved = new core_1.EventEmitter();
        this.fileAdded = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(FileUploadComponent.prototype, "empty", {
        get: function () {
            return this.value === undefined || this.value === null || Array.isArray(this.value) && this.value.length === 0 || Object.keys(this.value).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileUploadComponent.prototype, "typeClass", {
        get: function () {
            return "file-upload-" + this.type + " file-upload-" + (this.multiple ? 'multiple' : 'single');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileUploadComponent.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileUploadComponent.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FileUploadComponent.prototype.handleFocus = function (event) {
        console.log('FileUploadComponent#handleFocus', event);
    };
    FileUploadComponent.prototype.handleBlur = function (event) {
        console.log('FileUploadComponent#handleBlur', event);
    };
    Object.defineProperty(FileUploadComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            v = this.convertValueForInputType(v);
            if (v !== this._value) {
                this._value = v;
                this.change.emit(v);
                if (this.multiple) {
                    var ngModelValue = (Array.isArray(v) && v.length === 0) ? '' : v;
                    this._onChangeCallback(ngModelValue);
                }
                else {
                    this._onChangeCallback(v);
                }
                this._onTouchedCallback();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    FileUploadComponent.prototype.ngOnInit = function () {
        if (this.type === 'image' && this.accept === '*') {
            this.accept = 'image/jpeg, image/jpg, image/gif, image/png';
        }
    };
    FileUploadComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.type === 'image' && !this.multiple) {
            if (this._currentImageEl) {
                var imageEl_1 = this._currentImageEl.nativeElement;
                this.registerImageWatcher(imageEl_1);
                if (this.value.url)
                    setTimeout(function () { imageEl_1.src = _this._value.url; });
            }
        }
    };
    FileUploadComponent.prototype.registerImageWatcher = function (imageEl) {
        var _this = this;
        this.listener = function (event) {
            var val = _this.value;
            val.width = imageEl.naturalWidth;
            val.height = imageEl.naturalHeight;
            _this.value = val;
            if (_this.control) {
                _this.control.value = _this.value;
            }
        };
        imageEl.addEventListener('load', this.listener);
    };
    FileUploadComponent.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    FileUploadComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    FileUploadComponent.prototype.writeValue = function (value) {
        this._value = this.convertValueForInputType(value);
    };
    FileUploadComponent.prototype.convertValueForInputType = function (value) {
        var _this = this;
        if (!this.multiple) {
            if (!value)
                return '';
            return this.managedFile(this.type, value);
        }
        else {
            if (!value)
                return [];
            return value.map(function (item, i) { return _this.managedFile(_this.type, item, i); });
        }
    };
    FileUploadComponent.prototype.managedFile = function (type, value, idx) {
        if (idx === void 0) { idx = 0; }
        switch (type) {
            case 'image': if (!(value instanceof file_1.ManagedImage))
                return new file_1.ManagedImage(value, idx);
            case 'file': if (!(value instanceof file_1.ManagedFile))
                return new file_1.ManagedFile(value, idx);
        }
        return value;
    };
    FileUploadComponent.prototype._stopEvent = function (e) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileUploadComponent.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    FileUploadComponent.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    FileUploadComponent.prototype.gridImageLoaded = function (e) {
        e._hasNew = false;
        if (!e.config.hasOwnProperty('id')) {
            this.isLoading = false;
            e._hasNew = true;
        }
        else if (++this._imagesLoaded === this.value.length) {
            this.isLoading = false;
        }
        this.imageLoaded.emit(e);
    };
    FileUploadComponent.prototype.handleClickedRemove = function (e) {
        var value = this.value.slice(0);
        value.splice(e.index, 1);
        this.value = value;
        this.fileRemoved.emit(e);
    };
    FileUploadComponent.prototype.onDragOver = function (e) {
        if (this._dragging) {
            this._stopEvent(e);
            return;
        }
        var transfer = this._getTransfer(e);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._stopEvent(e);
        this.isDragOver = true;
    };
    FileUploadComponent.prototype.onDragLeave = function (e) {
        if (this._dragging) {
            return;
        }
        this._stopEvent(e);
        this.isDragOver = false;
    };
    FileUploadComponent.prototype.fileDragStart = function (e) {
        this._dragging = true;
    };
    FileUploadComponent.prototype.onDragEnd = function (e) {
        this._stopEvent(e);
        this._dragging = false;
    };
    FileUploadComponent.prototype.add = function (event) {
        if (this._dragging) {
            this._dragging = false;
            this.isDragOver = false;
            return;
        }
        var files = event.target['files'] || event['dataTransfer']['files'];
        this._stopEvent(event);
        this.isDragOver = false;
        this.readFiles(files);
    };
    FileUploadComponent.prototype.readFiles = function (files) {
        var _this = this;
        if (files === void 0) { files = []; }
        if (!files.length) {
            return;
        }
        this.isLoading = true;
        var _loop_1 = function(i) {
            var file = files[i];
            switch (this_1.type) {
                case 'image':
                    var managedImage_1 = new file_1.ManagedImage({ _file: file }, i);
                    var sub = managedImage_1.read().subscribe(function (e) {
                        managedImage_1.url = e;
                        _this.addToGrid(managedImage_1);
                        _this.isLoading = false;
                    });
                    this_1._subscriptions.push(sub);
                    break;
                default:
                    var managedFile = new file_1.ManagedFile({ _file: file }, i);
                    this_1.addToGrid(managedFile);
                    this_1.isLoading = false;
                    break;
            }
        };
        var this_1 = this;
        for (var i = 0; i < files.length; i++) {
            _loop_1(i);
        }
    };
    FileUploadComponent.prototype.addToGrid = function (file) {
        this.pushValue(file);
        this.fileAdded.emit(file);
    };
    FileUploadComponent.prototype.pushValue = function (file) {
        var value = this.value.slice(0);
        value.push(file);
        this.value = value;
    };
    FileUploadComponent.prototype.reorder = function (event, new_index) {
        var old_index = event.dragData;
        this._stopEvent(event.mouseEvent);
        this._dragging = false;
        if (old_index !== new_index) {
            this.moveFile(old_index, new_index);
        }
    };
    FileUploadComponent.prototype.moveFile = function (old_index, new_index) {
        var files = this.value;
        var source = files[old_index];
        var target = files[new_index];
        files[new_index] = source;
        files[old_index] = target;
        this.value = files;
    };
    ;
    FileUploadComponent.prototype.reset = function () {
        console.log('FileUploadComponent.reset()', this);
    };
    FileUploadComponent.prototype.handleSingleFileAttach = function (e) {
        this._stopEvent(e);
        var file;
        if (e instanceof File) {
            file = e;
        }
        else {
            var files = e.target.files || e.dataTransfer.files;
            file = files[0];
        }
        switch (this.type) {
            case 'image':
                this.attachSingleImage(file);
                break;
            case 'file':
                this.attachSingleFile(file);
                break;
        }
    };
    FileUploadComponent.prototype.attachSingleFile = function (file) {
        var managedFile = new file_1.ManagedFile({ _file: file }, 0);
        this.value = managedFile;
    };
    FileUploadComponent.prototype.attachSingleImage = function (file) {
        var _this = this;
        var image = new file_1.ManagedImage({ _file: file }, 0);
        this.isLoading = true;
        var sub = image.read().subscribe(function (e) {
            image.url = e;
            _this.value = image;
            var imageEl = _this._currentImageEl.nativeElement;
            imageEl.src = e;
            _this.isLoading = false;
        });
        this._subscriptions.push(sub);
    };
    FileUploadComponent.prototype.removeFile = function (e) {
        this.value = '';
    };
    FileUploadComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) {
            if (sub)
                sub.unsubscribe();
        });
        if (this._currentImageEl && this.listener) {
            this._currentImageEl.nativeElement.removeEventListener('load', this.listener);
        }
    };
    __decorate([
        core_1.ViewChildren(index_1.GridImage), 
        __metadata('design:type', core_1.QueryList)
    ], FileUploadComponent.prototype, "_gridImages", void 0);
    __decorate([
        core_1.ViewChild('currentImage'), 
        __metadata('design:type', core_1.ElementRef)
    ], FileUploadComponent.prototype, "_currentImageEl", void 0);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "typeClass", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FileUploadComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "control", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadComponent.prototype, "accept", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], FileUploadComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileUploadComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileUploadComponent.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FileUploadComponent.prototype, "gutterSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileUploadComponent.prototype, "cols", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "imageLoaded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "fileRemoved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "fileAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Rx_1.Observable)
    ], FileUploadComponent.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Rx_1.Observable)
    ], FileUploadComponent.prototype, "onFocus", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileUploadComponent.prototype, "value", null);
    FileUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-file-upload',
            templateUrl: './file-upload.component.html',
            styleUrls: ['./file-upload.component.css'],
            directives: [
                grid_list_1.MD_GRID_LIST_DIRECTIVES,
                progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES,
                icon_1.MD_ICON_DIRECTIVES,
                forms_1.NgModel,
                index_1.GridImage,
                ng2_dnd_1.DND_DIRECTIVES,
                index_2.FileUploadToolbar,
                index_3.FileCardComponent,
                index_4.FileIconComponent,
                common_1.NgSwitch,
                common_1.NgSwitchCase,
                common_1.NgSwitchDefault
            ],
            providers: [exports.IMAGE_UPLOAD_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;

//# sourceMappingURL=file-upload.component.js.map
