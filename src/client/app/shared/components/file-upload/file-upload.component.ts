import {
    forwardRef,
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    HostBinding,
    EventEmitter,
    ViewChild,
    Provider,
    ElementRef
} from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';

import { BooleanFieldValue } from '@angular2-material/core/annotations/field-value';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar/progress-bar';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon/icon';

import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

import { LoggerService } from '../../services/logger.service';
import { GridImageComponent } from './grid-image/index';
import { ManagedFile, ManagedImage } from '../../models/file';
import { FileUploadToolbarComponent } from './toolbar/index';
import { FileCardComponent } from './file-card/index';
import { FileIconComponent } from './file-icon/index';

const noop = () => { };
let nextUniqueId = 0;

export const IMAGE_UPLOAD_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => FileUploadComponent),
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
        GridImageComponent,
        DND_DIRECTIVES,
        FileUploadToolbarComponent,
        FileCardComponent,
        FileIconComponent,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault
    ],
    providers: [IMAGE_UPLOAD_VALUE_ACCESSOR]
})
export class FileUploadComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    public isDragOver: boolean = false;
    public isLoading: boolean = false;
    public new_file: File;

    /**
     * Inputs
     */
    @Input() multiple: boolean = false;
    @Input() type: string = 'file';
    @Input() icon: string = 'panorama';
    @Input() control: any;

    @Input() name: string = null;
    @Input() accept: string = '*';
    @Input() @BooleanFieldValue() required: boolean = false;
    @Input() id: string = `jpa-panel-${nextUniqueId++}`;
    @Input() step: number = null;
    @Input() tabIndex: number = null;

    // MdGridList
    @Input() gutterSize: string = '8px';
    @Input() cols: number = 4;
    @Input() rowHeight: any = '16:9';

    /**
     * Outputs
     */
    @Output() imageLoaded = new EventEmitter<ManagedImage>();
    @Output() fileRemoved = new EventEmitter<ManagedFile|ManagedImage>();
    @Output() fileAdded = new EventEmitter<ManagedFile|ManagedImage>();
    @Output() change = new EventEmitter();

    /**
     * View/Content Children
     */
    @ViewChild('currentImage') private _currentImageEl: ElementRef;

    /**
     * Private variables
     */
    private listener: EventListener;
    private _imagesLoaded: number = 0;
    private _value: any;
    private _dragging: boolean = false;
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;
    private _subscriptions: Subscription[] = [];

    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    constructor(private log: LoggerService) { }

    @HostBinding('class') get typeClass() {
        return `file-upload-${this.type} file-upload-${this.multiple ? 'multiple' : 'single'}`;
    }

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    /** @internal */
    handleFocus(event: FocusEvent) {
        this.log.log('FileUploadComponent#handleFocus', event);
    }

    /** @internal */
    handleBlur(event: FocusEvent) {
        this.log.log('FileUploadComponent#handleBlur', event);
    }

    get empty() {
        return this.value === undefined || this.value === null ||
            Array.isArray(this.value) && this.value.length === 0 || Object.keys(this.value).length === 0;
    }

    get value(): any { return this._value; };
    @Input() set value(v: any) {
        v = this.convertValueForInputType(v);

        if (v !== this._value) {
            this._value = v;

            this.change.emit(v);

            if (this.multiple) {
                let ngModelValue = (Array.isArray(v) && v.length === 0) ? '' : v;
                this._onChangeCallback(ngModelValue);
            } else {
                this._onChangeCallback(v);
            }
            this._onTouchedCallback();
        }
    }

    ngOnInit() {
        if (this.type === 'image' && this.accept === '*') this.accept = 'image/jpeg, image/jpg, image/gif, image/png';
    }

    ngAfterViewInit() {
        if (this.type === 'image' && !this.multiple) {
            if (this._currentImageEl) {
                 let imageEl = (<HTMLImageElement>this._currentImageEl.nativeElement);

                 this.registerImageWatcher(imageEl);

                 if (this.value.url) setTimeout(() => { imageEl.src = this._value.url; });
            }
        }
    }

    registerImageWatcher(imageEl: HTMLImageElement) {
        this.listener = (event: Event) => {
            let val = this.value;

            val.width = imageEl.naturalWidth;
            val.height = imageEl.naturalHeight;

            this.value = val;

            if (this.control) {
                this.control.value = this.value;
            }
        };
        imageEl.addEventListener('load', this.listener);
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    /**
     * ControlValueAccessor protocol
     *
     * Runs when value is first set
     */
    writeValue(value: any) {
        this._value = this.convertValueForInputType(value);
    }

    /**
     * Convert the value to the appropriate
     * type based on properties multiple and type
     *
     * @param {any} value [description]
     */
    convertValueForInputType(value: any): any {
        if (!this.multiple) {
            if ( !value ) return '';

            return this.managedFile(this.type, value);
        } else {
            if ( !value ) return [];

            return value.map((item, i) => this.managedFile(this.type, item, i));
        }
    }

    managedFile(type: string, value: any, idx: number = 0) {
        switch(type) {
            case 'image': if (!(value instanceof ManagedImage)) return new ManagedImage(value, idx);
            case 'file': if (!(value instanceof ManagedFile)) return new ManagedFile(value, idx);
        }

        return value;
    }

    _stopEvent(e: Event) {
        event.preventDefault();
        event.stopPropagation();
    }

    _getTransfer(event: any): any {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }

    _haveFiles(types: any): any {
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

    gridImageLoaded(e: any) {
        e._hasNew = false;

        if (!e.config.hasOwnProperty('id')) {
            this.isLoading = false;

            e._hasNew = true;
        } else if (++this._imagesLoaded === this.value.length) {
            this.isLoading = false;
        }

        this.imageLoaded.emit(e);
    }

    handleClickedRemove(e: any) {
        let value = this.value.slice(0);
        value.splice(e.index, 1);
        this.value = value;

        this.fileRemoved.emit(e);
    }

    onDragOver(e: any) {
        if (this._dragging) {
            this._stopEvent(e);
            return;
        }

        let transfer = this._getTransfer(e);
        if (!this._haveFiles(transfer.types)) {
            return;
        }

        transfer.dropEffect = 'copy';

        this._stopEvent(e);
        this.isDragOver = true;
    }

    onDragLeave(e: any) {
        if (this._dragging) {
            return;
        }

        this._stopEvent(e);
        this.isDragOver = false;
    }

    fileDragStart(e: any): void {
        this._dragging = true;
    }

    onDragEnd(e: any) {
        this._stopEvent(e);
        this._dragging = false;
    }

    add(event: Event) {
        if (this._dragging) {
            this._dragging = false;
            this.isDragOver = false;

            return;
        }

        let files = event.target['files'] || event['dataTransfer']['files'];

        this._stopEvent(event);
        this.isDragOver = false;

        this.readFiles(files);
    }

    readFiles(files: any[] = []) {
        if (!files.length) {
            return;
        }

        this.isLoading = true;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            switch(this.type) {
                case 'image':
                    let managedImage = new ManagedImage({_file: file}, i);

                    let sub = managedImage.read().subscribe(e => {
                        managedImage.url = e;

                        this.addToGrid(managedImage);

                        this.isLoading = false;
                    });

                    this._subscriptions.push(sub);

                    break;
                default:
                    let managedFile = new ManagedFile({_file: file}, i);

                    this.addToGrid(managedFile);

                    this.isLoading = false;
                    break;
            }

        }
    }

    addToGrid(file: ManagedFile|ManagedImage) {
        this.pushValue(file);
        this.fileAdded.emit(file);
    }

    pushValue(file: ManagedFile|ManagedImage) {
        let value = this.value.slice(0);

        value.push(file);

        this.value = value;
    }

    reorder(event: { dragData: number, mouseEvent: DragEvent }, new_index: number): void {
        let old_index = event.dragData;

        this._stopEvent(event.mouseEvent);
        this._dragging = false;

        if (old_index !== new_index) {
            this.moveFile(old_index, new_index);
        }
    }

    /**
     * Move file within array
     */
    moveFile(old_index, new_index): void {
        let files = this.value;

        const source = files[old_index];
        const target = files[new_index];

        files[new_index] = source;
        files[old_index] = target;

        this.value = files;
    };

    /**
     * Form reset
     */
    reset() {
        this.log.log('FileUploadComponent.reset()', this);
    }

    /**
     * Attach a single file
     */
    handleSingleFileAttach(e) {
        this._stopEvent(e);

        let file: File;

        if (e instanceof File) {
            file = e;
        } else {
            let files = e.target.files || e.dataTransfer.files;
            file = files[0];
        }

        switch(this.type) {
            case 'image':
                this.attachSingleImage(file);
                break;
            case 'file':
                this.attachSingleFile(file);
                break;

        }
    }

    attachSingleFile(file: File) {
        let managedFile = new ManagedFile({_file: file}, 0);

        this.value = managedFile;
    }

    attachSingleImage(file: File) {
        let image = new ManagedImage({_file: file}, 0);

        this.isLoading = true;

        let sub = image.read().subscribe(e => {
            image.url = e;

            this.value = image;

            let imageEl = (<HTMLImageElement>this._currentImageEl.nativeElement);
            imageEl.src = e;

            this.isLoading = false;
        });

        this._subscriptions.push(sub);
    }

    /**
     * Remove single file
     */
    removeFile(e: any) {
        this.value = '';
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy() {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });

        if (this._currentImageEl && this.listener) {
            (<HTMLImageElement>this._currentImageEl.nativeElement).removeEventListener('load', this.listener);
        }
    }
}