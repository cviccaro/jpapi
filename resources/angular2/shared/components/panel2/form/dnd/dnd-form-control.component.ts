import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    Provider,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { ChipComponent } from '../../../chip/index';

import { Observable } from 'rxjs/Rx';

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
    directives: [ DND_DIRECTIVES, ChipComponent, NgModel],
    providers: [ DND_FORM_CONTROL_VALUE_ACCESSOR ]
})
export class DragnDropFormControl implements ControlValueAccessor, AfterViewInit {
    private _focused: boolean = false;
    private _value: any = [];
    private _valueString: any = [];
    private _dropzone: number;

    private _originalOptions: any[];

    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;

    get debug() {
        return {
            value: this.value,
            _value: this._value,
            _valueString: this._valueString
        };
    }

    @Output() change = new EventEmitter();

    @Input() name: string;
    @Input() required: boolean = false;
    @Input() options: { label: string, value: any }[];

    @ViewChild('input') private _inputElement: ElementRef;

    get empty() { return this.value !== null && this.value !== ''; }

    get value() { return this._value; }
    @Input() set value(v: any) {
        console.debug('DNDFormControl set value ', v);
        if (v !== this._value) {
            console.log('DNDFormControl set value confirmed', v);
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
        console.log('DNDFormControl WriteValue', value);
        this._value = value;
        if (value !== null) this.setOptions();
    }
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    ngAfterViewInit() {
        this._originalOptions = this.options;
        this.value = this._inputElement.nativeElement.value;
        console.log('DNDFormControl ngAfterViewInit', this);
    }

    setOptions() {
        this._valueString = this.value.length === 0 ? null : JSON.stringify(this.value);
        if (this.options) {
            let ids = this.value.map(item => item.value);
            this.options = this._originalOptions.filter(option => {
                return ids.indexOf(option.id) === -1;
            });
        }
    }

    onDragEnter(event: any, index: number) {
        this._dropzone = index;
    }

    add(e) {
        if (e.dragData.hasOwnProperty('preventAdd') && e.dragData.preventAdd === true) {
            console.log('preventing add from already added chip.');
            return;
        }

        console.log('Multiselect drop!!!!', e);

        let data = e.dragData;
        let val = this.value.slice(0);

        val.push(data.option);
        this.value = val;
        this.setOptions();
        // this._onChangeCallback(this.value);
        this._onTouchedCallback();
        //this._valueChanged = true;
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

            //console.log('Multiselect reorder from ' + old_index + ' to ' + new_index);
        }

        this._onTouchedCallback();
        //this._valueChanged = true;
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
            //console.log('set value to ', value);
            this.setOptions();
            // this._onChangeCallback(this.value);
            // this._onTouchedCallback();
        }

        this._onTouchedCallback();
        //this._valueChanged = true;
    }

}