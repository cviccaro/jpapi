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
var Rx_1 = require('rxjs/Rx');
var input_1 = require('@angular2-material/input');
var angular2_material_1 = require('../../../libs/angular2-material');
var index_1 = require('../../image-upload/index');
var index_2 = require('../../chip/index');
var ng2_ckeditor_1 = require('ng2-ckeditor');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
exports.JPA_PANEL_FORM_CONTROL_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return PanelFormControl; }),
    multi: true
});
var noop = function () { };
var nextUniqueId = 0;
var PanelFormControl = (function () {
    function PanelFormControl() {
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
        this.options = [];
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
    Object.defineProperty(PanelFormControl.prototype, "focused", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "empty", {
        get: function () {
            var v = this.value;
            var x = !v || v === undefined || v === null || (Array.isArray(v) && v.length === 0) || v === '' || v === '__deleted';
            return x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "characterCount", {
        get: function () { return this.empty ? 0 : ('' + this._value).length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "inputId", {
        get: function () { return this.id + "-panel"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('PanelFormControl' + this.type + '.' + this.name + '# set value(): ', v);
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
                }
                else {
                    this._onChangeCallback(this._value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "expanded", {
        get: function () { return this._expanded; },
        set: function (v) {
            this._expanded = v;
            this._toggleEmitter.emit(this._expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "nativeElement", {
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
    Object.defineProperty(PanelFormControl.prototype, "focusedClass", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "expandedClass", {
        get: function () { return this._expanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "changedClass", {
        get: function () { return this._valueChanged; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "emptyClass", {
        get: function () { return this.empty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "textClass", {
        get: function () { return this.type === 'text'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "selectClass", {
        get: function () { return this.type === 'select'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "textareaClass", {
        get: function () { return this.type === 'textarea'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "imageClass", {
        get: function () { return this.type === 'image'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "imagesClass", {
        get: function () { return this.type === 'images'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "multiSelectClass", {
        get: function () { return this.type === 'multiselect'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "onBlur", {
        get: function () { return this._blurEmitter.asObservable(); },
        enumerable: true,
        configurable: true
    });
    PanelFormControl.prototype.handleBlur = function (event) {
        this._focused = false;
        this._onTouchedCallback();
        this._blurEmitter.emit(event);
    };
    Object.defineProperty(PanelFormControl.prototype, "onFocus", {
        get: function () { return this._focusEmitter.asObservable(); },
        enumerable: true,
        configurable: true
    });
    PanelFormControl.prototype.handleFocus = function (event) {
        this._focusEmitter.emit(event);
    };
    PanelFormControl.prototype.focus = function () {
        if (this.nativeElement) {
            this.nativeElement.focus();
        }
    };
    Object.defineProperty(PanelFormControl.prototype, "onToggle", {
        get: function () {
            return this._toggleEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControl.prototype.writeValue = function (value) {
        console.debug('PanelFormControl.' + this.type + ' ' + this.name + '#writeValue(' + this.type + ')', value);
        this._value = value;
        if (this.type === 'multiselect' && value !== null)
            this.setMultiOptions();
        if (!this._initialValue)
            this._initialValue = value;
    };
    PanelFormControl.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    PanelFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    PanelFormControl.prototype.handleChange = function (event) {
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
    PanelFormControl.prototype.ngOnInit = function () {
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
    PanelFormControl.prototype.ngAfterViewInit = function () {
        console.info('PanelFormControl.' + this.type + '.' + this.name + ' # AfterViewInit: ', this);
    };
    PanelFormControl.prototype.setMultiOptions = function () {
        this._secureValue = this.value.length === 0 ? null : JSON.stringify(this.value);
        if (this.options) {
            var ids_1 = this.value.map(function (item) { return item.id; });
            this.options = this._originalOptions.filter(function (option) {
                return ids_1.indexOf(option.id) === -1;
            });
        }
    };
    PanelFormControl.prototype.multiselectDrop = function (e) {
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
    PanelFormControl.prototype.multiselectReorder = function (e) {
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
    PanelFormControl.prototype.multiselectOnDragEnter = function (e, index) {
        this._multiselectDropZone = index;
    };
    PanelFormControl.prototype.multiselectRemove = function (id) {
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
    PanelFormControl.prototype.fileAdded = function (e) {
    };
    PanelFormControl.prototype.imageAdded = function (e) {
    };
    PanelFormControl.prototype.imageLoaded = function (e) {
    };
    PanelFormControl.prototype.reset = function () {
        this._valueChanged = false;
        this._secureValue = '';
        if (this.type === 'image') {
            this._inputElement.nativeElement.value = '';
        }
    };
    PanelFormControl.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], PanelFormControl.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "currentImage", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], PanelFormControl.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "dividerColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "editText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelFormControl.prototype, "fullWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "hintLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PanelFormControl.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PanelFormControl.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PanelFormControl.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], PanelFormControl.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], PanelFormControl.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], PanelFormControl.prototype, "spellCheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PanelFormControl.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PanelFormControl.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormControl.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "value", null);
    __decorate([
        core_1.ContentChildren(input_1.MdHint), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormControl.prototype, "_hintChildren", void 0);
    __decorate([
        core_1.ContentChildren(forms_1.NgSelectOption), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormControl.prototype, "_optionChildren", void 0);
    __decorate([
        core_1.ViewChild(index_1.ImageUploadComponent), 
        __metadata('design:type', index_1.ImageUploadComponent)
    ], PanelFormControl.prototype, "_imageUploadCmp", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], PanelFormControl.prototype, "_inputElement", void 0);
    __decorate([
        core_1.ViewChild('select'), 
        __metadata('design:type', core_1.ElementRef)
    ], PanelFormControl.prototype, "_selectElement", void 0);
    __decorate([
        core_1.ViewChild('textarea'), 
        __metadata('design:type', core_1.ElementRef)
    ], PanelFormControl.prototype, "_textareaElement", void 0);
    __decorate([
        core_1.ViewChildren(forms_1.NgModel), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormControl.prototype, "_controls", void 0);
    __decorate([
        core_1.HostBinding('class.focused'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "focusedClass", null);
    __decorate([
        core_1.HostBinding('class.expanded'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "expandedClass", null);
    __decorate([
        core_1.HostBinding('class.changed'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "changedClass", null);
    __decorate([
        core_1.HostBinding('class.empty'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "emptyClass", null);
    __decorate([
        core_1.HostBinding('class.text'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "textClass", null);
    __decorate([
        core_1.HostBinding('class.select'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "selectClass", null);
    __decorate([
        core_1.HostBinding('class.textarea'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "textareaClass", null);
    __decorate([
        core_1.HostBinding('class.image'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "imageClass", null);
    __decorate([
        core_1.HostBinding('class.images'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "imagesClass", null);
    __decorate([
        core_1.HostBinding('class.multiselect'), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "multiSelectClass", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelFormControl.prototype, "imageFieldChanged", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Rx_1.Observable)
    ], PanelFormControl.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Rx_1.Observable)
    ], PanelFormControl.prototype, "onFocus", null);
    __decorate([
        core_1.Output('toggle'), 
        __metadata('design:type', Rx_1.Observable)
    ], PanelFormControl.prototype, "onToggle", null);
    PanelFormControl = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-form-control',
            templateUrl: './control.html',
            styleUrls: ['./control.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                forms_1.NgModel,
                forms_1.NgSelectOption,
                index_1.ImageUploadComponent,
                index_2.ChipComponent,
                ng2_dnd_1.DND_DIRECTIVES,
                ng2_ckeditor_1.CKEditor
            ],
            providers: [exports.JPA_PANEL_FORM_CONTROL_VALUE_ACCESSOR],
            host: {
                '(click)': 'focus()'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], PanelFormControl);
    return PanelFormControl;
}());
exports.PanelFormControl = PanelFormControl;

//# sourceMappingURL=control.js.map
