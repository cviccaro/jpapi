import { Component, Input, Output, AfterViewInit, ViewChild, ElementRef, EventEmitter, HostListener } from '@angular/core';

import {MdIcon} from '@angular2-material/icon';

@Component({
    moduleId: module.id,
    selector: 'jpa-grid-image',
    template: '<div class="shade"><span class="remove" [hidden]="!hovering" (click)="remove()"><md-icon>delete_forever</md-icon></span></div><img #image class="grid-image" [src]="imageConfig.image_url" [alt]="imageConfig.alt" [title]="imageConfig.title" [class.new]="imageConfig.isNew" />',
    styleUrls: ['./grid-image.css'],
    directives: [
        MdIcon
    ]
})
export class GridImage {
    public hovering = false;

    // @Input() progress: any;
    // @Input() imageId: any;
    // @Input() src: any;
    // @Input() imageData: any;
    // @Input() alt: any;
    // @Input() title: any;
    // 
    @Output() imageRemoved = new EventEmitter();

    @Input() imageConfig: {
        id?: any,
        isNew?: boolean,
        alt?: string,
        title?: string,
        image_url: string
    }
    @Input() index: number;

    @HostListener('mouseenter', ['$event.target'])
    onMouseEnter(e) {
        this.hovering = true;
    }
    @HostListener('mouseleave', ['$event.target'])
    onMouseLeave(e) {
        this.hovering = false;
    }

    @Output() imageLoaded = new EventEmitter();

    @ViewChild('image') public _imageEl: ElementRef;

    ngOnInit() {
        (<HTMLImageElement>this._imageEl.nativeElement).addEventListener('load', e => {
            console.log('GridImage Loaded.', this);
            this.imageLoaded.emit({event: e, config: this.imageConfig});
        });
    }

    remove() {
        this.imageRemoved.emit({ config: this.imageConfig, index: this.index });
    }
    // ngAfterViewInit() {
    //     console.info('GridImage# AfterViewInit', this);

    //     let xhr = new XMLHttpRequest();

    //     xhr.addEventListener('progress', e => {
    //         let pct = e.loaded / e.total;

    //         console.log(`Progress!! Loaded: ${e.loaded} Total: ${e.total} Pct: ${pct}`);
    //     });
    //     xhr.addEventListener('load', e => {
    //         console.log('Load!', e);
    //     });
    //     xhr.addEventListener('abort', e => {
    //         console.warn('ImageAbort!', e);
    //     });
    //     xhr.addEventListener('error', e => {
    //         console.error('ImageError!', e);
    //     });

    //     xhr.open('GET', this.url, true);
    //     xhr.overrideMimeType('text/plain; charset=x-user-defined');
    //     xhr.send(null);
    // }
}
