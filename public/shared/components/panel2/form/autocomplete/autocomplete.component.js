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
var index_1 = require('../../../chip/index');
var angular2_material_1 = require('../../../../libs/angular2-material');
var forms_1 = require('@angular/forms');
exports.AUTOCOMPLETE_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return AutoCompleteFormControl; }),
    multi: true
});
var noop = function () { };
var AutoCompleteFormControl = (function () {
    function AutoCompleteFormControl() {
        this._focused = false;
        this._value = [];
        this.workingValue = [];
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.change = new core_1.EventEmitter();
        this.required = false;
    }
    Object.defineProperty(AutoCompleteFormControl.prototype, "debug", {
        get: function () {
            return {
                value: this.value,
                _value: this._value,
                workingValue: this.workingValue
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFormControl.prototype, "empty", {
        get: function () { return this.value !== null && this.value !== ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFormControl.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('AutoCompleteFormControl set value ', v);
            if (v !== this._value) {
                console.log('AutoCompleteFormControl set value confirmed', v);
                this._value = v;
                var _v = v.length === 0 ? '' : v;
                this._onChangeCallback(_v);
                this.change.emit(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteFormControl.prototype.writeValue = function (value) {
        console.log('AutoCompleteFormControl WriteValue', value);
        this._value = value;
        if (value !== null)
            this.setOptions();
    };
    AutoCompleteFormControl.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    AutoCompleteFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    AutoCompleteFormControl.prototype.ngOnInit = function () {
        console.log('AutoCompleteFormControl ngOnInit ', this);
        this._originalOptions = this.options;
    };
    AutoCompleteFormControl.prototype.ngAfterViewInit = function () {
        console.log('AutoCompleteFormControl ngAfterViewInit', this);
    };
    AutoCompleteFormControl.prototype.setOptions = function () {
        this._model = this.value;
        console.debug('AutoCompleteFormControl setOptions ', { workingValue: this.workingValue, this: this });
        if (this.options) {
            console.warn('filtering options!', this.options);
            var ids_1 = this.value.map(function (item) { return item.id; });
            this.options = this._originalOptions.filter(function (option) {
                return ids_1.indexOf(option.id) === -1;
            });
        }
    };
    AutoCompleteFormControl.prototype.remove = function (id) {
        console.log('AutoCompleteComponent#remove ', this);
        var filtered = this.value.filter(function (item) {
            return item.id === id;
        });
        if (filtered && filtered.length) {
            var index = this.value.indexOf(filtered[0]);
            var value = this.value.slice(0);
            value.splice(index, 1);
            this.value = value;
            this.setOptions();
        }
        this._onTouchedCallback();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AutoCompleteFormControl.prototype, "change", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoCompleteFormControl.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoCompleteFormControl.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AutoCompleteFormControl.prototype, "options", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], AutoCompleteFormControl.prototype, "_inputElement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoCompleteFormControl.prototype, "value", null);
    AutoCompleteFormControl = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-autocomplete-form-control',
            templateUrl: './autocomplete.component.html',
            styleUrls: ['./autocomplete.component.css'],
            directives: [index_1.ChipComponent, angular2_material_1.MATERIAL_DIRECTIVES],
            providers: [exports.AUTOCOMPLETE_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], AutoCompleteFormControl);
    return AutoCompleteFormControl;
}());
exports.AutoCompleteFormControl = AutoCompleteFormControl;

//# sourceMappingURL=autocomplete.component.js.map
