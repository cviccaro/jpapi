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
var forms_1 = require('@angular/forms');
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var grid_list_1 = require('@angular2-material/grid-list');
var progress_bar_1 = require('@angular2-material/progress-bar');
var icon_1 = require('@angular2-material/icon');
var Rx_1 = require('rxjs/Rx');
var grid_image_1 = require('./grid-image/grid-image');
var index_1 = require('./uploader/index');
var auth_service_1 = require('../../services/auth.service');
var noop = function () { };
var nextUniqueId = 0;
exports.IMAGE_UPLOAD_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return ImageUploadComponent; }),
    multi: true
});
var ImageUploadComponent = (function () {
    function ImageUploadComponent(uploader, authService) {
        this.isDragOver = false;
        this.isLoading = false;
        this._count = 0;
        this._empty = false;
        this._added = 0;
        this._imagesLoaded = 0;
        this._value = [];
        this._nextWeight = 0;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.multiple = false;
        this.images = [];
        this.gutterSize = "8px";
        this.cols = 4;
        this.rowHeight = '16:9';
        this.name = null;
        this.required = false;
        this.id = "jpa-panel-" + nextUniqueId++;
        this.step = null;
        this.tabIndex = null;
        this.fileAdded = new core_1.EventEmitter();
        this.imageLoaded = new core_1.EventEmitter();
        this.imageAdded = new core_1.EventEmitter();
        this.imageRemoved = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
        this.uploader = uploader;
        this.uploader.setAuthToken(authService.getToken());
    }
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
    ImageUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.setUrl(this.url);
        this.isLoading = this._empty = !!this.images.length;
        this._count = this.images.length;
        this.images.forEach(function (image) {
            if (image.weight >= _this._nextWeight) {
                _this._nextWeight = image.weight + 5;
            }
        });
        console.log('ImageUploadComponent.OnInit', this);
    };
    ImageUploadComponent.prototype.ngAfterViewInit = function () {
        console.info('ImageUploadComponent#AfterViewInit ---', this);
        if (this._gridImages) {
            console.log('got grid images: ', this._gridImages);
            this._gridImages.changes.subscribe(function (changes) {
                console.log('Changes to grid images: ', changes);
            });
        }
    };
    ImageUploadComponent.prototype.ngOnChanges = function (changes) {
        console.debug('ImageUploadComponent#OnChanges ---', changes);
    };
    ImageUploadComponent.prototype.onDragOver = function (e) {
        var transfer = this._getTransfer(e);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._stopEvent(e);
        this.isDragOver = true;
    };
    ImageUploadComponent.prototype.onDragLeave = function (e) {
        this._stopEvent(e);
        this.isDragOver = false;
    };
    ImageUploadComponent.prototype.onFileDrop = function (e) {
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        this._stopEvent(e);
        this.isDragOver = false;
        this.fileAdded.emit(files);
        this.isLoading = true;
        var count = this.value.length;
        var _loop_1 = function(i) {
            var file = files[i];
            var value = this_1.value;
            value.push(file);
            this_1.value = value;
            var image = new index_1.ImageItem(file);
            this_1.uploader.addToQueue([image]);
            var reader = new FileReader();
            var k = i;
            this_1.isLoading = true;
            reader.addEventListener('load', function (e) {
                file._weight = _this._nextWeight;
                _this._nextWeight = _this._nextWeight + 5;
                var newImage = {
                    id: 'upload_' + i,
                    name: file.name,
                    image_url: reader.result,
                    isNew: true,
                    _file: file,
                    weight: file._weight
                };
                _this.addImageToGrid(newImage);
            });
            setTimeout(function () { reader.readAsDataURL(file); });
        };
        var this_1 = this;
        for (var i = 0; i < files.length; i++) {
            _loop_1(i);
        }
        console.log('ImageUploadComponent#FileDrop', {
            e: e,
            this: this
        });
    };
    ImageUploadComponent.prototype.addImageToGrid = function (image) {
        console.log('Loaded new image: ', image);
        this.images.push(image);
        this.imageAdded.emit(image);
    };
    Object.defineProperty(ImageUploadComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('ImageUploadComponent# set value(): ', {
                v: v,
                _value: this._value
            });
            if (v.length !== this._added) {
                this._added++;
                this._value = v;
                console.warn('emitting change', v);
                this.change.emit(v);
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ImageUploadComponent.prototype.writeValue = function (value) {
        this._value = value || [];
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
    ImageUploadComponent.prototype.handleImageLoaded = function (e) {
        e._hasNew = false;
        if (e.config.isNew) {
            console.debug('ImageUpload.handleImageLoaded NEW', {
                e: e,
                value: this.value
            });
            this.isLoading = false;
            e._hasNew = true;
        }
        else {
            var id = e.config.id;
            if (++this._imagesLoaded === this.images.length) {
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
        this.images.splice(e.index, 1);
        if (this.value && this.value.length) {
            console.log('Searching through value to remove', this.value);
            var idx = this.value.indexOf(e.config._file);
            console.log('indexOf result', { idx: idx });
            if (idx !== -1) {
                this.value = this._value.splice(idx, 1);
            }
        }
        this.imageRemoved.emit(e);
    };
    __decorate([
        core_1.ViewChildren(grid_image_1.GridImage), 
        __metadata('design:type', core_1.QueryList)
    ], ImageUploadComponent.prototype, "_gridImages", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], ImageUploadComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ImageUploadComponent.prototype, "images", void 0);
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
                grid_image_1.GridImage
            ],
            providers: [exports.IMAGE_UPLOAD_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [index_1.FileUploader, auth_service_1.AuthService])
    ], ImageUploadComponent);
    return ImageUploadComponent;
}());
exports.ImageUploadComponent = ImageUploadComponent;

//# sourceMappingURL=image-upload.component.js.map
