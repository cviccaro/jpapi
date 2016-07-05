import {
    Component,
    Input,
    OnInit,
    AfterContentInit,
    AfterViewInit,
    ElementRef,
    ContentChild,
    ViewChild,
    HostBinding,
    SimpleChanges,
    SimpleChange
} from '@angular/core';
import { MdGridList } from '@angular2-material/grid-list';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

import { JpImage, ImageUpload, JpaPanelChild }  from '../../../index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.css'],
    directives: [MdGridList, MD_ICON_DIRECTIVES]
})
export class JpaPanelContent implements AfterContentInit, AfterViewInit, JpaPanelChild {
    private _hasImage: boolean = false;
    private _imageUrl: any = '';
    private loading: boolean = false;

    imageEl: HTMLImageElement;
    imageWidth: number;
    imageHeight: number;

    constructor(public el: ElementRef) { }

    @Input() file: File = null;
    @Input() image: JpImage = null;
    @Input() align: string = 'right';
    @Input() label: string = '';

    @HostBinding('class.left') get ifLeftClass() { return this.align === 'left'; }
    @HostBinding('class.right') get ifRightClass() { return this.align === 'right'; }
    @HostBinding('class.bottom') get ifBottomClass() { return this.align === 'bottom'; }

    @ContentChild(MdGridList) private _gridList: MdGridList;
    @ViewChild('img') private _imageEl: ElementRef;

    ngAfterContentInit(): void {
        this._hasImage = !!this.image;

        if (this._hasImage) {
            this._imageUrl = this.image.url;
            this.loading = true;
        }

        console.info('PanelContent (' + this.align + ') Content Initialized: ', { this: this });
    }

    ngAfterViewInit(): void {
        this.imageEl = this._imageEl.nativeElement
        this.imageEl.addEventListener('load', () => this.onImgLoad());

        console.info('PanelContent (' + this.align + ') View Initialized: ', { this: this });
        // if (this._gridList) {
        //     console.log('CHECK OUT OUR SWEET LAYOUT TILES FUNCTION: ' , this._gridList['_layoutTiles']);
        //     this._gridList['_layoutTiles']();
        // }
    }

    onToggle(expanded: boolean): void {
        //console.log('PanelContentChild just saw its parent toggle ', expanded);
        // if (expanded) {
        //     if (this._gridList) {
        //         console.log(this._gridList);
        //         setTimeout(() => { this._gridList['_layoutTiles']() }, 1000);
        //     }
        // }
    }

    onImgLoad() {
        console.debug(this.align + ' image loaded!', {image: this.image});
        this.loading = false;
        this.imageWidth = this.imageEl.naturalWidth;
        this.imageHeight = this.imageEl.naturalHeight;
        this.imageEl.removeEventListener('load', this.onImgLoad);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.debug('PanelContent (' + this.align + ') changed: ', { changes: changes });
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
