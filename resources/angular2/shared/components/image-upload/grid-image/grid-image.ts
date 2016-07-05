import { Component, Input, Output, AfterViewInit, ViewChild, ElementRef, EventEmitter, HostListener } from '@angular/core';
import {MdIcon} from '@angular2-material/icon';

import {JpImage} from '../../../index';

@Component({
    moduleId: module.id,
    selector: 'jpa-grid-image',
    templateUrl: './grid-image.html',
    styleUrls: ['./grid-image.css'],
    directives: [
        MdIcon
    ]
})
export class GridImage {
    public hovering = false;

    @ViewChild('image') public _imageEl: ElementRef;

    @Input() imageConfig: JpImage;
    @Input() index: number;

    @Output() clickedRemove = new EventEmitter();
    @Output() imageLoaded = new EventEmitter();

    @HostListener('mouseenter', ['$event.target'])
    onMouseEnter(e) {
        this.hovering = true;
    }
    @HostListener('mouseleave', ['$event.target'])
    onMouseLeave(e) {
        this.hovering = false;
    }

    ngOnInit() {
        this._imageEl.nativeElement.src = this.imageConfig.url;

        (<HTMLImageElement>this._imageEl.nativeElement).addEventListener('load', e => {
            //console.log('GridImage Loaded.', this);
            this.imageLoaded.emit({event: e, config: this.imageConfig});
        });
    }

    remove() {
        this.clickedRemove.emit({ config: this.imageConfig, index: this.index });
    }
}
