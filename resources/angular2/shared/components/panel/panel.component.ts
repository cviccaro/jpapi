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
    SimpleChanges,
    ContentChildren,
    ViewChild,
    ViewChildren,
    ElementRef,
    QueryList,
    OnChanges,
    EventEmitter,
    Output,
} from '@angular/core';
import { SlicePipe, NgIf, NgSwitch } from '@angular/common';
import {NgModel, NgSelectOption, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BooleanFieldValue} from '@angular2-material/core/annotations/field-value';
import {MdError} from '@angular2-material/core/errors/error';
import {Observable} from 'rxjs/Observable';
import { MdHint } from '@angular2-material/input';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';
import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';
import { JpaPanelContent } from './content/index';
import { PanelSummaryComponent } from './summary/index';
import { ImageUploadComponent } from '../image-upload/index';
import { ChipComponent } from '../chip/index';

import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

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
    'images',
    'multiselect'
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
        ImageUploadComponent,
        PanelSummaryComponent,
        ChipComponent,
        DND_DIRECTIVES
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
    private _secureValue: any = '';
    private _empty: boolean = false;
    private _underlineHidden: boolean = false;
    private _initialValue = null;
    private _valueChanged = false;
    private _isTextfield: boolean = false;
    private _isTextarea: boolean = false;
    private _isImage: boolean = false;
    private _isGallery: boolean = false;
    private _isSelect: boolean = false;
    private _isMultiSelect: boolean = false;
    private _hasContent: boolean = false;
    private _hasContentRight: boolean = false;
    private _hasContentBottom: boolean = false;
    private _hasContentLeft: boolean = false;
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;
    private _originalOptions: any[];
    private _multiselectDropZone: number = -1;

    /**
     * Bindings.
     */
    @Input() @BooleanFieldValue() autoFocus: boolean = false;
    @Input() currentImage: string = null;
    @Input() @BooleanFieldValue() disabled: boolean = false;
    @Input() dividerColor: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() editText: string;
    @Input() fullWidth: boolean = false;
    @Input() hintLabel: string = '';
    @Input() id: string = `jpa-panel-${nextUniqueId++}`;
    @Input() label: string = null;
    @Input() max: string = null;
    @Input() maxLength: number = null;
    @Input() min: string = null;
    @Input() minLength: number = null;
    @Input() name: string = null;
    @Input() options: any[];
    @Input() placeholder: string = null;
    @Input() @BooleanFieldValue() readOnly: boolean = false;
    @Input() @BooleanFieldValue() required: boolean = false;
    @Input() @BooleanFieldValue() spellCheck: boolean = false;
    @Input() step: number = null;
    @Input() tabIndex: number = null;
    @Input() type: string = 'text';

    /** Readonly properties. */
    get focused() { return this._focused; }
    get empty() {
        let v = this.value;
        let x = !v || v === undefined || v === null || (Array.isArray(v) && v.length === 0)
        // console.warn('Panel'+this.type+' is checking empty of value: ', {
        //     v: v,
        //     x: x,
        //     falsyCheck: (!v ? true : false)
        // });
        return x;
    }
    get characterCount(): number { return this.empty ? 0 : ('' + this._value).length; }
    get inputId(): string { return `${this.id}-panel`; }

    get value(): any { return this._value; }
    @Input() set value(v: any) {
        console.debug('JpaPanel'+this.type+'.'+this.name+'# set value(): ', v);

        if (v !== this._value) {
            console.log('JpaPanel.'+this.type+'.'+this.name+'# value cahnged!', { v: v, _value: this._value});
            this._value = v;
            this._onChangeCallback(v);
        } else {
            if (this.type === 'multiselect' && this.empty) {
                this._onChangeCallback(null);
            } else {
                this._onChangeCallback(this._value);
            }
        }
    }

    set expanded(v: boolean) {
        this._expanded = v;
        this._toggleEmitter.emit(this._expanded);
    }
    get expanded(): boolean { return this._expanded; }

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

    /**
     * Content directives.
     */
    @ContentChildren(MdHint) private _hintChildren: QueryList<MdHint>;
    @ContentChildren(NgSelectOption) private _optionChildren: QueryList<NgSelectOption>;
    @ContentChildren(JpaPanelContent) private _contentChildren: QueryList<JpaPanelContent>;
    @ViewChild(ImageUploadComponent) private _imageUploadCmp: ImageUploadComponent;
    @ViewChild(PanelSummaryComponent) private _summaryChild: PanelSummaryComponent;
    @ViewChild('input') private _inputElement: ElementRef;
    @ViewChild('select') private _selectElement: ElementRef;
    @ViewChild('textarea') private _textareaElement: ElementRef;

    /**
     * Classes
     */
    @HostBinding('class.focused') get focusedClass () { return this._focused; }
    @HostBinding('class.expanded') get expandedClass () { return this._expanded; }
    @HostBinding('class.changed') get changedClass () { return this._valueChanged; }
    @HostBinding('class.empty') get emptyClass () { return this.empty; }
    @HostBinding('class.text') get textClass() { return this.type === 'text'; }
    @HostBinding('class.select') get selectClass() { return this.type === 'select'; }
    @HostBinding('class.textarea') get textareaClass() { return this.type === 'textarea'; }
    @HostBinding('class.image') get imageClass() { return this.type === 'image'; }
    @HostBinding('class.images') get imagesClass() { return this.type === 'images'; }
    @HostBinding('class.multiselect') get multiSelectClass() { return this.type === 'multiselect'; }
    /**
     * Outputs
     */
    @Output() imageFieldChanged = new EventEmitter();

    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _toggleEmitter: EventEmitter<any> = new EventEmitter<any>();

    @Output('blur') get onBlur(): Observable<FocusEvent> { return this._blurEmitter.asObservable(); }
    handleBlur(event: FocusEvent) {
        if (this.expanded) {
            this._focused = false;
            this._onTouchedCallback();
            this._blurEmitter.emit(event);
        }
    }

    @Output('focus') get onFocus(): Observable<FocusEvent> { return this._focusEmitter.asObservable(); }
    handleFocus(event: FocusEvent) {
        if (this.expanded) {
            this._focused = true;
            this._focusEmitter.emit(event);
        }
    }
    focus() {
        if (!this.expanded) {
            this.toggle();
            if (this.nativeElement) {
                setTimeout(() => { this.nativeElement.focus() });
            }
        } else if (this.nativeElement) {
            this.nativeElement.focus();
        }
    }

    @Output('toggle') get onToggle(): Observable<any> {
        return this._toggleEmitter.asObservable();
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    writeValue(value: any) {
        console.debug('JpaPanel.'+this.type+' ' + this.name + '#writeValue('+this.type+')', value);
        this._value = value;
        if (this.type === 'multiselect' && value !== null) this.setMultiOptions();
        if (!this._initialValue) this._initialValue = value;
    }
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    /**
     * Handle child content change events
     */
    handleChange(event: any) {
        console.debug('JpaPanel.'+this.type+' ' + this.name + '#handleChange: ', event, this);
        switch (this.type) {
            case 'images':
                this.value = event;
                break;
            case 'select':
                this.value = (<HTMLSelectElement>event.target).value;
                break;
            case 'textarea':
                this.value = (<HTMLTextAreaElement>event.target).value;
                break;
            case 'image':
                this.value = event.target.files[0];
                // console.log('bypassing setting value using ngmodel for image... ', {
                //     'value': this.value,
                //     '_value': this._value,
                //     elValue: (<HTMLInputElement>event.target).value
                // });
                this.imageFieldChanged.emit(event.target.files[0]);
                break;
            default:
                this.value = (<HTMLInputElement>event.target).value;
                break;
        }

        this._valueChanged = true;
        this._onTouchedCallback();
    }

    /**
     * Run right after the data-bound properties have been checked for the first time,
     * and before the children are.
     */
    ngOnInit() {
        //console.info('JpaPanel.'+this.type+' ' + this.name + '#onInit ', this.type);
        switch(this.type) {
            case 'text': this._isTextfield = true; break;
            case 'select': this._isSelect = true; break;
            case 'textarea': this._isTextarea = true; break;
            case 'image': this._isImage = true; break;
            case 'multiselect': this._isMultiSelect = true; this._hasContentRight = true; break;
            case 'images':
                this._isGallery = true;
                this._hasContentBottom = true;
                this.fullWidth = true;
                break;
        }
    }

    /**
     * After content init
     */
    ngAfterContentInit(): void {
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
                switch(panel.align) {
                    case 'right': this._hasContentRight = true; break;
                    case 'left': this._hasContentLeft = true; break;
                    case 'bottom': this._hasContentBottom = true; break;
                }
            })
        }

        if (this._summaryChild) {
            switch(this.type) {
                case 'select':
                //console.log('setting select options on children to ', this._optionChildren);
                    this._summaryChild.setOptions(this._optionChildren);
                    break;
            }
        }

        console.info('JpaPanel.'+this.type+' ' + this.name + '#AfterContentInit', {this: this, value: this.value, _value: this._value});
    }

    /**
     * After View Init
     */
    ngAfterViewInit(): void {
        switch(this.type) {
            case 'image':
            // console.log('Panel(image) setting value to ', {
            //     from: this.value,
            //     to: this.nativeElement.value
            // });
                this.value = this.nativeElement.value;
            break;
            case 'multiselect':
                this._originalOptions = this.options;
                break;
            default:
                if (this.nativeElement) {
                    this.value = this.nativeElement.value;
                }
        }
        console.info('PanelComponent.' + this.type + ' # AfterViewInit: ' , {this: this, value: this.value, _value: this._value});
    }

    /**
     * Handle changes on
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
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

    toggle($event?: Event) {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }

        this.expanded = !this.expanded;

        if (this._hasContent) {
            this._contentChildren.forEach(panelContent => {
                panelContent.onToggle(this.expanded);
            });
        }
    }

    setMultiOptions() {
        console.warn('SetMultiOptions');
        this._secureValue = this.value.length === 0 ? null : JSON.stringify(this.value);
        // this._onChangeCallback(this.value);
        // this._onTouchedCallback();
        // console.log('secure value!', {
        //     secure: this._secureValue,
        //     value: this.value,
        //     _value: this._value
        // });
        if (this.options) {
            let ids = this.value.map(item => item.id);
            console.log('value ids: ', ids);
            this.options = this._originalOptions.filter(option => {
                return ids.indexOf(option.id) === -1;
            });
        }
    }

    multiselectDrop(e) {
        if (e.dragData.hasOwnProperty('preventAdd') && e.dragData.preventAdd === true) {
            console.log('preventing add from already added chip.');
            return;
        }

        console.log('Multiselect drop!!!!', e);

        let data = e.dragData;
        let val = this.value.slice(0);

        val.push(data.option);
        this.value = val;
        this.setMultiOptions();
        // this._onChangeCallback(this.value);
        this._onTouchedCallback();
        this._valueChanged = true;
    }

    multiselectReorder(e) {
        let new_index = this._multiselectDropZone;
        let old_index = e.dragData.index;

        if (new_index !== old_index) {
            let value = this.value.slice(0);

            const source = value[old_index];
            const target = value[new_index];

            value[new_index] = source;
            value[old_index] = target;

            this.value = value;

            console.log('Multiselect reorder from ' + old_index + ' to ' + new_index);
        }

        this._onTouchedCallback();
        this._valueChanged = true;
    }

    multiselectOnDragEnter(e, index) {
        this._multiselectDropZone = index;
        console.log("multiselectdragenter on " + index);
    }

    multiselectRemove(id) {
        let filtered = this.value.filter(item => {
            return item.id === id
        })

        if (filtered && filtered.length) {
            let index = this.value.indexOf(filtered[0]);
            let value = this.value;
            value.splice(index, 1);
            this.value = value;
            console.log('set value to ', value);
            this.setMultiOptions();
            // this._onChangeCallback(this.value);
            // this._onTouchedCallback();
        }

        this._onTouchedCallback();
        this._valueChanged = true;
    }

    /**
     * ImageUpload events
     */
    fileAdded(e: any) {
        console.log('PanelComponent -- ImageUpload -- fileAdded', e);
    }
    imageAdded(e: any) {
        console.log('PanelComponent -- ImageUpload -- imageAdded', e);
    }
    imageLoaded(e: any) {
        console.log('PanelComponent -- ImageUpload -- imageLoaded', e);
    }

    /**
     * Form reset
     */

    public reset() {
        this._valueChanged = false;
        this._secureValue = '';
        if (this.type === 'image') {
            this._inputElement.nativeElement.value = '';
        }
        this.expanded = false;
    }
}
