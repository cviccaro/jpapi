import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
@Component({
    moduleId: module.id,
    selector: 'jpa-panel-summary-image',
    templateUrl: './summary-image.component.html',
    styleUrls: ['./summary-image.component.css'],
    directives: [ MD_ICON_DIRECTIVES ]
})
export class PanelSummaryImage implements OnInit, AfterViewInit {
    loaded = false;

    imageHeight: number;
    imageWidth: number;
    imageName: string;
    url: string;

    @Input() image : any;

    @ViewChild('preview') _preview : ElementRef;

    ngOnInit() {
        this.url = this.image.url;
    }

    ngAfterViewInit() {
        //console.info('PanelSummaryImage AfterViewInit. ', this);

        let img = (<HTMLImageElement>this._preview.nativeElement);

        img.addEventListener('load', e => {
            this.loaded = true;
            this.imageHeight = img.naturalHeight;
            this.imageWidth = img.naturalWidth;

            const parts = img.currentSrc.split('/');
            this.imageName = parts[parts.length - 1];
        });
    }
}
