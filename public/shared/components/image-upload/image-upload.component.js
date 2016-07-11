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
var jp_file_1 = require('../../models/jp-file');
var index_2 = require('./toolbar/index');
var index_3 = require('./file-icon/index');
var auth_service_1 = require('../../services/auth.service');
var noop = function () { };
var nextUniqueId = 0;
exports.IMAGE_UPLOAD_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return ImageUploadComponent; }),
    multi: true
});
var ImageUploadComponent = (function () {
    function ImageUploadComponent(authService) {
        this.isDragOver = false;
        this.isLoading = false;
        this._imagesLoaded = 0;
        this._value = [];
        this._rows = [];
        this._cols = [];
        this._dragging = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.multiple = false;
        this.images = [];
        this.type = 'file';
        this.icon = 'panorama';
        this.gutterSize = "8px";
        this.cols = 4;
        this.rowHeight = '16:9';
        this.name = null;
        this.required = false;
        this.id = "jpa-panel-" + nextUniqueId++;
        this.step = null;
        this.tabIndex = null;
        this.accept = '*';
        this.fileAdded = new core_1.EventEmitter();
        this.imageLoaded = new core_1.EventEmitter();
        this.imageAdded = new core_1.EventEmitter();
        this.imageRemoved = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(ImageUploadComponent.prototype, "typeClass", {
        get: function () {
            return "file-upload-" + this.type + " file-upload-" + (this.multiple ? 'multiple' : 'single');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "empty", {
        get: function () {
            return this.value === undefined || this.value === null || Array.isArray(this.value) && this.value.length === 0 || Object.keys(this.value).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ImageUploadComponent.prototype.handleFocus = function (event) {
        console.log('ImageUploadComponent#handleFocus', event);
    };
    ImageUploadComponent.prototype.handleBlur = function (event) {
        console.log('ImageUploadComponent#handleBlur', event);
    };
    Object.defineProperty(ImageUploadComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('ImageUploadComponent# set value(): ', {
                v: v,
                _value: this._value
            });
            if (v !== this._value) {
                this._value = v;
                console.warn('emitting change', v);
                this.change.emit(v);
                if (this.multiple) {
                    var val = v.length === 0 ? '' : v;
                    this._onChangeCallback(val);
                }
                else {
                    this._onChangeCallback(v);
                }
                this._onTouchedCallback();
            }
            else {
                console.debug('ImageUploadComponent# not emitting change events');
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ImageUploadComponent.prototype.ngOnInit = function () {
        if (this.type === 'image' && this.accept === '*') {
            this.accept = 'image/jpeg, image/jpg, image/gif, image/png';
        }
    };
    ImageUploadComponent.prototype.ngAfterViewInit = function () {
        if (this.type === 'image' && !this.multiple) {
            console.debug('ImageUploadComponent | image - single #ngAfterViewInit().  Subscribing to image load...', {
                this: this,
                imageEl: this._currentImageEl
            });
            if (this._currentImageEl) {
                var imageEl = this._currentImageEl.nativeElement;
                this.imageLoad(imageEl);
            }
        }
    };
    ImageUploadComponent.prototype.imageLoad = function (imageEl) {
        var _this = this;
        console.warn('ImageUploadComponent. imageLoad()');
        imageEl.addEventListener('load', function (event) {
            console.debug('ImageUploadComponent.imageLoad() ....  Image loaded!', event);
            var val = _this.value;
            val.width = imageEl.naturalWidth;
            val.height = imageEl.naturalHeight;
            _this.value = val;
            _this.change.emit(_this.value);
        });
        setTimeout(function () { imageEl.src = _this._value.url; });
    };
    ImageUploadComponent.prototype.writeValue = function (value) {
        var _this = this;
        var m = this.multiple ? 'multiple' : 'single';
        console.debug('ImageUpload --- ' + m + ' -- #writeValue: ', { value: value });
        if (!this.multiple) {
            switch (this.type) {
                case 'image':
                    if (value) {
                        this._value = new jp_file_1.ManagedImage(value, 0);
                        setTimeout(function () {
                            if (_this._currentImageEl) {
                                var imageEl = _this._currentImageEl.nativeElement;
                                _this.imageLoad(imageEl);
                            }
                        });
                    }
                    else {
                        this._value = '';
                    }
                    break;
                default:
                    this._value = value ? new jp_file_1.ManagedFile(value, 0) : '';
                    break;
            }
        }
        else {
            var v = value || [];
            console.warn('about to run v.map ! ', v);
            this._value = v.map(function (item, i) {
                switch (_this.type) {
                    case 'image': return new jp_file_1.ManagedImage(item, i);
                    default: return new jp_file_1.ManagedFile(item, i);
                }
            });
        }
        console.debug('ImageUpload#writeValue: ', { value: this._value });
    };
    ImageUploadComponent.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    ImageUploadComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    ImageUploadComponent.prototype._stopEvent = function (e) {
        event.preventDefault();
        event.stopPropagation();
    };
    ImageUploadComponent.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    ImageUploadComponent.prototype._haveFiles = function (types) {
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
    ImageUploadComponent.prototype.gridImageLoaded = function (e) {
        e._hasNew = false;
        if (!e.config.hasOwnProperty('id')) {
            this.isLoading = false;
            e._hasNew = true;
        }
        else {
            var id = e.config.id;
            if (++this._imagesLoaded === this.value.length) {
                this.isLoading = false;
            }
        }
        this.imageLoaded.emit(e);
    };
    ImageUploadComponent.prototype.handleClickedRemove = function (e) {
        console.debug('ImageUpload.handleClickedRemove', {
            e: e,
            value: this.value
        });
        var value = this.value.slice(0);
        value.splice(e.index, 1);
        this.value = value;
        this.imageRemoved.emit(e);
    };
    ImageUploadComponent.prototype.onDragOver = function (e) {
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
    ImageUploadComponent.prototype.onDragLeave = function (e) {
        if (this._dragging) {
            return;
        }
        this._stopEvent(e);
        this.isDragOver = false;
    };
    ImageUploadComponent.prototype.fileDragStart = function (e) {
        console.log('ImageUploadComponent#fileDragStart', e);
        this._dragging = true;
    };
    ImageUploadComponent.prototype.onDragEnd = function (e) {
        console.debug('onDragEnd');
        this._stopEvent(e);
        this._dragging = false;
    };
    ImageUploadComponent.prototype.add = function (e) {
        if (this._dragging) {
            console.log('add cancelling because we are dragging image.');
            this._dragging = false;
            return;
        }
        else {
            console.log('add ', e);
            var files = e.target.files || e.dataTransfer.files;
            this._stopEvent(e);
            this.fileAdded.emit(files);
            this.isDragOver = false;
            this.isLoading = true;
            this.readFiles(files);
        }
        console.log('ImageUploadComponent#add', {
            e: e,
            this: this
        });
    };
    ImageUploadComponent.prototype.readFiles = function (files) {
        var _this = this;
        var count = this.value.slice(0).length;
        var _loop_1 = function(i) {
            var file = files[i];
            var image = new index_1.ImageUpload(file);
            var reader = new FileReader();
            this_1.isLoading = true;
            reader.addEventListener('load', function (e) {
                image.url = reader.result;
                _this.addImageToGrid(image);
                _this.isLoading = false;
            });
            setTimeout(function () { reader.readAsDataURL(file); });
        };
        var this_1 = this;
        for (var i = 0; i < files.length; i++) {
            _loop_1(i);
        }
    };
    ImageUploadComponent.prototype.addImageToGrid = function (image) {
        console.log('Loaded new image: ', image);
        var value = this.value.slice(0);
        value.push(image);
        this.value = value;
        this.imageAdded.emit(image);
    };
    ImageUploadComponent.prototype.reorder = function (event, new_index) {
        var old_index = event.dragData;
        this._stopEvent(event.mouseEvent);
        console.info('ImageUploadComponent#reorder', {
            old_index: old_index,
            new_index: new_index,
            event: event
        });
        this._dragging = false;
        if (old_index !== new_index) {
            this.moveImage(old_index, new_index);
        }
    };
    ImageUploadComponent.prototype.moveImage = function (old_index, new_index) {
        var images = this.value;
        var source = images[old_index];
        var target = images[new_index];
        images[new_index] = source;
        images[old_index] = target;
        this.value = images;
        console.log('Just dropped image from drop zone ' + old_index + ' to drop zone ' + new_index);
    };
    ;
    ImageUploadComponent.prototype.reset = function () {
    };
    ImageUploadComponent.prototype.handleSingleFileAttach = function (e) {
        console.log('handle single file attach ', e);
        this._stopEvent(e);
        var files = e.target.files || e.dataTransfer.files;
        var file = files[0];
        switch (this.type) {
            case 'image':
                this.attachSingleImage(file);
                break;
            case 'file':
                this.attachSingleFile(file);
                break;
        }
    };
    ImageUploadComponent.prototype.attachSingleFile = function (file) {
        console.log('Attach Single File: ', file);
        var managedFile = new jp_file_1.ManagedFile({ _file: file }, 0);
        console.log('attachSingleFile created new ManagedFile ', managedFile);
        this.value = managedFile;
    };
    ImageUploadComponent.prototype.attachSingleImage = function (file) {
        var _this = this;
        console.log('Attach Single Image: ', file);
        var image = new index_1.ImageUpload(file);
        console.log('attachSingleImage created new ImageUpload ', image);
        var reader = new FileReader();
        this.isLoading = true;
        image.load().subscribe(function (e) {
            image.url = e;
            _this.value = image;
            setTimeout(function () {
                var imageEl = _this._currentImageEl.nativeElement;
                imageEl.src = e;
                var val = _this.value;
                val.width = imageEl.naturalWidth;
                val.height = imageEl.naturalHeight;
                _this.value = val;
                _this.change.emit(_this.value);
                _this.isLoading = false;
            });
        });
        setTimeout(function () { reader.readAsDataURL(file); });
    };
    ImageUploadComponent.prototype.remove = function (e) {
        this.value = '';
    };
    ImageUploadComponent.prototype.replace = function (e) {
        console.log('ImageUploadComponent#replace ' + this.type + ' ', e);
        this.handleSingleFileAttach(e);
    };
    __decorate([
        core_1.ViewChildren(index_1.GridImage), 
        __metadata('design:type', core_1.QueryList)
    ], ImageUploadComponent.prototype, "_gridImages", void 0);
    __decorate([
        core_1.ViewChild(grid_list_1.MdGridList), 
        __metadata('design:type', grid_list_1.MdGridList)
    ], ImageUploadComponent.prototype, "_gridList", void 0);
    __decorate([
        core_1.ViewChild('currentImage'), 
        __metadata('design:type', core_1.ElementRef)
    ], ImageUploadComponent.prototype, "_currentImageEl", void 0);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "typeClass", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ImageUploadComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ImageUploadComponent.prototype, "images", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "gutterSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageUploadComponent.prototype, "cols", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], ImageUploadComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageUploadComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageUploadComponent.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "accept", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageUploadComponent.prototype, "fileAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "imageLoaded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "imageAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "imageRemoved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Rx_1.Observable)
    ], ImageUploadComponent.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Rx_1.Observable)
    ], ImageUploadComponent.prototype, "onFocus", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "value", null);
    ImageUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-image-upload',
            templateUrl: './image-upload.component.html',
            styleUrls: ['./image-upload.component.css'],
            directives: [
                grid_list_1.MD_GRID_LIST_DIRECTIVES,
                progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES,
                icon_1.MD_ICON_DIRECTIVES,
                forms_1.NgModel,
                index_1.GridImage,
                ng2_dnd_1.DND_DIRECTIVES,
                index_2.FileUploadToolbar,
                index_3.FileIconComponent,
                common_1.NgSwitch,
                common_1.NgSwitchCase,
                common_1.NgSwitchDefault
            ],
            providers: [exports.IMAGE_UPLOAD_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], ImageUploadComponent);
    return ImageUploadComponent;
}());
exports.ImageUploadComponent = ImageUploadComponent;

//# sourceMappingURL=image-upload.component.js.map
