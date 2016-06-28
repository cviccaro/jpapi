import {
    forwardRef,
    Component,
    HostBinding,
    Input,
    Provider,
    Directive,
    OnInit,
    AfterViewInit,
    AfterContentInit,
    AfterViewChecked,
    ContentChild,
    SimpleChange,
    ContentChildren,
    ViewChild,
    ViewChildren,
    ElementRef,
    QueryList,
    OnChanges,
    EventEmitter,
    Output,
} from '@angular/core';
import { SlicePipe, NgIf } from '@angular/common';
import {NgModel, NgSelectOption, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BooleanFieldValue} from '@angular2-material/core/annotations/field-value';
import {MdError} from '@angular2-material/core/errors/error';
import {Observable} from 'rxjs/Observable';
import { MdHint } from '@angular2-material/input';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';
import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';
import { JpaPanelContent } from './content/index';
import {JpaFileUploadComponent} from '../file-upload/index';

export const JPA_PANEL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => JpaPanel),
    multi: true
});

const noop = () => { };

// Invalid input type. Using one of these will throw an JpaPanelUnsupportedTypeError.
const JPA_PANEL_VALID_INPUT_TYPE = [
    'text',
    'select',
    'textarea',
    'image',
    'images'
    // 'checkbox',
    // 'number',
    // 'date'
];

const JPA_PANEL_UNDERLINE_HIDDEN = [
    'textarea',
    'image',
    'images'
];

let nextUniqueId = 0;

export class JpaPanelUnsupportedTypeError extends MdError {
    constructor(type: string) {
        super(`Input type "${type}" isn't supported by jpa-panel.`);
    }
}

export class JpaPanelDuplicatedHintError extends MdError {
    constructor(align: string) {
        super(`A hint was already declared for 'align="${align}"'.`);
    }
}

@Component({
    moduleId: module.id,
    selector: 'jpa-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        NgIf,
        NgModel,
        NgSelectOption,
        JpaPanelContent,
        JpaFileUploadComponent
        // FILE_UPLOAD_DIRECTIVES,
        // MD_GRID_LIST_DIRECTIVES
    ],
    providers: [JPA_PANEL_VALUE_ACCESSOR],
    pipes: [SlicePipe],
    host: {
        '(click)': 'focus()'
    }
})
export class JpaPanel implements OnInit, AfterViewInit, AfterContentInit, OnChanges, ControlValueAccessor {
    private _focused: boolean = false;
    private _expanded: boolean = false;
    private _value: any = '';
    private _empty: boolean = false;
    private _summary: any = '';
    private _underlineHidden: boolean = false;
    private _isTextfield: boolean = false;
    private _isTextarea: boolean = false;
    private _isImage: boolean = false;
    private _isGallery: boolean = false;
    private _isSelect: boolean = false;
    private _hasContent: boolean = false;
    private _hasContentRight: boolean = false;
    private _hasContentBottom: boolean = false;

    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;

    constructor() {}


    /**
     * Run right after the data-bound properties have been checked for the first time,
     * and before the children are.  Set up the panel.
     */
    ngOnInit() {
        console.info('JpaPanel.'+this.type+' ' + this.name + '#onInit ', this.type);
        switch(this.type) {
            case 'text': this._isTextfield = true; break;
            case 'select': this._isSelect = true; break;
            case 'textarea': this._isTextarea = true; break;
            case 'image': this._isImage = true; break;
            case 'images':
                this._isGallery = true;
                this._empty = true;
                console.log('set it to empty');
                this._hasContentBottom = true;
                this.fullWidth = true;
                break;
        }
    }

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
    @ContentChildren(MdHint) private _hintChildren: QueryList<MdHint>;
    @ContentChildren(NgSelectOption) private _optionChildren: QueryList<NgSelectOption>;
    @ContentChildren(JpaPanelContent) private _contentChildren: QueryList<JpaPanelContent>;
    // @ContentChild(MdGridList) private _gridList: MdGridList;

    /**
     * Form elements
     */

    @ViewChild('input') private _inputElement: ElementRef;
    @ViewChild('select') private _selectElement: ElementRef;
    @ViewChild('textarea') private _textareaElement: ElementRef;
    @ViewChild('imagePreview') private _imagePreview: ElementRef;

    /** Readonly properties. */
    get focused() { return this._focused; }
    get empty() { return this._value == null || this._value === ''; }
    get characterCount(): number {
        return this.empty ? 0 : ('' + this._value).length;
    }
    get inputId(): string { return `${this.id}-panel`; }

    /**
     * Classes
     */

    @HostBinding('class.focused') get focusedClass () { return this._focused; }
    @HostBinding('class.expanded') get expandedClass () { return this._expanded; }
    @HostBinding('class.changed') get changedClass () { return this._valueChanged; }

    /**
     * Bindings.
     */
    @Input() dividerColor: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() hintLabel: string = '';

    @Input() @BooleanFieldValue() autoFocus: boolean = false;
    @Input() @BooleanFieldValue() disabled: boolean = false;
    @Input() id: string = `jpa-panel-${nextUniqueId++}`;
    @Input() max: string = null;
    @Input() maxLength: number = null;
    @Input() min: string = null;
    @Input() minLength: number = null;
    @Input() placeholder: string = null;
    @Input() @BooleanFieldValue() readOnly: boolean = false;
    @Input() @BooleanFieldValue() required: boolean = false;
    @Input() @BooleanFieldValue() spellCheck: boolean = false;
    @Input() step: number = null;
    @Input() tabIndex: number = null;
    @Input() name: string = null;
    @Input() type: string = 'text';
    @Input() label: string = null;

    @Input() currentImage: string = null;
    @Input() gallery: any[] = [];

    @Input() fullWidth: boolean = false;

    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _expandedEmitter: EventEmitter<any> = new EventEmitter<any>();

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    @Output('expand')
    get onExpand(): Observable<any> {
        return this._expandedEmitter.asObservable();
    }

    @Output() imageFieldChanged = new EventEmitter();

    private _initialValue = null;
    private _valueChanged = false;

    set expanded(v: boolean) { this._expanded = v; }
    get expanded(): boolean { return this._expanded; }

    get value(): any { 
        if (this.type === 'image') {
            return '';
        }
        return this._value; 
    };
    @Input() set value(v: any) {
        v = this._convertValueForInputType(v);
        console.debug('JpaPanel@set value(): ', v);
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }

        this._empty = this.isEmpty(v);
    }

    isEmpty(v:any) {
        return v === undefined || v === null || (Array.isArray(v) && v.length === 0) || Object.keys(v).length === 0;
    }

    @Input() editText: string;

    get summary(): any {
        return this._summary;
    }

    set summary(value: any) {
        switch(this.type) {
            case 'select':
                let interval = setInterval(() => {
                    let filtered = this._optionChildren.filter(opt => {
                        return opt['_element']['nativeElement']['value'] == this._value;
                    });
                    if (filtered.length) {
                        this._summary = filtered[0]['_element']['nativeElement']['innerHTML'];
                        clearInterval(interval);
                    }
                }, 250);
                break;
            case 'image':
                this._summary = value || '';
                break;
            case 'images':
                this._setGallerySummary();
                break;
            default:
                this._summary = value;
        }
        // console.debug('JpaPanel.'+this.type+' ' + this.name + '#set summary(): ', this._summary);
    }

    private _setGallerySummary() {
        if (this.gallery.length) {
            this._summary = this.gallery.length + ' pictures in gallery';
        } else {
            this._summary = '';
        }
    }

    private _imageLoaded = false;
    private _currentImageSize = null;

    set currentImageSize(v: {w: number, h: number}) {
        this._currentImageSize = v;
    }
    get currentImageSize() {
        return this._currentImageSize;
    }

    get nativeElement() {
        switch(this.type) {
            case 'select': return this._selectElement.nativeElement;
            case 'textarea': return this._textareaElement.nativeElement;
            default:
                if (this._inputElement) {
                    return this._inputElement.nativeElement;
                }
        }

        return false;
    }

    /** Set focus on input */
    focus() {
        if (this.nativeElement) {
            this.nativeElement.focus();
        }
    }

    /** @internal */
    handleFocus(event: FocusEvent) {
        // console.debug('JpaPanel.'+this.type+' ' + this.name + '#handleFocus ', event);
        if (this.expanded) {
            this._focused = true;
            this._focusEmitter.emit(event);
        } else {
            // console.debug('JpaPanel.'+this.type+' ' + this.name + '#handleFocus: skipping focus for non-expanded panel');
        }
    }

    /** @internal */
    handleBlur(event: FocusEvent) {
        // console.debug('JpaPanel.'+this.type+' ' + this.name + '#handleBlur ', event);
        if (this.expanded) {
            this._focused = false;
            this._onTouchedCallback();
            this._blurEmitter.emit(event);
        } else {
            // console.debug('JpaPanel.'+this.type+' ' + this.name + '#handleBlur: skipping blur for non-expanded panel');
        }
    }

    /** @internal */
    handleChange(event: any) {
        console.debug('JpaPanel.'+this.type+' ' + this.name + '#handleChange: ', event, this);
        switch (this.type) {
            case 'images':
                let value = this.value || [];
                value.push(event[0]);
                this.value = value;
                break;
            case 'select':
                this.value = (<HTMLSelectElement>event.target).value;
                this.summary = this.value;
                break;
            case 'textarea':
                this.value = (<HTMLTextAreaElement>event.target).value;
                this.summary = this.value;
                break;
            case 'image':
                this.imageFieldChanged.emit(event);
                break;
            default:
                this.value = (<HTMLInputElement>event.target).value;
                this.summary = this.value;
                break;
        }
        // console.log('JpaPanel.'+this.type+' ' + this.name + '#handleChange (' + this.type + ') set value for  to ', this.value);
        this._valueChanged = true;
        this._onTouchedCallback();
    }

    /** @internal */
    hasPlaceholder(): boolean {
        return !!this.placeholder;
    }

    /**
       * Implemented as part of ControlValueAccessor.
       * TODO: internal
       */
    writeValue(value: any) {
        console.debug('JpaPanel.'+this.type+' ' + this.name + '#writeValue('+this.type+')', value);
        this._value = value;
        if (!this._initialValue) this._initialValue = value;
        switch (this.type) {
            case 'image':
                if (value !== undefined && value !== null) {
                    this.summary = 'New - ' + value.name;
                    break;
                }
            default: this.summary = value; break;
        }
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any) {
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
        this._validateConstraints();

        // Trigger validation when the hint children change.
        this._hintChildren.changes.subscribe(() => {
            this._validateConstraints();
        });

        if (JPA_PANEL_UNDERLINE_HIDDEN.indexOf(this.type) !== -1) {
            this._underlineHidden = true;
        }

        this._hasContent = !!this._contentChildren.length;

        if (this._hasContent) {
            this._contentChildren.forEach(panel => {
                if (panel.align === 'bottom') {
                    this._hasContentBottom = true;
                } else if (panel.align === 'right') {
                    this._hasContentRight = true;
                }
            })
        }

        // console.debug('JpaPanel.'+this.type+' ' + this.name + '#AfterContentInit', this);
    }

    ngAfterViewInit() {
        switch(this.type) {
            case 'image':
                if (this._imagePreview && this.currentImageSize === null) {
                    this._imagePreview.nativeElement.onload = (e) => {
                        // console.debug('JpaPanel.'+this.type+' ' + this.name + '#AfterViewInit IMAGE LOADED!');
                        this._imageLoaded = true;
                        this.currentImageSize = {w: this._imagePreview.nativeElement.naturalWidth, h: this._imagePreview.nativeElement.naturalHeight};
                        if (!this._expanded) {
                            this._summary = this.currentImageSize.w + 'x' + this.currentImageSize.h + 'px';
                        }
                    };
                }
                this.value = this.nativeElement.value;
            break;
            default:
                if (this.nativeElement) {
                    // console.log('JpaPanel.'+this.type+' ' + this.name + '#AfterViewInit : found nativeElement.',this.nativeElement);
                    this.value = this.nativeElement.value;
                }
                break;
        }
    }

    /** TODO: internal */
    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        console.log('JpaPanel.'+this.type+' ' + this.name + '#OnChanges() : ', changes);
        this._validateConstraints();
    }

    /**
     * Convert the value passed in to a value that is expected from the type of the md-input.
     * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
     * on our internal input it won't work locally.
     * @private
     */
    private _convertValueForInputType(v: any): any {
        switch (this.type) {
            case 'number': return parseFloat(v);
            default: return v;
        }
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
        if (JPA_PANEL_VALID_INPUT_TYPE.indexOf(this.type) === -1) {
            throw new JpaPanelUnsupportedTypeError(this.type);
        }

        if (this._hintChildren) {
            // Validate the hint labels.
            let startHint: MdHint = null;
            let endHint: MdHint = null;
            this._hintChildren.forEach((hint: MdHint) => {
                if (hint.align == 'start') {
                    if (startHint || this.hintLabel) {
                        throw new JpaPanelDuplicatedHintError('start');
                    }
                    startHint = hint;
                } else if (hint.align == 'end') {
                    if (endHint) {
                        throw new JpaPanelDuplicatedHintError('end');
                    }
                    endHint = hint;
                }
            });
        }
    }


    /**
     * Internal
     */

    toggle($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this._expanded = !this._expanded;

        this.onToggle();
    }

    /** internal **/
    onToggle() {
        this._expandedEmitter.emit(this._expanded);
        if (this._hasContent) {
            this._contentChildren.forEach(panelContent => {
                panelContent.onToggle(this._expanded);
            });
        }
    }


    imageUploadLoaded(e: any) {
        console.log('PanelComponent# imageUploadLoaded ', e);
        if (e.config.isNew) {
            this._setGallerySummary();
        }
    }
}
