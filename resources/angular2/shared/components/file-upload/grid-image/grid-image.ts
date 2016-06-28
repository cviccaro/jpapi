import { Component, Input, Output, AfterViewInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'jpa-grid-image',
    template: '<img #image class="grid-image" [src]="imageConfig.image_url" [alt]="imageConfig.alt" [title]="imageConfig.title" [class.new]="imageConfig.isNew" />',
    styleUrls: ['./grid-image.css']
})
export class GridImage {
    // @Input() progress: any;
    // @Input() imageId: any;
    // @Input() src: any;
    // @Input() imageData: any;
    // @Input() alt: any;
    // @Input() title: any;

    @Input() imageConfig: {
        id?: any,
        isNew?: boolean,
        alt?: string,
        title?: string,
        image_url: string
    }

    @Output() imageLoaded = new EventEmitter();

    @ViewChild('image') public _imageEl: ElementRef;

    ngOnInit() {
        (<HTMLImageElement>this._imageEl.nativeElement).addEventListener('load', e => {
            console.log('GridImage Loaded.');
            this.imageLoaded.emit({event: e, config: this.imageConfig});
        });
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
