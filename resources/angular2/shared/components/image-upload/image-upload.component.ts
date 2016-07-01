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

import { GridImage } from './grid-image/grid-image';
import { ImageItem } from './uploader/index';
import { DragDropAbstractComponent, ImageUploadDropZones, Droppable, Draggable, DragDropService} from '../dragdrop/index';

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
        Draggable,
        Droppable,
        ImageUploadDropZones
    ],
    providers: [IMAGE_UPLOAD_VALUE_ACCESSOR, DragDropService]
})
export class ImageUploadComponent implements AfterViewInit, OnChanges, ControlValueAccessor {
    public isDragOver: boolean = false;
    public isLoading: boolean = false;

    private _count: number = 0;
    private _empty: boolean = false;
    private _added: number = 0;
    private _imagesLoaded:number = 0;
    private _value: File[] = [];

    private _nextWeight = 0;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    //public uploader: FileUploader;

    constructor(
    //    uploader: FileUploader,
        authService: AuthService
    ) {
        // this.uploader = uploader;
        // this.uploader.setAuthToken(authService.getToken());
    }

    /**
     * Content directives
     */
    @ViewChildren(GridImage) private _gridImages: QueryList<GridImage>;
    @ViewChild(MdGridList) private _gridList: MdGridList;

    /**
     * Inputs
     */
    @Input() url: string;
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

    ngOnInit() {
        if (this.images === undefined) {
            this.images = [];
        }

        // this.uploader.setUrl(this.url);
        this.isLoading = this._empty = !!this.images.length;
        this._count = this.images.length;

        this.images.forEach(image => {
            if (image.weight >= this._nextWeight) {
                this._nextWeight = image.weight + 5;
            }
        });

        //console.log('ImageUploadComponent.OnInit', this);
    }

    ngAfterViewInit() {
        if (this._gridImages) {
           // console.log('got grid images: ', this._gridImages);
            this._gridImages.changes.subscribe( (changes: QueryList<GridImage>) => {
                console.log('Changes to grid images: ', changes);
            });
        }

        if (this._gridList) {
            this._gridList['_tiles'].forEach((tile, i) => { this.registerTileDrag(this, tile, i)  });
        }

        console.info('ImageUploadComponent#AfterViewInit ---', this);
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        console.debug('ImageUploadComponent#OnChanges ---', changes);
    }


    registerTileDrag(thisArg, tile, i) {
        console.log('MdGridtile register Tile drag on tile ' + i + ' ', tile);

        tile.dragging = false;
        let cols = thisArg['cols']-1;

        let el = (<HTMLElement>tile['_element']['nativeElement']);
        el.addEventListener('mousedown', e => {
            tile.dragging = true;
            tile.cursor_default = el.style.cursor;
            tile.start = {
                mouse: {x: e.clientX, y: e.clientY},
                size: {w: el.clientWidth, h: el.clientHeight},
                zIndex: el.style.zIndex
            };
            el.style.cursor = 'move';
            el.style.zIndex = '9999';
            console.log('Grid Tile on mouse down ', e);
        });
        el.addEventListener('mouseup', e => {
            tile.dragging = false;
            el.style.transform = '';
            el.style.cursor = tile.cursor_default;
            console.log('Grid Tile on mouse up ', e);
        });
        el.addEventListener('mousemove', e => {
            if (tile.dragging) {
                
                let posX = e.clientX;
                let posY = e.clientY;

                let diffX = tile.start.mouse.x - e.clientX;
                let diffY = tile.start.mouse.y - e.clientY;

                let thresholdX = tile.start.size.w * 0.9;
                let thresholdY = tile.start.size.h * 0.9;

                if (Math.abs(diffX) > thresholdX) {
                    let direction = diffX > 0 ? 'left' : 'right';
                    console.log({
                        i: i,
                        'cols-1': cols
                    })
                    if (direction === 'right' && (i % cols === 0)) {
                        console.log('ignoring right-hand swap because we are on the last column');
                    } else if (direction === 'left' && (i % cols === 0)) {
                        console.log('ignoring right-hand swap because we are on the first column');
                    } else {
                        // tile.dragging = false;
                        // el.dispatchEvent(new Event('mouseup'));
                        // el.style.transform = 'translate3d(0,0,0)';
                        // console.log('TRANFORM: ', el.style.transform);
                        // el.style.cursor = tile.cursor_default;
                        // el.style.zIndex = tile.start.zIndex;
                        console.log('passed horizontal threshold', {diff: {x: diffX, y: diffY}, threshold: {x: thresholdX, y: thresholdY}, direction: direction})

                        let nextIndex = direction === 'right' ? i + 1 : i - 1;
                        let nextWeight = thisArg['images'][nextIndex]['weight'];
                        let oldWeight = thisArg['images'][i]['weight'];

                        thisArg['images'][i]['weight'] = nextWeight;
                        thisArg['images'][nextIndex]['weight'] = oldWeight;

                        setTimeout(() => { thisArg['sortImages']() },0);
                    }
                }
                if (Math.abs(diffY) > thresholdY) {
                    console.log('Passed vertical threshold ', {diffX: diffY, threshold: thresholdY});
                }

                console.log('tile ' + i + ' moved ', {
                    diffX: diffX,
                    diffY: diffY,
                    el: el,
                    threshold: {
                        w: thresholdX,
                        h: thresholdY
                    }
                });

                el.style.transform = `translate3d(${-diffX}px, ${-diffY}px, 0)`;

            }
        });
    }

    sortImages() {
        console.log('sorting images', this.images);
        this.images.sort((a:any,b: any) => {
            return a.weight > b.weight ? 1 : 0;
        });
        this._gridList['_tiles'].forEach((tile, i) => {
            let el = (<HTMLElement>tile['_element']['nativeElement']);
            el.style.transform = 'translate3d(0,0,0)';
        });
        console.log('sorted images', this.images);
    }
    weightChanged(e) {
        console.warn('weight cahnged', e);
    }

    /**
     * Grid interaction events
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

        let count = this.value.length;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            let value = this.value;
            value.push(file);

            this.value = value;

            let image = new ImageItem(file);

            //this.uploader.addToQueue([image]);

            let reader = new FileReader();
            let k = i;

            this.isLoading = true;
            reader.addEventListener('load', e => {
                file._weight = this._nextWeight;
                this._nextWeight = this._nextWeight + 5;
                let newImage = {
                    id: 'upload_' + i,
                    name: file.name,
                    image_url: reader.result,
                    isNew: true,
                    _file: file,
                    weight: file._weight
                };
                this.addImageToGrid(newImage);
            });

            setTimeout(() => { reader.readAsDataURL(file); });
        }

        console.log('ImageUploadComponent#FileDrop', {
            e: e,
            this: this
        });
    }

    public addImageToGrid(image) {
        console.log('Loaded new image: ', image);

        this.images.push(image);

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
         if (v.length !== this._added) {
             this._added++;
             this._value = v;
             console.warn('emitting change', v);
             this.change.emit(v);
             this._onChangeCallback(v);
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

        if (e.config.isNew) {
            console.debug('ImageUpload.handleImageLoaded NEW', {
                e: e,
                value: this.value
            });
            this.isLoading = false;

            e._hasNew = true;
        } else {
            let id = e.config.id;

            if (++this._imagesLoaded === this.images.length) {
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
        this.images.splice(e.index, 1);

        if (this.value && this.value.length) {
            console.log('Searching through value to remove', this.value);
            let idx = this.value.indexOf(e.config._file);
            console.log('indexOf result', {idx: idx});
            if (idx !== -1) {
                this.value = this._value.splice(idx, 1);
            }
        }
        this.imageRemoved.emit(e);
    }

    // handleFileRemove(e: any) {
    //     console.debug('ImageUpload.handleFileRemove', {
    //         e: e,
    //         value: this.value
    //     });
    // }
}
