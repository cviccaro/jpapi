import {
    forwardRef,
    Component,
    OnInit,
    AfterViewInit,
    AfterContentInit,
    SimpleChange,
    OnChanges,
    Input,
    Output,
    HostListener,
    HostBinding,
    EventEmitter,
    ViewChild,
    ViewChildren,
    ContentChildren,
    Provider,
    QueryList,
    ElementRef
} from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { BooleanFieldValue } from '@angular2-material/core/annotations/field-value';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';
import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

import { GridImage } from './grid-image/index';
import { JpFile, ManagedFile, ManagedImage } from '../../models/jp-file';
import { FileUploadToolbar } from './toolbar/index';
import { FileCardComponent } from './file-card/index';
import { FileIconComponent } from './file-icon/index';
import { AuthService } from '../../services/auth.service';

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
        GridImage,
        DND_DIRECTIVES,
        FileUploadToolbar,
        FileCardComponent,
        FileIconComponent,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault
    ],
    providers: [IMAGE_UPLOAD_VALUE_ACCESSOR]
})
export class FileUploadComponent implements ControlValueAccessor, OnInit, AfterViewInit {
    constructor(authService: AuthService) { }

    public isDragOver: boolean = false;
    public isLoading: boolean = false;
    private _imagesLoaded: number = 0;
    private _value: any;
    private _rows: any[] = [];
    private _cols: any[] = [];
    private _dragging: boolean = false;
    private _dragImage: any;
    private _dropZoneStart: number;
    private _droppedImage: any;
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    public new_file: File;

    /**
     * Content directives
     */
    @ViewChildren(GridImage) private _gridImages: QueryList<GridImage>;
    @ViewChild(MdGridList) private _gridList: MdGridList;

    @ViewChild('currentImage') private _currentImageEl: ElementRef;

    @HostBinding('class') get typeClass() {
        return `file-upload-${this.type} file-upload-${this.multiple ? 'multiple' : 'single'}`;
    }

    public get empty() {
        return this.value === undefined || this.value === null || Array.isArray(this.value) && this.value.length === 0 || Object.keys(this.value).length === 0;
    }

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
    @Input() gutterSize: string = "8px";
    @Input() cols: number = 4;
    @Input() rowHeight: any = '16:9';

    /**
     * Outputs
     */
    @Output() imageLoaded = new EventEmitter<ManagedImage>();
    @Output() fileRemoved = new EventEmitter<ManagedFile|ManagedImage>();
    @Output() fileAdded = new EventEmitter<ManagedFile|ManagedImage>();
    @Output() change = new EventEmitter();

    /** element  outputs **/
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

    /** @internal */
    handleFocus(event: FocusEvent) {
        console.log('FileUploadComponent#handleFocus', event);
    }

    /** @internal */
    handleBlur(event: FocusEvent) {
        console.log('FileUploadComponent#handleBlur', event);
    }

    get value(): any { return this._value; };
    @Input() set value(v: any) {
        console.debug('FileUploadComponent#set value() to ', v);

        v = this.convertValueForInputType(v);

        console.log('FileUploadComponent#set value() CONVERTED: ', v);

        if (v !== this._value) {
            this._value = v;

            console.warn('emitting change', v);
            this.change.emit(v);

            if (this.multiple) {
                let ngModelValue = (Array.isArray(v) && v.length === 0) ? '' : v;
                this._onChangeCallback(ngModelValue);
            } else {
                this._onChangeCallback(v);
            }

            this._onTouchedCallback();
        } else {
            console.debug('FileUploadComponent#set value(): not emitting change events');
        }
    }

    ngOnInit() {
        if (this.type === 'image' && this.accept === '*') {
            this.accept = 'image/jpeg, image/jpg, image/gif, image/png';
        }
        console.debug('FileUploadComponent Initialized! ', this);
    }

    ngAfterViewInit() {
        if (this.type === 'image' && !this.multiple) {
            if (this._currentImageEl) {
                console.debug('FileUploadComponent | image - single #ngAfterViewInit().  Subscribing to image load...', {
                    this: this,
                    imageEl: this._currentImageEl
                });
                 let imageEl = (<HTMLImageElement>this._currentImageEl.nativeElement);
                 this.imageLoad(imageEl);
            }
        }
    }

    imageLoad(imageEl: HTMLImageElement) {
        console.warn('FileUploadComponent. imageLoad()');
        imageEl.addEventListener('load', (event: Event) => {
            console.debug('FileUploadComponent.imageLoad() ....  Image loaded!', event);
            let val = this.value;

            val.width = imageEl.naturalWidth;
            val.height = imageEl.naturalHeight;

            this.value = val;

            if (this.control) {
                this.control.value = this.value;
            }
        });
        setTimeout(() => { imageEl.src = this._value.url; });
    }

    /**
     * ControlValueAccessor protocol
     *
     * Runs when value is first set
     */
    writeValue(value: any) {
        this._value = this.convertValueForInputType(value);
        console.debug(`FileUploadComponent.${this.multiple?'multiple':'single'}.${this.type}.${this.name}#writeValue: `, { value: this._value });
    }

    /**
     * Convert the value to the appropriate
     * type based on properties multiple and type
     *
     * @param {any} value [description]
     */
    convertValueForInputType(value: any): any {
        console.log('FileUploadComponent#convertValueForInputType', value);

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

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }
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
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
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

    gridImageLoaded(e: any) {
        e._hasNew = false;

        if (!e.config.hasOwnProperty('id')) {
            this.isLoading = false;

            e._hasNew = true;
        } else {
            let id = e.config.id;

            if (++this._imagesLoaded === this.value.length) {
                this.isLoading = false;
            }
        }

        this.imageLoaded.emit(e);
    }

    handleClickedRemove(e: any) {
        console.debug('FileUploadComponent.handleClickedRemove', {
            e: e,
            value: this.value
        });

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
        console.log('FileUploadComponent#fileDragStart', e);
        this._dragging = true;
    }

    onDragEnd(e: any) {
        console.debug('onDragEnd');
        this._stopEvent(e);
        this._dragging = false;
    }

    add(event: Event) {
        if (this._dragging) {
            console.log('add cancelling because we are dragging image.');

            this._dragging = false;
            this.isDragOver = false;

            return;
        }

        let files = event.target['files'] || event['dataTransfer']['files'];

        this._stopEvent(event);
        this.isDragOver = false;

        this.readFiles(files);

        console.log('FileUploadComponent#add', {
            event: event,
            this: this
        });
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

                    managedImage.read().subscribe(e => {
                        managedImage.url = e;
                        this.addToGrid(managedImage);
                        this.isLoading = false;
                    });

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
        console.log('Loaded new image: ', file);
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

        console.info('FileUploadComponent#reorder', {
            old_index: old_index,
            new_index: new_index,
            event: event
        });
        this._dragging = false;

        if (old_index !== new_index) {
            this.moveImage(old_index, new_index);
        }
    }

    moveImage(old_index, new_index): void {
        let images = this.value;

        const source = images[old_index];
        const target = images[new_index];

        images[new_index] = source;
        images[old_index] = target;

        this.value = images;

        console.log('Just dropped image from drop zone ' + old_index + ' to drop zone ' + new_index);
    };

    /**
     * Form reset
     */
    reset() {
        console.log('FileUploadComponent.reset()', this);
    }

    /**
     * Attach a single file
     */
    handleSingleFileAttach(e) {
        console.log('handle single file attach ', e);
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
        console.log('Attach Single File: ', file);

        let managedFile = new ManagedFile({_file: file}, 0);

        console.log('attachSingleFile created new ManagedFile ', managedFile);

        this.value = managedFile;
    }

    attachSingleImage(file: File) {
        console.log('Attach Single Image: ', file);

        let image = new ManagedImage({_file: file}, 0);

        console.log('attachSingleImage created new ManagedImage ', image);

        this.isLoading = true;

        image.read().subscribe(e => {
            image.url = e;

            this.value = image;

            let imageEl = (<HTMLImageElement>this._currentImageEl.nativeElement);
            imageEl.src = e;

            this.isLoading = false;
        })
    }


    /**
     * Remove single file
     */
    removeFile(e: any) {
        this.value = '';
    }
}
