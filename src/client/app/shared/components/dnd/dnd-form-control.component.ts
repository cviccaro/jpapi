import {
    OnInit,
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    Provider
} from '@angular/core';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { ChipComponent } from '../chip/index';

import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';

export const DND_FORM_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => DragnDropFormControlComponent),
    multi: true
});
const noop = (_?:any) => { };

@Component({
    moduleId: module.id,
    selector: 'jpa-dnd-form-control',
    templateUrl: './dnd-form-control.component.html',
    styleUrls: ['./dnd-form-control.component.css'],
    directives: [ DND_DIRECTIVES, ChipComponent, NgModel, MATERIAL_DIRECTIVES],
    providers: [ DND_FORM_CONTROL_VALUE_ACCESSOR ]
})
export class DragnDropFormControlComponent implements ControlValueAccessor, OnInit {
    public _dropzone: number;
    public _originalOptions: any[];

    @Output() change = new EventEmitter();

    @Input() name: string;
    @Input() required: boolean = false;
    @Input() options: { label: string, value: any }[];
    @Input() placeholder: string;

    private _value: any = [];

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

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


    /**
     * Initialize the directive/component after Angular initializes the data-bound input properties.
     */
    ngOnInit(): void {
        this.placeholder = this.placeholder || 'Add a ' + this.name;

        this._originalOptions = this.options;
    }

    /**
     * Set the available options by filtering out
     * current ones
     */
    setOptions(): void {
        if (this.options) {
            let ids = Array.isArray(this.value) ? this.value.map(item => item.id) : [];

            this.options = this._originalOptions.filter(option => {
                return ids.indexOf(option.id) === -1;
            });
        }
    }

    /**
     * Set the dropzone last dragged-over
     * @param {Event}    event
     * @param {number} index
     */
    onDragEnter(event: any, index: number): void {
        this._dropzone = index;
    }

    /**
     * Handle chips dragged from available to current value pool
     * @param {Event} e
     */
    onDropSuccess(e: { dragData: { preventAdd?: boolean, option: any }}): void {
        if (e.dragData.hasOwnProperty('preventAdd') && e.dragData.preventAdd === true) {
            return;
        }

        this.pushValue(e.dragData.option);
    }

    /**
     * Push a new value onto the value array
     * @param {any} value
     */
    pushValue(value: any): void {
        let val = Array.isArray(this.value) ? this.value.slice(0) : [];

        val.push(value);

        this.value = val;

        this.setOptions();
        this._onTouchedCallback();
    }

    /**
     * Reorder after a drag n drop
     * @param {Event} e
     */
    reorderFromDrag(e: { dragData: { index: number } }): void {
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

    /**
     * Remove an item from the selected values
     * @param {number} id
     */
    remove(id: number): void {
        let filtered = this.value.filter(item => {
            return item.id === id;
        });

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
