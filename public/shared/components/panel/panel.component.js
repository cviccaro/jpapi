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
var Rx_1 = require('rxjs/Rx');
var input_1 = require('@angular2-material/input');
var angular2_material_1 = require('../../libs/angular2-material');
var index_1 = require('./content/index');
var index_2 = require('./summary/index');
var index_3 = require('../image-upload/index');
var index_4 = require('../chip/index');
var ng2_ckeditor_1 = require('ng2-ckeditor');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
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
    'images',
    'multiselect'
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
        this._secureValue = '';
        this._empty = false;
        this._underlineHidden = false;
        this._initialValue = null;
        this._valueChanged = false;
        this._isTextfield = false;
        this._isTextarea = false;
        this._isImage = false;
        this._isGallery = false;
        this._isSelect = false;
        this._isMultiSelect = false;
        this._hasContent = false;
        this._hasContentRight = false;
        this._hasContentBottom = false;
        this._hasContentLeft = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._multiselectDropZone = -1;
        this.subscriptions = [];
        this.autoFocus = false;
        this.currentImage = null;
        this.disabled = false;
        this.dividerColor = 'primary';
        this.fullWidth = false;
        this.hintLabel = '';
        this.id = "jpa-panel-" + nextUniqueId++;
        this.label = null;
        this.max = null;
        this.maxLength = null;
        this.min = null;
        this.minLength = null;
        this.name = null;
        this.placeholder = null;
        this.readOnly = false;
        this.required = false;
        this.spellCheck = false;
        this.step = null;
        this.tabIndex = null;
        this.type = 'text';
        this.imageFieldChanged = new core_1.EventEmitter();
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
        this._toggleEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(JpaPanel.prototype, "focused", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "empty", {
        get: function () {
            var v = this.value;
            var x = !v || v === undefined || v === null || (Array.isArray(v) && v.length === 0) || v === '' || v === '__deleted';
            return x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "characterCount", {
        get: function () { return this.empty ? 0 : ('' + this._value).length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "inputId", {
        get: function () { return this.id + "-panel"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('JpaPanel' + this.type + '.' + this.name + '# set value(): ', v);
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
            else {
                if (this.type === 'multiselect' && this.empty) {
                    this._onChangeCallback(null);
                }
                else if (this.type === 'images') {
                    this._onChangeCallback(v);
                    this._onTouchedCallback();
                    this._valueChanged = true;
                    this._summaryChild.setSummaryOf(v);
                }
                else {
                    this._onChangeCallback(this._value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "expanded", {
        get: function () { return this._expanded; },
        set: function (v) {
            this._expanded = v;
            this._toggleEmitter.emit(this._expanded);
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
    Object.defineProperty(JpaPanel.prototype, "emptyClass", {
        get: function () { return this.empty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "textClass", {
        get: function () { return this.type === 'text'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "selectClass", {
        get: function () { return this.type === 'select'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "textareaClass", {
        get: function () { return this.type === 'textarea'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "imageClass", {
        get: function () { return this.type === 'image'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "imagesClass", {
        get: function () { return this.type === 'images'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "multiSelectClass", {
        get: function () { return this.type === 'multiselect'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "onBlur", {
        get: function () { return this._blurEmitter.asObservable(); },
        enumerable: true,
        configurable: true
    });
    JpaPanel.prototype.handleBlur = function (event) {
        if (this.expanded) {
            this._focused = false;
            this._onTouchedCallback();
            this._blurEmitter.emit(event);
        }
    };
    Object.defineProperty(JpaPanel.prototype, "onFocus", {
        get: function () { return this._focusEmitter.asObservable(); },
        enumerable: true,
        configurable: true
    });
    JpaPanel.prototype.handleFocus = function (event) {
        if (this.expanded) {
            this._focused = true;
            this._focusEmitter.emit(event);
        }
    };
    JpaPanel.prototype.focus = function () {
        var _this = this;
        if (!this.expanded) {
            this.toggle();
            if (this.nativeElement) {
                setTimeout(function () { _this.nativeElement.focus(); });
            }
        }
        else if (this.nativeElement) {
            this.nativeElement.focus();
        }
    };
    Object.defineProperty(JpaPanel.prototype, "onToggle", {
        get: function () {
            return this._toggleEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    JpaPanel.prototype.writeValue = function (value) {
        console.debug('JpaPanel.' + this.type + ' ' + this.name + '#writeValue(' + this.type + ')', value);
        this._value = value;
        if (this.type === 'multiselect' && value !== null)
            this.setMultiOptions();
        if (!this._initialValue)
            this._initialValue = value;
    };
    JpaPanel.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    JpaPanel.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    JpaPanel.prototype.handleChange = function (event) {
        switch (this.type) {
            case 'images':
                this.value = event;
                break;
            case 'select':
                this.value = event.target.value;
                break;
            case 'textarea':
                break;
            case 'image':
                this.value = event.target.files[0];
                this.imageFieldChanged.emit(event.target.files[0]);
                break;
            default:
                this.value = event.target.value;
                break;
        }
        this._valueChanged = true;
        this._onTouchedCallback();
    };
    JpaPanel.prototype.ngOnInit = function () {
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
            case 'multiselect':
                this._isMultiSelect = true;
                this._hasContentRight = true;
                break;
            case 'images':
                this._isGallery = true;
                this._hasContentBottom = true;
                this.fullWidth = true;
                break;
        }
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
                switch (panel.align) {
                    case 'right':
                        _this._hasContentRight = true;
                        break;
                    case 'left':
                        _this._hasContentLeft = true;
                        break;
                    case 'bottom':
                        _this._hasContentBottom = true;
                        break;
                }
                if (_this.type === 'image') {
                    var sub = panel.onRemoveImage.subscribe(function (e) {
                        _this.value = '__deleted';
                        _this.currentImage = '';
                    });
                    _this.subscriptions.push(sub);
                }
            });
        }
        if (this._summaryChild) {
            switch (this.type) {
                case 'select':
                    this._summaryChild.setOptions(this._optionChildren);
                    break;
            }
        }
    };
    JpaPanel.prototype.ngAfterViewInit = function () {
        switch (this.type) {
            case 'multiselect':
                this._originalOptions = this.options;
                break;
            default:
                if (this.nativeElement) {
                    this.value = this.nativeElement.value;
                }
        }
        console.info('PanelComponent.' + this.type + '.' + this.name + ' # AfterViewInit: ', this);
    };
    JpaPanel.prototype.ngOnChanges = function (changes) {
        this._validateConstraints();
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
        var _this = this;
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this.expanded = !this.expanded;
        if (this._hasContent) {
            this._contentChildren.forEach(function (panelContent) {
                panelContent.onToggle(_this.expanded);
            });
        }
    };
    JpaPanel.prototype.setMultiOptions = function () {
        this._secureValue = this.value.length === 0 ? null : JSON.stringify(this.value);
        if (this.options) {
            var ids_1 = this.value.map(function (item) { return item.id; });
            this.options = this._originalOptions.filter(function (option) {
                return ids_1.indexOf(option.id) === -1;
            });
        }
    };
    JpaPanel.prototype.multiselectDrop = function (e) {
        if (e.dragData.hasOwnProperty('preventAdd') && e.dragData.preventAdd === true) {
            return;
        }
        var data = e.dragData;
        var val = this.value.slice(0);
        val.push(data.option);
        this.value = val;
        this.setMultiOptions();
        this._onTouchedCallback();
        this._valueChanged = true;
    };
    JpaPanel.prototype.multiselectReorder = function (e) {
        var new_index = this._multiselectDropZone;
        var old_index = e.dragData.index;
        if (new_index !== old_index) {
            var value = this.value.slice(0);
            var source = value[old_index];
            var target = value[new_index];
            value[new_index] = source;
            value[old_index] = target;
            this.value = value;
        }
        this._onTouchedCallback();
        this._valueChanged = true;
    };
    JpaPanel.prototype.multiselectOnDragEnter = function (e, index) {
        this._multiselectDropZone = index;
    };
    JpaPanel.prototype.multiselectRemove = function (id) {
        var filtered = this.value.filter(function (item) {
            return item.id === id;
        });
        if (filtered && filtered.length) {
            var index = this.value.indexOf(filtered[0]);
            var value = this.value;
            value.splice(index, 1);
            this.value = value;
            this.setMultiOptions();
        }
        this._onTouchedCallback();
        this._valueChanged = true;
    };
    JpaPanel.prototype.fileAdded = function (e) {
    };
    JpaPanel.prototype.imageAdded = function (e) {
    };
    JpaPanel.prototype.imageLoaded = function (e) {
    };
    JpaPanel.prototype.reset = function () {
        this._valueChanged = false;
        this._secureValue = '';
        if (this.type === 'image') {
            this._inputElement.nativeElement.value = '';
        }
        this.expanded = false;
    };
    JpaPanel.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "currentImage", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "dividerColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "editText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "fullWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "hintLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "label", void 0);
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
    ], JpaPanel.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], JpaPanel.prototype, "options", void 0);
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
    ], JpaPanel.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "value", null);
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
        core_1.ViewChild(index_3.ImageUploadComponent), 
        __metadata('design:type', index_3.ImageUploadComponent)
    ], JpaPanel.prototype, "_imageUploadCmp", void 0);
    __decorate([
        core_1.ViewChild(index_2.PanelSummaryComponent), 
        __metadata('design:type', index_2.PanelSummaryComponent)
    ], JpaPanel.prototype, "_summaryChild", void 0);
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
        core_1.ViewChildren(forms_1.NgModel), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanel.prototype, "_controls", void 0);
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
        core_1.HostBinding('class.empty'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "emptyClass", null);
    __decorate([
        core_1.HostBinding('class.text'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "textClass", null);
    __decorate([
        core_1.HostBinding('class.select'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "selectClass", null);
    __decorate([
        core_1.HostBinding('class.textarea'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "textareaClass", null);
    __decorate([
        core_1.HostBinding('class.image'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "imageClass", null);
    __decorate([
        core_1.HostBinding('class.images'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "imagesClass", null);
    __decorate([
        core_1.HostBinding('class.multiselect'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "multiSelectClass", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "imageFieldChanged", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Rx_1.Observable)
    ], JpaPanel.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Rx_1.Observable)
    ], JpaPanel.prototype, "onFocus", null);
    __decorate([
        core_1.Output('toggle'), 
        __metadata('design:type', Rx_1.Observable)
    ], JpaPanel.prototype, "onToggle", null);
    JpaPanel = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel',
            templateUrl: './panel.component.html',
            styleUrls: ['./panel.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                common_1.NgIf,
                forms_1.NgModel,
                forms_1.NgSelectOption,
                index_1.JpaPanelContent,
                index_3.ImageUploadComponent,
                index_2.PanelSummaryComponent,
                index_4.ChipComponent,
                ng2_dnd_1.DND_DIRECTIVES,
                ng2_ckeditor_1.CKEditor
            ],
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
