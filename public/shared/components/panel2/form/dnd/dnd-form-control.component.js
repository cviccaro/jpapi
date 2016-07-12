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
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var index_1 = require('../../../chip/index');
var forms_1 = require('@angular/forms');
exports.DND_FORM_CONTROL_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return DragnDropFormControl; }),
    multi: true
});
var noop = function () { };
var DragnDropFormControl = (function () {
    function DragnDropFormControl() {
        this._focused = false;
        this._value = [];
        this._valueString = [];
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.change = new core_1.EventEmitter();
        this.required = false;
    }
    Object.defineProperty(DragnDropFormControl.prototype, "debug", {
        get: function () {
            return {
                value: this.value,
                _value: this._value,
                _valueString: this._valueString
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragnDropFormControl.prototype, "empty", {
        get: function () { return this.value !== null && this.value !== ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragnDropFormControl.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('DNDFormControl set value ', v);
            if (v !== this._value) {
                console.log('DNDFormControl set value confirmed', v);
                this._value = v;
                var _v = v.length === 0 ? '' : v;
                this._onChangeCallback(_v);
                this.change.emit(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    DragnDropFormControl.prototype.writeValue = function (value) {
        console.log('DNDFormControl WriteValue', value);
        this._value = value;
        if (value !== null)
            this.setOptions();
    };
    DragnDropFormControl.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    DragnDropFormControl.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    DragnDropFormControl.prototype.ngAfterViewInit = function () {
        this._originalOptions = this.options;
        this.value = this._inputElement.nativeElement.value;
        console.log('DNDFormControl ngAfterViewInit', this);
    };
    DragnDropFormControl.prototype.setOptions = function () {
        this._valueString = this.value.length === 0 ? null : JSON.stringify(this.value);
        if (this.options) {
            var ids_1 = this.value.map(function (item) { return item.value; });
            this.options = this._originalOptions.filter(function (option) {
                return ids_1.indexOf(option.id) === -1;
            });
        }
    };
    DragnDropFormControl.prototype.onDragEnter = function (event, index) {
        this._dropzone = index;
    };
    DragnDropFormControl.prototype.add = function (e) {
        if (e.dragData.hasOwnProperty('preventAdd') && e.dragData.preventAdd === true) {
            console.log('preventing add from already added chip.');
            return;
        }
        console.log('Multiselect drop!!!!', e);
        var data = e.dragData;
        var val = this.value.slice(0);
        val.push(data.option);
        this.value = val;
        this.setOptions();
        this._onTouchedCallback();
    };
    DragnDropFormControl.prototype.reorder = function (e) {
        var new_index = this._dropzone;
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
    };
    DragnDropFormControl.prototype.remove = function (id) {
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
    ], DragnDropFormControl.prototype, "change", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DragnDropFormControl.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DragnDropFormControl.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DragnDropFormControl.prototype, "options", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], DragnDropFormControl.prototype, "_inputElement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DragnDropFormControl.prototype, "value", null);
    DragnDropFormControl = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-dnd-form-control',
            templateUrl: './dnd-form-control.component.html',
            styleUrls: ['./dnd-form-control.component.css'],
            directives: [ng2_dnd_1.DND_DIRECTIVES, index_1.ChipComponent, forms_1.NgModel],
            providers: [exports.DND_FORM_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], DragnDropFormControl);
    return DragnDropFormControl;
}());
exports.DragnDropFormControl = DragnDropFormControl;

//# sourceMappingURL=dnd-form-control.component.js.map
