import { Component, Input, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.css']
})
export class JpaPanelContent implements OnInit, AfterViewInit {
    private _hasImage: boolean = false;
    private imageExtension: string = '';

    @Input() image: string = null;

    ngOnInit() {
        console.log('NgOnInit PanelContent!!!!');
        if (this.image !== null && this.image !== undefined) this._hasImage = true;
    }
    ngAfterContentInit() {
        if (this._hasImage) {
            this.imageExtension = 'image/' + this.image.split('.').pop();
        }
    }
    ngAfterViewInit() {
        console.debug('PanelContent view initialized.', this);
    }
}
