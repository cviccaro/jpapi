/**
 * Mimic md-select from angular/material 1
 *
 */
import {
    forwardRef,
    Component,
    HostBinding,
    Input,
    Provider,
    Directive,
    AfterContentInit,
    ContentChild,
    SimpleChange,
    ContentChildren,
    ViewChild,
    ElementRef,
    QueryList,
    OnChanges,
    EventEmitter,
    Output,
} from '@angular/core';
import {NgIf} from '@angular/common';
import {SelectControlValueAccessor, NgSelectOption, NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BooleanFieldValue} from '@angular2-material/core/annotations/field-value';
import {MdError} from '@angular2-material/core/errors/error';
import {Observable} from 'rxjs/Observable';

import { MdPlaceholder, MdHint } from '@angular2-material/input';

const noop = () => { };

export const JPA_MD_SELECT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => JpaMdSelectComponent),
    multi: true
});

let nextUniqueId = 0;

export class JpaMdSelectPlaceholderConflictError extends MdError {
    constructor() {
        super('Placeholder attribute and child element were both specified.');
    }
}

export class JpaMdSelectDuplicatedHintError extends MdError {
    constructor(align: string) {
        super(`A hint was already declared for 'align="${align}"'.`);
    }
}

/**
 * Component that represents a select. It encapsulates the <select> HTMLElement and
 * improves on its behaviour, along with styling it according to the Material Design.
 */
@Component({
    selector: 'jpa-md-select',
    moduleId: module.id,
    templateUrl: './md-select.component.html',
    styleUrls: ['./md-select.component.css'],
    providers: [SelectControlValueAccessor, JPA_MD_SELECT_CONTROL_VALUE_ACCESSOR],
    directives: [NgIf, NgModel],
    host: { '(click)': 'focus()' }
})
export class JpaMdSelectComponent implements AfterContentInit, OnChanges, ControlValueAccessor {
    private _focused: boolean = false;
    private _value: any = '';

    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = (...args) => {
        console.log('JpaMdSelect#onChangeCallback:', args);
    };

    /**
     * Aria related inputs.
     */
    @Input('aria-label') ariaLabel: string;
    @Input('aria-labelledby') ariaLabelledBy: string;
    @Input('aria-disabled') @BooleanFieldValue() ariaDisabled: boolean;
    @Input('aria-required') @BooleanFieldValue() ariaRequired: boolean;
    @Input('aria-invalid') @BooleanFieldValue() ariaInvalid: boolean;

    /**
     * Content directives.
     */
    @ContentChild(MdPlaceholder) private _placeholderChild: MdPlaceholder;
    @ContentChildren(MdHint) private _hintChildren: QueryList<MdHint>;
    @ContentChildren(NgSelectOption) private _optionChildren: QueryList<NgSelectOption>;

    /** Readonly properties. */
    get focused() { return this._focused; }
    get empty() { return this._value == null || this._value === ''; }
    get characterCount(): number {
        return this.empty ? 0 : ('' + this._value).length;
    }
    get inputId(): string { return `${this.id}-select`; }

    /**
     * Bindings.
     */
    @Input() align: 'start' | 'end' = 'start';
    @Input() dividerColor: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() @BooleanFieldValue() floatingPlaceholder: boolean = true;
    @Input() hintLabel: string = '';

    @Input() @BooleanFieldValue() autoFocus: boolean = false;
    @Input() @BooleanFieldValue() disabled: boolean = false;
    @Input() id: string = `jpa-md-${nextUniqueId++}`;
    @Input() list: string = null;
    @Input() placeholder: string = null;
    @Input() @BooleanFieldValue() required: boolean = false;
    @Input() step: number = null;
    @Input() tabIndex: number = null;
    @Input() name: string = null;

    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    get value(): any { return this._value; };
    @Input() set value(v: any) {
        console.log('JpaMdSelect#set value(): ', { this: this, value: v });
        this._value = v;
        this._onChangeCallback(v);
    }

    // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
    // might place it as RTL when we don't want to. We still want to use `align` as an
    // Input though, so we use HostBinding.
    @HostBinding('attr.align') private get _align(): any { return null; }
    @ViewChild('select') private _selectElement: ElementRef;

    /** Set focus on input */
    focus() {
        this._selectElement.nativeElement.focus();
    }

    /** @internal */
    handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    /** @internal */
    handleBlur(event: FocusEvent) {
        this._focused = false;
        this._onTouchedCallback();
        this._blurEmitter.emit(event);
    }

    /** @internal */
    handleChange(event: Event) {
        this.value = (<HTMLSelectElement>event.target).value;
        this._onTouchedCallback();
    }

    /** @internal */
    hasPlaceholder(): boolean {
        return !!this.placeholder || this._placeholderChild != null;
    }

    /**
       * Implemented as part of ControlValueAccessor.
       * TODO: internal
       */
    writeValue(value: any) {
        this._value = value;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any) {
        console.log('JpaMdSelect#registerOnChange', fn);
        this._onChangeCallback = fn;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    /** TODO: internal */
    ngAfterContentInit() {
        this.value = this._selectElement.nativeElement.value;

        this._validateConstraints();

        // Trigger validation when the hint children change.
        this._hintChildren.changes.subscribe(() => {
            this._validateConstraints();
        });

        console.log('MdSelectComponent#afterContentInit', this);
    }

    /** TODO: internal */
    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        this._validateConstraints();
    }


    /**
     * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
     * Constraints for now:
     *   - placeholder attribute and <md-placeholder> are mutually exclusive.
     *   - type attribute is not one of the forbidden types (see constant at the top).
     *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
     *     considered as align="start".
     * @private
     */
    private _validateConstraints() {
        if (this.placeholder != '' && this.placeholder != null && this._placeholderChild != null) {
            throw new JpaMdSelectPlaceholderConflictError();
        }

        if (this._hintChildren) {
            // Validate the hint labels.
            let startHint: MdHint = null;
            let endHint: MdHint = null;
            this._hintChildren.forEach((hint: MdHint) => {
                if (hint.align == 'start') {
                    if (startHint || this.hintLabel) {
                        throw new JpaMdSelectDuplicatedHintError('start');
                    }
                    startHint = hint;
                } else if (hint.align == 'end') {
                    if (endHint) {
                        throw new JpaMdSelectDuplicatedHintError('end');
                    }
                    endHint = hint;
                }
            });
        }
    }
}
