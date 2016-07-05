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
    ViewChild,
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

import { GridImage, ImageUpload } from './grid-image/index';
import { JpImage } from '../../models/jp-image';

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
        DND_DIRECTIVES
    ],
    providers: [IMAGE_UPLOAD_VALUE_ACCESSOR]
})
export class ImageUploadComponent implements OnChanges, ControlValueAccessor {
    public isDragOver: boolean = false;
    public isLoading: boolean = false;

    private _imagesLoaded:number = 0;
    private _value: File[] = [];

    private _rows: any[] = [];
    private _cols: any[] = [];
    private _draggingImage: boolean = false;
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

    /**
     * Inputs
     */
    @Input() @BooleanFieldValue() multiple: boolean = false;
    @Input() images: any[] = [];

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

    /**
     * Lifecycle
     */
    constructor(authService: AuthService) { }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        console.debug('ImageUploadComponent#OnChanges ---', changes);
    }

    /**
     * Grid interaction events
     */
    onDragOver(e: any) {
        if (this._draggingImage) {
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
        if (this._draggingImage) {
            return;
        }

        this._stopEvent(e);
        this.isDragOver = false;
    }

    onFileDrop(e: any) {
        if (this._draggingImage) {
            console.log('onFileDrop cancelling because we are dragging image.');
            this._draggingImage = false;
            return;
        } else {
            console.log('onFileDrop ', e);
            let files = e.target.files || e.dataTransfer.files;

            this._stopEvent(e);
            this.fileAdded.emit(files);

            this.isDragOver = false;
            this.isLoading = true;

            this.readFiles(files);
        }
        console.log('ImageUploadComponent#FileDrop', {
            e: e,
            this: this
        });
    }

    readFiles(files) {
        let count = this.value.length;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            let image = new ImageUpload(file);
            let reader = new FileReader();
            let k = i;

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

        let value = this.value;
        value.push(image);
        this.value = value;

        this.imageAdded.emit(image);
    }

    /**
     * NgControl value
     */

     get value(): any { return this._value; };
     @Input() set value(v: any) {
         console.debug('ImageUploadComponent# set value(): ', {
             v: v,
             _value: this._value
         });
         if (v !== this._value) {
             this._value = v;
             console.warn('emitting change', v);
             //this.change.emit(v);
             this._onChangeCallback(v);
             //this.setCounts();
         }
     }

    /**
     * ControlValueAccessor implementation
     */
    writeValue(value: any) {
        this._value = value || [];
        console.debug('ImageUpload#writeValue: ', {value: this._value});
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

    handleImageLoaded(e: any) {
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

        let value = this.value;
        value.splice(e.index, 1);
        this.value = value;

        this.imageRemoved.emit(e);
    }

    /**
     * Drag and drop grid images to reorder
     */

    private _dragData(image: JpImage, idx: number): JpImage {
        return Object.assign(image, {idx: idx})
    }

    imageDragStart(e: any): void {
        this._dropZoneStart = e.dragData.idx;
        this._draggingImage = true;
        this._dragImage = e.dragData;
        console.debug('ImageUpload imageDragStart  from zone ' + this._dropZoneStart + ': ', e);
    }

    imageDropped(event: any, image: JpImage, zone: number): void {
        console.info('ImageUpload image dropped', {
            event: event,
            image: image,
            zone: zone
        });
        this._draggingImage = false;
        this._dragImage = null;

        let data = event.dragData;

        if (this._dropZoneStart !== zone) {
            this.moveImage(this._dropZoneStart, zone);
        }
    }

    onDragEnd(e: any) {
        console.debug('onDragEnd');
        this._draggingImage = false;
    }

    moveImage(old_index, new_index): void {
        let images = this.value;

        const source = images[old_index];
        const target = images[new_index];

        images[new_index] = source;
        images[old_index] = target;

        this.value = images;

        this.change.emit(this.value);

        console.log('Just dropped image from drop zone ' + this._dropZoneStart + ' to drop zone ' + new_index);
    };

    /**
     * Form reset
     */
    reset() {

    }
}
