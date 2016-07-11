import {
    Component,
    Input,
    Output,
    EventEmitter,
    AfterContentInit,
    AfterViewInit,
    ElementRef,
    ContentChild,
    ViewChild,
    HostBinding,
    SimpleChanges,
    SimpleChange
} from '@angular/core';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { MATERIAL_DIRECTIVES } from '../../../../shared/libs/angular2-material';

import {
    JpFile,
    ImageUpload,
    JpaPanelChild,
    JpaModal
} from '../../../index';
import { ChipComponent } from '../../chip/chip.component';
import { CONTEXT_MENU_DIRECTIVES, JpaContextMenu } from '../../context-menu/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.css'],
    directives: [MATERIAL_DIRECTIVES, DND_DIRECTIVES, ChipComponent, CONTEXT_MENU_DIRECTIVES]
})
export class JpaPanelContent implements AfterContentInit, AfterViewInit, JpaPanelChild {
    constructor(public el: ElementRef, public menu: JpaContextMenu) { }

    private _hasImage: boolean = false;
    private _imageUrl: any = '';
    private loading: boolean = false;

    hasOptions: boolean = false;

    imageEl: HTMLImageElement;
    imageWidth: number;
    imageHeight: number;

    @Input() file: File = null;
    @Input() image: JpFile = null;
    @Input() align: string = 'right';
    @Input() label: string = '';
    @Input() options: any[] = [];

    @Output() onRemoveImage = new EventEmitter();

    @HostBinding('class.left') get ifLeftClass() { return this.align === 'left'; }
    @HostBinding('class.right') get ifRightClass() { return this.align === 'right'; }
    @HostBinding('class.bottom') get ifBottomClass() { return this.align === 'bottom'; }

    @ViewChild('img') private _imageEl: ElementRef;

    ngAfterContentInit(): void {
        this._hasImage = !!this.image;

        this.hasOptions = !!this.options.length;

        if (this._hasImage) {
            this._imageUrl = this.image.url;
            this.loading = true;
        }

        //console.info('PanelContent (' + this.align + ') Content Initialized: ', { this: this });
    }

    ngAfterViewInit(): void {
        this.imageEl = this._imageEl.nativeElement
        this.imageEl.addEventListener('load', () => this.onImgLoad());

        //console.info('PanelContent (' + this.align + ') View Initialized: ', { this: this });
    }

    onToggle(expanded: boolean): void {
        ////console.log('PanelContentChild just saw its parent toggle ', expanded);
    }

    addToMultiSelect(e) {
        e.preventDefault();
        e.stopPropagation();

        //console.log('AddToMultiSelect', this);
    }

    removeImage(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('removeImage', this);

        this._hasImage = false;
        this.image = null;
        // this._imageUrl = undefined;

        this.menu.close();
        this.onRemoveImage.emit(e);
    }

    onImgLoad() {
        ////console.debug(this.align + ' image loaded!', {image: this.image});
        this.loading = false;
        this.imageWidth = this.imageEl.naturalWidth;
        this.imageHeight = this.imageEl.naturalHeight;
        this.imageEl.removeEventListener('load', this.onImgLoad);
    }

    ngOnChanges(changes: SimpleChanges): void {
        ////console.debug('PanelContent (' + this.align + ') changed: ', { changes: changes });
        for (let prop in changes) {
            let previousValue = changes[prop].previousValue;
            let currentValue = changes[prop].currentValue;
            let isFirstChange = changes[prop].isFirstChange();

            switch(prop) {
                case 'image':
                    // File upload that changes the "current" image
                    if (currentValue) {
                        this._imageUrl = this.image.url;
                        this._hasImage = true;
                    } else {
                        this._imageUrl = '';
                        this._hasImage = false;
                    }
                    break;
                case 'file':
                    // File upload preview
                    if (currentValue) {
                        let file = currentValue;

                        this.image = new ImageUpload(file);

                        this.loading = true;

                        this.image.load()
                            .subscribe(dataUrl => {
                                this._imageUrl = dataUrl;
                                this._hasImage = true;
                            });
                    } else {
                        this._imageUrl = '';
                        this._hasImage = false;
                    }
                    break;
            }
        }
    }
}
