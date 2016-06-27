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
import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';
import { JpaPanelContent } from './content/index';

import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

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
    directives: [MATERIAL_DIRECTIVES, NgIf, NgModel, NgSelectOption, JpaPanelContent, FILE_UPLOAD_DIRECTIVES],
    providers: [JPA_PANEL_VALUE_ACCESSOR],
    pipes: [SlicePipe],
    host: {
        '(click)': 'focus()'
    }
})
export class JpaPanel implements AfterContentInit, AfterViewInit, OnChanges, ControlValueAccessor, OnInit {
    private _focused: boolean = false;
    private _expanded: boolean = false;
    private _value: any = '';
    private _summary: any = '';
    private _underlineHidden: boolean = false;
    private _isTextfield: boolean = false;
    private _isTextarea: boolean = false;
    private _isImage: boolean = false;
    private _isMultipleImages: boolean = false;
    private _isSelect: boolean = false;
    private _hasContent: boolean = false;
    private _hasContentRight: boolean = false;
    private _hasContentBottom: boolean = false;

    private _newImages: any[] = [];
    private hasBaseDropZoneOver: boolean = false;
    public uploader:FileUploader = new FileUploader({url: 'wtf'});

    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = (...args) => {
        console.debug('JpaPanel#onChangeCallback:', args);
    };

    constructor() {}

    ngOnInit() {
        console.debug('JpaPanel#onInit ', this.type);
        switch(this.type) {
            case 'text': this._isTextfield = true; break;
            case 'select': this._isSelect = true; break;
            case 'textarea': this._isTextarea = true; break;
            case 'image': this._isImage = true; break;
            case 'images': this._isMultipleImages = true; break;
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

    private _initialValue = null;
    private _valueChanged = false;

    set expanded(v: boolean) { this._expanded = v; }
    get expanded(): boolean { return this._expanded; }

    get value(): any { return this._value; };
    @Input() set value(v: any) {
        console.debug('JpaPanel#set value ', v);
        v = this._convertValueForInputType(v);

        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    @Input() editText: string;

    get summary(): any {
        return this._summary;
    }

    set summary(value: any) {
        switch(this.type) {
            case 'select':
                console.log('(SELECT) SET SUMMARY FOR VALUE ' + value);
                let interval = setInterval(() => {
                    let filtered = this._optionChildren.filter(opt => {
                        return opt['_element']['nativeElement']['value'] == this._value;
                    });
                    console.log('(SELECT) FILTERED OPTIONS: ', filtered);
                    if (filtered.length) {
                        this._summary = filtered[0]['_element']['nativeElement']['innerHTML'];
                        clearInterval(interval);
                    }
                }, 250);
                break;
            case 'image':
                this._summary = value || '';
                break;
            default:
                this._summary = value;
        }
        console.debug('Setting summary to ' + this._summary);
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
        console.debug('JpaPanel#handleFocus ', event);
        if (this.expanded) {
            this._focused = true;
            this._focusEmitter.emit(event);
        } else {
            console.debug('skipping focus for non-expanded panel');
        }
    }

    /** @internal */
    handleBlur(event: FocusEvent) {
        console.debug('JpaPanel#handleBlur ', event);
        if (this.expanded) {
            this._focused = false;
            this._onTouchedCallback();
            this._blurEmitter.emit(event);
        } else {
            console.debug('skipping blur for non-expanded panel');
        }
    }

    /** @internal */
    handleChange(event: Event) {
        console.debug('JpaPanel#handleChange: ', event, this);
        switch (this.type) {
            case 'select':
                this.value = (<HTMLSelectElement>event.target).value;
                this.summary = this.value;
                break;
            case 'textarea':
                this.value = (<HTMLTextAreaElement>event.target).value;
                this.summary = this.value;
                break;
            default:
                this.value = (<HTMLInputElement>event.target).value;
                this.summary = this.value;
                break;
        }
        console.log('JpaPanel#handleChange (' + this.type + ') set value for  to ', this.value);
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
        console.debug('JpaPanel#writeValue('+this.type+')', value);
        this._value = value;
        if (!this._initialValue) this._initialValue = value;
        this.summary = value;
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

        console.debug('JpaPanel#ngAfterContentInit', this);
    }

    ngAfterViewInit() {
        switch (this.type) {
            case 'image':
                if (this._imagePreview && this.currentImageSize === null) {
                    this._imagePreview.nativeElement.onload = (e) => {
                        console.log('IMAGE LOADED!');
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
                if (this.nativeElement) { this.value = this.nativeElement.value; }
        }

        console.debug('JpaPanel#AfterViewInit  (' + this.type + ')', this);
    }

    /** TODO: internal */
    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        console.log('Changes on Panel ' + this.id + ' (' + this.name + '): ', changes);
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
        console.debug('toggle!');
        $event.preventDefault();
        $event.stopPropagation();
        this._expanded = !this._expanded;

        this.onToggle();
    }

    /** internal **/
    onToggle() {
        // if (this._expanded) {
        //     this.initialSummary = this._summary;
        //     if (this.placeholder) {
        //         this._summary = this.placeholder;
        //     } else {
        //         this._summary = `Edit ${this.label}`;
        //     }
        // } else {
        //     if (this.type === 'select' && !this._summary) {
        //         this._summary = this.initialSummary;
        //     } else if (this.type === 'image' && this.currentImage && this.currentImageSize !== null) {
        //         this._summary = this.currentImageSize.w + 'x' + this.currentImageSize.h + 'px';
        //     } else {
        //         this._summary = this.value;
        //     }
        // }

        this._expandedEmitter.emit(this._expanded);
        if (this._hasContent) {
            this._contentChildren.forEach(panelContent => {
                panelContent.onToggle(this._expanded);
            });
        }
    }

    /**
     * File Upload
     */
    fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }

    onFileDrop(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            this.readFile(file)
                .subscribe(read => {
                    this._newImages.push(read);
                    console.log('Added image to newImages: ', read);
                });
        }
    }

    readFile(file: File) : Observable<any> {
            const filename = file.name;

            return Observable.create(observer => {
                let reader = new FileReader();

                reader.onload = readerEvt => {
                    let base64 = btoa(readerEvt.target['result']);

                    observer.next({
                        name: filename,
                        base64: base64
                    });
                };

                reader.readAsBinaryString(file);
            });
        }
}
