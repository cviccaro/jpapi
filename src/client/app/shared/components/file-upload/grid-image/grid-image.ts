import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MdIcon } from '@angular2-material/icon/icon';

import { JpFile } from '../../../index';

@Component({
    moduleId: module.id,
    selector: 'jpa-grid-image',
    templateUrl: './grid-image.html',
    styleUrls: ['./grid-image.css'],
    directives: [
        MdIcon
    ]
})
export class GridImageComponent implements OnInit, OnDestroy {
    public hovering = false;
    public _listener: any;

    @ViewChild('image') public _imageEl: ElementRef;

    @Input() imageConfig: JpFile;
    @Input() index: number;

    @Output() clickedRemove = new EventEmitter();
    @Output() imageLoaded = new EventEmitter();

    @HostListener('mouseenter')
    onMouseEnter(e) {
        this.hovering = true;
    }
    @HostListener('mouseleave')
    onMouseLeave(e) {
        this.hovering = false;
    }

    /**
     * Handle remove button being clicked
     */
    remove(): void {
        this.clickedRemove.emit({ config: this.imageConfig, index: this.index });
    }

    /**
     * Initialize the directive/component after Angular initializes
     * the data-bound input properties.
     */
    ngOnInit(): void {
        this._imageEl.nativeElement.src = this.imageConfig.url;

        this._listener = (<HTMLImageElement>this._imageEl.nativeElement).addEventListener('load', e => {
            this.imageLoaded.emit({event: e, config: this.imageConfig});
        });
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        if (this._listener) (<HTMLImageElement>this._imageEl.nativeElement).removeEventListener('load', this._listener);
    }
}
