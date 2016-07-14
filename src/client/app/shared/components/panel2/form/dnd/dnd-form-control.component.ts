import {
    OnInit,
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    Provider,
    ViewChild,
    ElementRef
} from '@angular/core';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { ChipComponent } from '../../../chip/index';

import { Observable } from 'rxjs/Rx';
import { MATERIAL_DIRECTIVES } from '../../../../libs/angular2-material';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';

export const DND_FORM_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => DragnDropFormControl),
    multi: true
});
const noop = () => { };

@Component({
    moduleId: module.id,
    selector: 'jpa-dnd-form-control',
    templateUrl: './dnd-form-control.component.html',
    styleUrls: ['./dnd-form-control.component.css'],
    directives: [ DND_DIRECTIVES, ChipComponent, NgModel, MATERIAL_DIRECTIVES],
    providers: [ DND_FORM_CONTROL_VALUE_ACCESSOR ]
})
export class DragnDropFormControl implements ControlValueAccessor, OnInit {
    private _focused: boolean = false;
    private _value: any = [];
    private _valueString: any = [];
    private _dropzone: number;

    private _originalOptions: any[];

    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;

    @Output() change = new EventEmitter();

    @Input() name: string;
    @Input() required: boolean = false;
    @Input() options: { label: string, value: any }[];
    @Input() placeholder: string;

    @ViewChild('input') private _inputElement: ElementRef;

    get empty() { return this.value !== null && this.value !== ''; }

    get value() { return this._value; }
    @Input() set value(v: any) {
        if (v !== this._value) {
            this._value = v;

            let _v = v.length === 0 ? '' : v;

            this._onChangeCallback(_v);
            this.change.emit(v);
        }
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    writeValue(value: any) {
        this._value = value;

        if (value !== null) this.setOptions();
    }
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    ngOnInit() {
        this.placeholder = this.placeholder || 'Add a ' + this.name;

        this._originalOptions = this.options;
    }

    setOptions() {
        this._valueString = this.value.length === 0 ? null : JSON.stringify(this.value);

        if (this.options) {
            let ids = this.value.map(item => item.id);

            this.options = this._originalOptions.filter(option => {
                return ids.indexOf(option.id) === -1;
            });
        }
    }

    onDragEnter(event: any, index: number) {
        this._dropzone = index;
    }

    onDropSuccess(e) {
        if (e.dragData.hasOwnProperty('preventAdd') && e.dragData.preventAdd === true) {
            return;
        }

        this.pushValue(e.dragData.option);
    }

    pushValue(value) {
        let val = this.value.slice(0);

        val.push(value);

        this.value = val;

        this.setOptions();
        this._onTouchedCallback();
    }

    reorder(e: any) {
        let new_index = this._dropzone;
        let old_index = e.dragData.index;

        if (new_index !== old_index) {
            let value = this.value.slice(0);

            const source = value[old_index];
            const target = value[new_index];

            value[new_index] = source;
            value[old_index] = target;

            this.value = value;
        }

        this._onTouchedCallback();
    }

    remove(id) {
        let filtered = this.value.filter(item => {
            return item.id === id
        })

        if (filtered && filtered.length) {
            let index = this.value.indexOf(filtered[0]);
            let value = this.value.slice(0);

            value.splice(index, 1);
            this.value = value;

            this.setOptions();
        }

        this._onTouchedCallback();
    }

}