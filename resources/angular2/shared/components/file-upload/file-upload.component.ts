import {
    forwardRef,
    Component,
    AfterViewInit,
    AfterContentInit,
    SimpleChange,
    OnChanges,
    Input,
    Output,
    HostListener,
    EventEmitter,
    ViewChildren,
    ContentChildren,
    Provider,
    QueryList
} from '@angular/core';

import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanFieldValue } from '@angular2-material/core/annotations/field-value';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { Observable } from 'rxjs/Rx';

import {GridImage} from './grid-image/grid-image';

const noop = () => { };
let nextUniqueId = 0;

export const JPA_FILE_UPLOAD_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => JpaFileUploadComponent),
    multi: true
});

@Component({
    moduleId: module.id,
    selector: 'jpa-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    directives: [
        MD_GRID_LIST_DIRECTIVES,
        MD_PROGRESS_BAR_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        NgModel,
        GridImage
    ],
    providers: [JPA_FILE_UPLOAD_VALUE_ACCESSOR]
})
export class JpaFileUploadComponent implements AfterViewInit, OnChanges, ControlValueAccessor {
    public isDragOver: boolean = false;
    public isLoading: boolean = false;
    public loading: { [key: number] : any}
    private _progressIndeterminate: boolean = true;

    private _hasNew: boolean = false;
    private _added: number = 0;

    /** number of images initially fed into images input **/
    private _count: number = 0;
    private _galleryImagesLoaded:number = 0;

    private _value: File[] = [];

    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = (...args) => {
        console.debug('JpaFileUploadComponent#onChangeCallback:', args);
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
     * Inputs
     */
    @Input() @BooleanFieldValue() multiple: boolean = false;
    @Input() images: any[] = [];
    @Input() name: string = null;

    @Input() id: string = `jpa-panel-${nextUniqueId++}`;
    @Input() @BooleanFieldValue() required: boolean = false;
    @Input() step: number = null;
    @Input() tabIndex: number = null;

    /**
     * Outputs
     */
    @Output() fileAdded: EventEmitter<File[]> = new EventEmitter<File[]>();
    @Output() gridImageLoaded = new EventEmitter();

    /**
     * Content directives
     */
    @ViewChildren(GridImage) private _gridImages: QueryList<GridImage>;

    /**
     * Host bindings
     */
    onDragOver(e: any) {
        let transfer = this._getTransfer(e);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._stopEvent(e);
        this.isDragOver = true;
    }

    onDragLeave(e: any) {
        this._stopEvent(e);
        this.isDragOver = false;
    }

    onFileDrop(e: any) {
        let files = e.target.files || e.dataTransfer.files;
        this._stopEvent(e);
        this.isDragOver = false;
        this.fileAdded.emit(files);
        this.isLoading = true;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            let reader = new FileReader();
            let k = i;

            this.isLoading = true;
            reader.addEventListener('progress', e => {
                console.log('added file progress: ', e);
            });
            reader.addEventListener('load', e => {
                console.log('added file READ: ', {
                    e: e,
                    result: reader.result
                });

                let newImage = {id: 'new', image_url: reader.result, isNew: true};
                this.images.push(newImage);
                let value = this.value;
                value.push(newImage);
                this.value = value;
            });

            setTimeout(() => { reader.readAsDataURL(file); });
        }

        console.log('FileUploadComponent#FileDrop', {
            e: e,
            this: this
        });
    }

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

    @Output() change = new EventEmitter();

    /** @internal */
    handleFocus(event: FocusEvent) {
        console.log('FileUploadComponent#handleFocus', event);
    }

    /** @internal */
    handleBlur(event: FocusEvent) {
        console.log('FileUploadComponent#handleBlur', event);
    }

    /**
     * Lifecycle
     */

    ngOnInit() {
        this.isLoading = !!this.images.length;
        this._count = this.images.length;
    }

    ngAfterViewInit() {
        console.info('FileUploadComponent#AfterViewInit ---', this);

        if (this._gridImages) {
            console.log('got grid images: ', this._gridImages);
            this._gridImages.changes.subscribe( (changes: QueryList<GridImage>) => {
                console.log('Changes to grid images: ', changes);
            });
        }
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        console.debug('FileUploadComponent#OnChanges ---', changes);
    }


    /**
       * Implemented as part of ControlValueAccessor.
       */
    writeValue(value: any) {
        console.log('FileUploadComponent#writeValue?');

        if (value !== undefined) {
            this._value = value;
            console.log('FileUploadComponent#writeValue COMMIT TO ', value);
        } else {
            this._value = [];
            console.log('just set value to ...', {
                value: this._value
            });
        }

        //if (!this._initialValue) this._initialValue = value;
    }

    get value(): any { return this._value; };
    @Input() set value(v: any) {
        console.debug('FileUploadComponent# set value(): ', {
            v: v,
            _value: this._value
        });
        if (v.length !== this._added) {
            this._added++;
            this._value = v;
            console.warn('emitting change', v);
            this.change.emit(v);
        }
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }


    /** internal */
    private _stopEvent(e: Event) {
        event.preventDefault();
        event.stopPropagation();
    }

    /** internal */
    private _getTransfer(event: any): any {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    }

    /** internal */
    private _haveFiles(types: any): any {
        if (!types) {
            return false;
        }

        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        } else if (types.contains) {
            return types.contains('Files');
        } else {
            return false;
        }
    }


    imageLoaded(e: any) {
        if (e.config.id === 'new') {
            console.log('FileUpload# new Image loaded. ', {
                e: e,
                value: this.value
            });
            this._hasNew = true;
            this.isLoading = false;
        } else {
            let id = e.config.id;
            console.log('FileUpload# gallery Image (id '+id+') loaded. ', e);

            if (++this._galleryImagesLoaded === this.images.length) {
                this.isLoading = false;
            }
        }

        e._hasNew = this._hasNew;
        this.gridImageLoaded.emit(e);
    }
}
