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
var noop = function () { };
exports.JPA_MD_SELECT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return JpaMdSelectComponent; }),
    multi: true
});
var nextUniqueId = 0;
var JpaMdSelectPlaceholderConflictError = (function (_super) {
    __extends(JpaMdSelectPlaceholderConflictError, _super);
    function JpaMdSelectPlaceholderConflictError() {
        _super.call(this, 'Placeholder attribute and child element were both specified.');
    }
    return JpaMdSelectPlaceholderConflictError;
}(error_1.MdError));
exports.JpaMdSelectPlaceholderConflictError = JpaMdSelectPlaceholderConflictError;
var JpaMdSelectDuplicatedHintError = (function (_super) {
    __extends(JpaMdSelectDuplicatedHintError, _super);
    function JpaMdSelectDuplicatedHintError(align) {
        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
    }
    return JpaMdSelectDuplicatedHintError;
}(error_1.MdError));
exports.JpaMdSelectDuplicatedHintError = JpaMdSelectDuplicatedHintError;
var JpaMdSelectComponent = (function () {
    function JpaMdSelectComponent() {
        this._focused = false;
        this._value = '';
        this._onTouchedCallback = noop;
        this._onChangeCallback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.log('JpaMdSelect#onChangeCallback:', args);
        };
        this.align = 'start';
        this.dividerColor = 'primary';
        this.floatingPlaceholder = true;
        this.hintLabel = '';
        this.autoFocus = false;
        this.disabled = false;
        this.id = "jpa-md-" + nextUniqueId++;
        this.list = null;
        this.placeholder = null;
        this.required = false;
        this.step = null;
        this.tabIndex = null;
        this.name = null;
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(JpaMdSelectComponent.prototype, "focused", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "empty", {
        get: function () { return this._value == null || this._value === ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "characterCount", {
        get: function () {
            return this.empty ? 0 : ('' + this._value).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "inputId", {
        get: function () { return this.id + "-select"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.log('JpaMdSelect#set value(): ', { this: this, value: v });
            this._value = v;
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(JpaMdSelectComponent.prototype, "_align", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    JpaMdSelectComponent.prototype.focus = function () {
        this._selectElement.nativeElement.focus();
    };
    JpaMdSelectComponent.prototype.handleFocus = function (event) {
        this._focused = true;
        this._focusEmitter.emit(event);
    };
    JpaMdSelectComponent.prototype.handleBlur = function (event) {
        this._focused = false;
        this._onTouchedCallback();
        this._blurEmitter.emit(event);
    };
    JpaMdSelectComponent.prototype.handleChange = function (event) {
        this.value = event.target.value;
        this._onTouchedCallback();
    };
    JpaMdSelectComponent.prototype.hasPlaceholder = function () {
        return !!this.placeholder || this._placeholderChild != null;
    };
    JpaMdSelectComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    JpaMdSelectComponent.prototype.registerOnChange = function (fn) {
        console.log('JpaMdSelect#registerOnChange', fn);
        this._onChangeCallback = fn;
    };
    JpaMdSelectComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    JpaMdSelectComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.value = this._selectElement.nativeElement.value;
        this._validateConstraints();
        this._hintChildren.changes.subscribe(function () {
            _this._validateConstraints();
        });
        console.log('MdSelectComponent#afterContentInit', this);
    };
    JpaMdSelectComponent.prototype.ngOnChanges = function (changes) {
        this._validateConstraints();
    };
    JpaMdSelectComponent.prototype._validateConstraints = function () {
        var _this = this;
        if (this.placeholder != '' && this.placeholder != null && this._placeholderChild != null) {
            throw new JpaMdSelectPlaceholderConflictError();
        }
        if (this._hintChildren) {
            var startHint_1 = null;
            var endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new JpaMdSelectDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new JpaMdSelectDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input('aria-labelledby'), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "ariaLabelledBy", void 0);
    __decorate([
        core_1.Input('aria-disabled'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "ariaDisabled", void 0);
    __decorate([
        core_1.Input('aria-required'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "ariaRequired", void 0);
    __decorate([
        core_1.Input('aria-invalid'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "ariaInvalid", void 0);
    __decorate([
        core_1.ContentChild(input_1.MdPlaceholder), 
        __metadata('design:type', input_1.MdPlaceholder)
    ], JpaMdSelectComponent.prototype, "_placeholderChild", void 0);
    __decorate([
        core_1.ContentChildren(input_1.MdHint), 
        __metadata('design:type', core_1.QueryList)
    ], JpaMdSelectComponent.prototype, "_hintChildren", void 0);
    __decorate([
        core_1.ContentChildren(forms_1.NgSelectOption), 
        __metadata('design:type', core_1.QueryList)
    ], JpaMdSelectComponent.prototype, "_optionChildren", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "align", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "dividerColor", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "floatingPlaceholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "hintLabel", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "list", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaMdSelectComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaMdSelectComponent.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "name", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaMdSelectComponent.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaMdSelectComponent.prototype, "onFocus", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "value", null);
    __decorate([
        core_1.HostBinding('attr.align'), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "_align", null);
    __decorate([
        core_1.ViewChild('select'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaMdSelectComponent.prototype, "_selectElement", void 0);
    JpaMdSelectComponent = __decorate([
        core_1.Component({
            selector: 'jpa-md-select',
            moduleId: module.id,
            templateUrl: './md-select.component.html',
            styleUrls: ['./md-select.component.css'],
            providers: [forms_1.SelectControlValueAccessor, exports.JPA_MD_SELECT_CONTROL_VALUE_ACCESSOR],
            directives: [common_1.NgIf, forms_1.NgModel],
            host: { '(click)': 'focus()' }
        }), 
        __metadata('design:paramtypes', [])
    ], JpaMdSelectComponent);
    return JpaMdSelectComponent;
}());
exports.JpaMdSelectComponent = JpaMdSelectComponent;

//# sourceMappingURL=md-select.component.js.map
