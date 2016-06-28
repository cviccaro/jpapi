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
var uploader_1 = require('./uploader');
var noop = function () { };
var nextUniqueId = 0;
exports.JPA_FILE_UPLOAD_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return JpaFileUploadComponent; }),
    multi: true
});
var JpaFileUploadComponent = (function () {
    function JpaFileUploadComponent(uploader) {
        this.uploader = uploader;
        this.isDragOver = false;
        this.isLoading = false;
        this._progressIndeterminate = true;
        this._hasNew = false;
        this._added = 0;
        this._count = 0;
        this._galleryImagesLoaded = 0;
        this._value = [];
        this._onTouchedCallback = noop;
        this._onChangeCallback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.debug('JpaFileUploadComponent#onChangeCallback:', args);
        };
        this.multiple = false;
        this.images = [];
        this.name = null;
        this.id = "jpa-panel-" + nextUniqueId++;
        this.required = false;
        this.step = null;
        this.tabIndex = null;
        this.fileAdded = new core_1.EventEmitter();
        this.gridImageLoaded = new core_1.EventEmitter();
        this.onImageUploaded = new core_1.EventEmitter();
        this.onImageRemove = new core_1.EventEmitter();
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        console.debug('FileUploadComponent created! ', this);
    }
    JpaFileUploadComponent.prototype.onDragOver = function (e) {
        var transfer = this._getTransfer(e);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._stopEvent(e);
        this.isDragOver = true;
    };
    JpaFileUploadComponent.prototype.onDragLeave = function (e) {
        this._stopEvent(e);
        this.isDragOver = false;
    };
    JpaFileUploadComponent.prototype.onFileDrop = function (e) {
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        this._stopEvent(e);
        this.isDragOver = false;
        this.fileAdded.emit(files);
        this.isLoading = true;
        var _loop_1 = function(i) {
            var file = files[i];
            var reader = new FileReader();
            var k = i;
            this_1.isLoading = true;
            reader.addEventListener('load', function (e) {
                var filename = file.name;
                var newImage = { id: 'new', name: filename, image_url: reader.result, isNew: true };
                console.log('Loaded new image: ', newImage);
                _this.images.push(newImage);
                var value = _this.value;
                value.push(newImage);
                _this.value = value;
            });
            setTimeout(function () { reader.readAsDataURL(file); });
        };
        var this_1 = this;
        for (var i = 0; i < files.length; i++) {
            _loop_1(i);
        }
        console.log('FileUploadComponent#FileDrop', {
            e: e,
            this: this
        });
    };
    Object.defineProperty(JpaFileUploadComponent.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaFileUploadComponent.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    JpaFileUploadComponent.prototype.handleFocus = function (event) {
        console.log('FileUploadComponent#handleFocus', event);
    };
    JpaFileUploadComponent.prototype.handleBlur = function (event) {
        console.log('FileUploadComponent#handleBlur', event);
    };
    JpaFileUploadComponent.prototype.ngOnInit = function () {
        if (this.images === undefined) {
            this.isLoading = false;
            this._count = 0;
        }
        else {
            this.isLoading = !!this.images.length;
            this._count = this.images.length;
        }
    };
    JpaFileUploadComponent.prototype.ngAfterViewInit = function () {
        console.info('FileUploadComponent#AfterViewInit ---', this);
        if (this._gridImages) {
            console.log('got grid images: ', this._gridImages);
            this._gridImages.changes.subscribe(function (changes) {
                console.log('Changes to grid images: ', changes);
            });
        }
    };
    JpaFileUploadComponent.prototype.ngOnChanges = function (changes) {
        console.debug('FileUploadComponent#OnChanges ---', changes);
    };
    JpaFileUploadComponent.prototype.writeValue = function (value) {
        console.log('FileUploadComponent#writeValue?');
        if (value !== undefined) {
            this._value = value;
            console.log('FileUploadComponent#writeValue COMMIT TO ', value);
        }
        else {
            this._value = [];
            console.log('just set value to ...', {
                value: this._value
            });
        }
    };
    Object.defineProperty(JpaFileUploadComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('FileUploadComponent# set value(): ', {
                v: v,
                _value: this._value
            });
            if (v.length !== this._added) {
                this._added++;
                this._value = v;
                console.warn('emitting change', v);
                this.change.emit(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    JpaFileUploadComponent.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    JpaFileUploadComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    JpaFileUploadComponent.prototype._isArray = function (a) {
        return Array.isArray(a) && a.length;
    };
    JpaFileUploadComponent.prototype._stopEvent = function (e) {
        event.preventDefault();
        event.stopPropagation();
    };
    JpaFileUploadComponent.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    JpaFileUploadComponent.prototype._haveFiles = function (types) {
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
    JpaFileUploadComponent.prototype.imageLoaded = function (e) {
        if (e.config.id === 'new') {
            console.log('FileUpload# new Image loaded. ', {
                e: e,
                value: this.value
            });
            this._hasNew = true;
            this.isLoading = false;
            e._hasNew = true;
            this.onImageUploaded.emit(e);
        }
        else {
            var id = e.config.id;
            console.log('FileUpload# gallery Image (id ' + id + ') loaded. ', e);
            if (++this._galleryImagesLoaded === this.images.length) {
                this.isLoading = false;
            }
        }
        e._hasNew = this._hasNew;
        this.gridImageLoaded.emit(e);
    };
    JpaFileUploadComponent.prototype.imageRemoved = function (e) {
        console.log('FileUpload # image Removed', {
            e: e,
            value: this.value
        });
        this.images.splice(e.index, 1);
        if (this.value && this.value.length) {
            var idx = this.value.indexOf(e.config);
            if (idx !== -1) {
                this.value.splice(idx, 1);
            }
        }
        this.onImageRemove.emit(e);
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], JpaFileUploadComponent.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input('aria-labelledby'), 
        __metadata('design:type', String)
    ], JpaFileUploadComponent.prototype, "ariaLabelledBy", void 0);
    __decorate([
        core_1.Input('aria-disabled'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaFileUploadComponent.prototype, "ariaDisabled", void 0);
    __decorate([
        core_1.Input('aria-required'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaFileUploadComponent.prototype, "ariaRequired", void 0);
    __decorate([
        core_1.Input('aria-invalid'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaFileUploadComponent.prototype, "ariaInvalid", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaFileUploadComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], JpaFileUploadComponent.prototype, "images", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaFileUploadComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaFileUploadComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaFileUploadComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaFileUploadComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaFileUploadComponent.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], JpaFileUploadComponent.prototype, "fileAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JpaFileUploadComponent.prototype, "gridImageLoaded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JpaFileUploadComponent.prototype, "onImageUploaded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JpaFileUploadComponent.prototype, "onImageRemove", void 0);
    __decorate([
        core_1.ViewChildren(grid_image_1.GridImage), 
        __metadata('design:type', core_1.QueryList)
    ], JpaFileUploadComponent.prototype, "_gridImages", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Rx_1.Observable)
    ], JpaFileUploadComponent.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Rx_1.Observable)
    ], JpaFileUploadComponent.prototype, "onFocus", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JpaFileUploadComponent.prototype, "change", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaFileUploadComponent.prototype, "value", null);
    JpaFileUploadComponent = __decorate([
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
                grid_image_1.GridImage
            ],
            providers: [exports.JPA_FILE_UPLOAD_VALUE_ACCESSOR, uploader_1.FileUploader]
        }), 
        __metadata('design:paramtypes', [uploader_1.FileUploader])
    ], JpaFileUploadComponent);
    return JpaFileUploadComponent;
}());
exports.JpaFileUploadComponent = JpaFileUploadComponent;

//# sourceMappingURL=file-upload.component.js.map
