"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var error_1 = require('@angular2-material/core/errors/error');
var Observable_1 = require('rxjs/Observable');
var input_1 = require('@angular2-material/input');
var angular2_material_1 = require('../../libs/angular2-material');
var index_1 = require('./content/index');
var ng2_file_upload_1 = require('ng2-file-upload');
exports.JPA_PANEL_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return JpaPanel; }),
    multi: true
});
var noop = function () { };
var JPA_PANEL_VALID_INPUT_TYPE = [
    'text',
    'select',
    'textarea',
    'image',
    'images'
];
var JPA_PANEL_UNDERLINE_HIDDEN = [
    'textarea',
    'image',
    'images'
];
var nextUniqueId = 0;
var JpaPanelUnsupportedTypeError = (function (_super) {
    __extends(JpaPanelUnsupportedTypeError, _super);
    function JpaPanelUnsupportedTypeError(type) {
        _super.call(this, "Input type \"" + type + "\" isn't supported by jpa-panel.");
    }
    return JpaPanelUnsupportedTypeError;
}(error_1.MdError));
exports.JpaPanelUnsupportedTypeError = JpaPanelUnsupportedTypeError;
var JpaPanelDuplicatedHintError = (function (_super) {
    __extends(JpaPanelDuplicatedHintError, _super);
    function JpaPanelDuplicatedHintError(align) {
        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
    }
    return JpaPanelDuplicatedHintError;
}(error_1.MdError));
exports.JpaPanelDuplicatedHintError = JpaPanelDuplicatedHintError;
var JpaPanel = (function () {
    function JpaPanel() {
        this._focused = false;
        this._expanded = false;
        this._value = '';
        this._summary = '';
        this._underlineHidden = false;
        this._isTextfield = false;
        this._isTextarea = false;
        this._isImage = false;
        this._isMultipleImages = false;
        this._isSelect = false;
        this._hasContent = false;
        this._hasContentRight = false;
        this._hasContentBottom = false;
        this._newImages = [];
        this.hasBaseDropZoneOver = false;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'wtf' });
        this._onTouchedCallback = noop;
        this._onChangeCallback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.debug('JpaPanel#onChangeCallback:', args);
        };
        this.dividerColor = 'primary';
        this.hintLabel = '';
        this.autoFocus = false;
        this.disabled = false;
        this.id = "jpa-panel-" + nextUniqueId++;
        this.max = null;
        this.maxLength = null;
        this.min = null;
        this.minLength = null;
        this.placeholder = null;
        this.readOnly = false;
        this.required = false;
        this.spellCheck = false;
        this.step = null;
        this.tabIndex = null;
        this.name = null;
        this.type = 'text';
        this.label = null;
        this.currentImage = null;
        this.fullWidth = false;
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
        this._expandedEmitter = new core_1.EventEmitter();
        this._initialValue = null;
        this._valueChanged = false;
        this._imageLoaded = false;
        this._currentImageSize = null;
    }
    JpaPanel.prototype.ngOnInit = function () {
        console.debug('JpaPanel#onInit ', this.type);
        switch (this.type) {
            case 'text':
                this._isTextfield = true;
                break;
            case 'select':
                this._isSelect = true;
                break;
            case 'textarea':
                this._isTextarea = true;
                break;
            case 'image':
                this._isImage = true;
                break;
            case 'images':
                this._isMultipleImages = true;
                break;
        }
    };
    Object.defineProperty(JpaPanel.prototype, "focused", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "empty", {
        get: function () { return this._value == null || this._value === ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "characterCount", {
        get: function () {
            return this.empty ? 0 : ('' + this._value).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "inputId", {
        get: function () { return this.id + "-panel"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "focusedClass", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "expandedClass", {
        get: function () { return this._expanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "changedClass", {
        get: function () { return this._valueChanged; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "onExpand", {
        get: function () {
            return this._expandedEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "expanded", {
        get: function () { return this._expanded; },
        set: function (v) { this._expanded = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('JpaPanel#set value ', v);
            v = this._convertValueForInputType(v);
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(JpaPanel.prototype, "summary", {
        get: function () {
            return this._summary;
        },
        set: function (value) {
            var _this = this;
            switch (this.type) {
                case 'select':
                    console.log('(SELECT) SET SUMMARY FOR VALUE ' + value);
                    var interval_1 = setInterval(function () {
                        var filtered = _this._optionChildren.filter(function (opt) {
                            return opt['_element']['nativeElement']['value'] == _this._value;
                        });
                        console.log('(SELECT) FILTERED OPTIONS: ', filtered);
                        if (filtered.length) {
                            _this._summary = filtered[0]['_element']['nativeElement']['innerHTML'];
                            clearInterval(interval_1);
                        }
                    }, 250);
                    break;
                case 'image':
                    this._summary = value || '';
                    break;
                default:
                    this._summary = value;
            }
            console.debug('Setting summary to ' + this._summary);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "currentImageSize", {
        get: function () {
            return this._currentImageSize;
        },
        set: function (v) {
            this._currentImageSize = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "nativeElement", {
        get: function () {
            switch (this.type) {
                case 'select': return this._selectElement.nativeElement;
                case 'textarea': return this._textareaElement.nativeElement;
                default:
                    if (this._inputElement) {
                        return this._inputElement.nativeElement;
                    }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    JpaPanel.prototype.focus = function () {
        if (this.nativeElement) {
            this.nativeElement.focus();
        }
    };
    JpaPanel.prototype.handleFocus = function (event) {
        console.debug('JpaPanel#handleFocus ', event);
        if (this.expanded) {
            this._focused = true;
            this._focusEmitter.emit(event);
        }
        else {
            console.debug('skipping focus for non-expanded panel');
        }
    };
    JpaPanel.prototype.handleBlur = function (event) {
        console.debug('JpaPanel#handleBlur ', event);
        if (this.expanded) {
            this._focused = false;
            this._onTouchedCallback();
            this._blurEmitter.emit(event);
        }
        else {
            console.debug('skipping blur for non-expanded panel');
        }
    };
    JpaPanel.prototype.handleChange = function (event) {
        console.debug('JpaPanel#handleChange: ', event, this);
        switch (this.type) {
            case 'select':
                this.value = event.target.value;
                this.summary = this.value;
                break;
            case 'textarea':
                this.value = event.target.value;
                this.summary = this.value;
                break;
            default:
                this.value = event.target.value;
                this.summary = this.value;
                break;
        }
        console.log('JpaPanel#handleChange (' + this.type + ') set value for  to ', this.value);
        this._valueChanged = true;
        this._onTouchedCallback();
    };
    JpaPanel.prototype.hasPlaceholder = function () {
        return !!this.placeholder;
    };
    JpaPanel.prototype.writeValue = function (value) {
        console.debug('JpaPanel#writeValue(' + this.type + ')', value);
        this._value = value;
        if (!this._initialValue)
            this._initialValue = value;
        this.summary = value;
    };
    JpaPanel.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    JpaPanel.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    JpaPanel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._validateConstraints();
        this._hintChildren.changes.subscribe(function () {
            _this._validateConstraints();
        });
        if (JPA_PANEL_UNDERLINE_HIDDEN.indexOf(this.type) !== -1) {
            this._underlineHidden = true;
        }
        this._hasContent = !!this._contentChildren.length;
        if (this._hasContent) {
            this._contentChildren.forEach(function (panel) {
                if (panel.align === 'bottom') {
                    _this._hasContentBottom = true;
                }
                else if (panel.align === 'right') {
                    _this._hasContentRight = true;
                }
            });
        }
        console.debug('JpaPanel#ngAfterContentInit', this);
    };
    JpaPanel.prototype.ngAfterViewInit = function () {
        var _this = this;
        switch (this.type) {
            case 'image':
                if (this._imagePreview && this.currentImageSize === null) {
                    this._imagePreview.nativeElement.onload = function (e) {
                        console.log('IMAGE LOADED!');
                        _this._imageLoaded = true;
                        _this.currentImageSize = { w: _this._imagePreview.nativeElement.naturalWidth, h: _this._imagePreview.nativeElement.naturalHeight };
                        if (!_this._expanded) {
                            _this._summary = _this.currentImageSize.w + 'x' + _this.currentImageSize.h + 'px';
                        }
                    };
                }
                this.value = this.nativeElement.value;
                break;
            default:
                if (this.nativeElement) {
                    this.value = this.nativeElement.value;
                }
        }
        console.debug('JpaPanel#AfterViewInit  (' + this.type + ')', this);
    };
    JpaPanel.prototype.ngOnChanges = function (changes) {
        console.log('Changes on Panel ' + this.id + ' (' + this.name + '): ', changes);
        this._validateConstraints();
    };
    JpaPanel.prototype._convertValueForInputType = function (v) {
        switch (this.type) {
            case 'number': return parseFloat(v);
            default: return v;
        }
    };
    JpaPanel.prototype._validateConstraints = function () {
        var _this = this;
        if (JPA_PANEL_VALID_INPUT_TYPE.indexOf(this.type) === -1) {
            throw new JpaPanelUnsupportedTypeError(this.type);
        }
        if (this._hintChildren) {
            var startHint_1 = null;
            var endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new JpaPanelDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new JpaPanelDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    JpaPanel.prototype.toggle = function ($event) {
        console.debug('toggle!');
        $event.preventDefault();
        $event.stopPropagation();
        this._expanded = !this._expanded;
        this.onToggle();
    };
    JpaPanel.prototype.onToggle = function () {
        var _this = this;
        this._expandedEmitter.emit(this._expanded);
        if (this._hasContent) {
            this._contentChildren.forEach(function (panelContent) {
                panelContent.onToggle(_this._expanded);
            });
        }
    };
    JpaPanel.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    JpaPanel.prototype.onFileDrop = function (files) {
        var _this = this;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            this.readFile(file)
                .subscribe(function (read) {
                _this._newImages.push(read);
                console.log('Added image to newImages: ', read);
            });
        }
    };
    JpaPanel.prototype.readFile = function (file) {
        var filename = file.name;
        return Observable_1.Observable.create(function (observer) {
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                var base64 = btoa(readerEvt.target['result']);
                observer.next({
                    name: filename,
                    base64: base64
                });
            };
            reader.readAsBinaryString(file);
        });
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input('aria-labelledby'), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "ariaLabelledBy", void 0);
    __decorate([
        core_1.Input('aria-disabled'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "ariaDisabled", void 0);
    __decorate([
        core_1.Input('aria-required'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "ariaRequired", void 0);
    __decorate([
        core_1.Input('aria-invalid'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "ariaInvalid", void 0);
    __decorate([
        core_1.ContentChildren(input_1.MdHint), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanel.prototype, "_hintChildren", void 0);
    __decorate([
        core_1.ContentChildren(forms_1.NgSelectOption), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanel.prototype, "_optionChildren", void 0);
    __decorate([
        core_1.ContentChildren(index_1.JpaPanelContent), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanel.prototype, "_contentChildren", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_inputElement", void 0);
    __decorate([
        core_1.ViewChild('select'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_selectElement", void 0);
    __decorate([
        core_1.ViewChild('textarea'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_textareaElement", void 0);
    __decorate([
        core_1.ViewChild('imagePreview'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_imagePreview", void 0);
    __decorate([
        core_1.HostBinding('class.focused'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "focusedClass", null);
    __decorate([
        core_1.HostBinding('class.expanded'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "expandedClass", null);
    __decorate([
        core_1.HostBinding('class.changed'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "changedClass", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "dividerColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "hintLabel", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "spellCheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "currentImage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "fullWidth", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaPanel.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaPanel.prototype, "onFocus", null);
    __decorate([
        core_1.Output('expand'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaPanel.prototype, "onExpand", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "editText", void 0);
    JpaPanel = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel',
            templateUrl: './panel.component.html',
            styleUrls: ['./panel.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, common_1.NgIf, forms_1.NgModel, forms_1.NgSelectOption, index_1.JpaPanelContent, ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES],
            providers: [exports.JPA_PANEL_VALUE_ACCESSOR],
            pipes: [common_1.SlicePipe],
            host: {
                '(click)': 'focus()'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], JpaPanel);
    return JpaPanel;
}());
exports.JpaPanel = JpaPanel;

//# sourceMappingURL=panel.component.js.map
