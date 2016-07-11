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
    HostBinding,
    EventEmitter,
    ViewChild,
    ViewChildren,
    ContentChildren,
    Provider,
    QueryList,
    ElementRef
} from '@angular/core';

import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanFieldValue } from '@angular2-material/core/annotations/field-value';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';

import { MD_PROGRESS_BAR_DIRECTIVES } from '@angular2-material/progress-bar';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { Observable } from 'rxjs/Rx';

import { GridImage, ImageUpload } from './grid-image/index';
import { JpFile, ManagedFile, ManagedImage } from '../../models/jp-file';
import { ImageUploadToolbar } from './toolbar/index';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

import { AuthService } from '../../services/auth.service';

const noop = () => { };
let nextUniqueId = 0;

export const IMAGE_UPLOAD_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => ImageUploadComponent),
    multi: true
});

@Component({
    moduleId: module.id,
    selector: 'jpa-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css'],
    directives: [
        MD_GRID_LIST_DIRECTIVES,
        MD_PROGRESS_BAR_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        NgModel,
        GridImage,
        DND_DIRECTIVES,
        ImageUploadToolbar
    ],
    providers: [IMAGE_UPLOAD_VALUE_ACCESSOR]
})
export class ImageUploadComponent implements ControlValueAccessor, AfterViewInit {
    constructor(authService: AuthService) { }

    public isDragOver: boolean = false;
    public isLoading: boolean = false;

    private _imagesLoaded: number = 0;
    private _value: any = [];

    private _rows: any[] = [];
    private _cols: any[] = [];
    private _dragging: boolean = false;
    private _dragImage: any;
    private _dropZoneStart: number;
    private _droppedImage: any;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    /**
     * Content directives
     */
    @ViewChildren(GridImage) private _gridImages: QueryList<GridImage>;
    @ViewChild(MdGridList) private _gridList: MdGridList;

    @ViewChild('currentImage') private _currentImageEl: ElementRef;

    @HostBinding('class') get typeClass() {
        return `file-upload-${this.type} file-upload-${this.multiple ? 'multiple' : 'single'}`;
    }

    /**
     * Inputs
     */
    @Input() multiple: boolean = false;
    @Input() images: any[] = [];

    @Input() type: string = 'file';

    // MdGridList
    @Input() gutterSize: string = "8px";
    @Input() cols: number = 4;
    @Input() rowHeight: any = '16:9';

    // form-related
    @Input() name: string = null;
    @Input() @BooleanFieldValue() required: boolean = false;
    @Input() id: string = `jpa-panel-${nextUniqueId++}`;
    @Input() step: number = null;
    @Input() tabIndex: number = null;

    /**
     * Outputs
     */
    @Output() fileAdded: EventEmitter<File[]> = new EventEmitter<File[]>();
    @Output() imageLoaded = new EventEmitter();
    @Output() imageAdded = new EventEmitter();
    @Output() imageRemoved = new EventEmitter();
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
        console.log('ImageUploadComponent#handleFocus', event);
    }

    /** @internal */
    handleBlur(event: FocusEvent) {
        console.log('ImageUploadComponent#handleBlur', event);
    }

    get value(): any { return this._value; };
    @Input() set value(v: any) {
        console.debug('ImageUploadComponent# set value(): ', {
            v: v,
            _value: this._value
        });

        if (v !== this._value) {
            this._value = v;

            console.warn('emitting change', v);
            this.change.emit(v);

            if (this.multiple) {
                let val = v.length === 0 ? '' : v;
                this._onChangeCallback(val);
            } else {
                this._onChangeCallback(v);
            }

            this._onTouchedCallback();
        }
    }

    ngAfterViewInit() {
        if (this.type === 'image' && !this.multiple && this.value) {
            console.debug('ImageUploadComponent | image - single #ngAfterViewInit().  Subscribing to image load...', {
                this: this,
                imageEl: this._currentImageEl.nativeElement
            });
            let imageEl = (<HTMLImageElement>this._currentImageEl.nativeElement);
            imageEl.addEventListener('load', (event: Event) => {
                console.debug('ImageUploadComponent | image - single #ngAfterViewInit().  Image loaded!', event);
                let val: ManagedImage = this.value;

                val.width = imageEl.naturalWidth;
                val.height = imageEl.naturalHeight;

                this.value = val;

                // this.imageLoaded.emit({ event: event, config: this.value });
                this.change.emit(this.value);
            });
        }
    }

    /**
     * ControlValueAccessor protocol
     *
     * Runs when value is first set
     */
    writeValue(value: any) {
        let m = this.multiple ? 'multiple' : 'single';
        console.debug('ImageUpload --- '+m+' -- #writeValue: ', { value: value });
        if (!this.multiple) {
            switch(this.type) {
                case 'image':
                    if (value) {
                        this._value = new ManagedImage(value, 0);

                        // let imageEl = (<HTMLImageElement>this._currentImageEl.nativeElement);

                        // this._value.watchForDimensions(imageEl);
                    } else {
                        this._value = '';
                    }
                    break;
                default:
                    this._value = value ? new ManagedFile(value, 0) : '';
                    break;
            }
        } else {
            let v = value || [];
            console.warn('about to run v.map ! ', v);
            this._value = v.map((item, i) => {
                switch(this.type) {
                    case 'image': return new ManagedImage(item, i);
                    default: return new ManagedFile(item, i);
                }
            });
        }
        console.debug('ImageUpload#writeValue: ', { value: this._value });
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
        console.debug('ImageUpload.handleClickedRemove', {
            e: e,
            value: this.value
        });

        let value = this.value.slice(0);
        value.splice(e.index, 1);
        this.value = value;

        this.imageRemoved.emit(e);
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
        console.log('ImageUploadComponent#fileDragStart', e);
        this._dragging = true;
    }

    onDragEnd(e: any) {
        console.debug('onDragEnd');
        this._stopEvent(e);
        this._dragging = false;
    }

    add(e: any) {
        if (this._dragging) {
            console.log('add cancelling because we are dragging image.');
            this._dragging = false;
            return;
        } else {
            console.log('add ', e);
            let files = e.target.files || e.dataTransfer.files;

            this._stopEvent(e);
            this.fileAdded.emit(files);

            this.isDragOver = false;
            this.isLoading = true;

            this.readFiles(files);
        }
        console.log('ImageUploadComponent#add', {
            e: e,
            this: this
        });
    }

    readFiles(files) {
        let count = this.value.slice(0).length;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            let image = new ImageUpload(file);
            let reader = new FileReader();

            this.isLoading = true;

            reader.addEventListener('load', e => {
                image.url = reader.result;
                this.addImageToGrid(image);
                this.isLoading = false;
            });

            setTimeout(() => { reader.readAsDataURL(file); });
        }
    }

    addImageToGrid(image) {
        console.log('Loaded new image: ', image);

        let value = this.value.slice(0);
        value.push(image);
        this.value = value;

        this.imageAdded.emit(image);
    }
    // private _dragData(image: JpFile, idx: number): JpFile {
    //     let img = Object.assign({}, image);
    //     img.idx = idx;
    //     return img;
    // }

    reorder(event: {dragData: number, mouseEvent: DragEvent}, new_index: number): void {
        let old_index = event.dragData;

        this._stopEvent(event.mouseEvent);

        console.info('ImageUploadComponent#reorder', {
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

    }
}
