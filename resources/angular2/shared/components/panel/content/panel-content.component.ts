import { Component, Input, OnInit, AfterContentInit, AfterViewInit, ElementRef, ContentChild } from '@angular/core';
import { MdGridList } from '@angular2-material/grid-list';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.css'],
    directives: [MdGridList]
})
export class JpaPanelContent implements OnInit, AfterViewInit {
    private _hasImage: boolean = false;
    private imageExtension: string = '';

    constructor(public el: ElementRef) {}

    @Input() image: string = null;
    @Input() align: string = 'right';

    @ContentChild(MdGridList) private _gridList: MdGridList;

    ngOnInit() {
        if (this.image !== null && this.image !== undefined) this._hasImage = true;
    }
    ngAfterContentInit() {
        if (this._hasImage) {
            this.imageExtension = 'image/' + this.image.split('.').pop();
        }

        if (this.el.nativeElement.classList.contains('bottom')) {
            this.align = 'bottom';
        }
    }
    ngAfterViewInit() {
        //console.debug('PanelContent view initialized.', this);

        // if (this._gridList) {
        //     console.log('CHECK OUT OUR SWEET LAYOUT TILES FUNCTION: ' , this._gridList['_layoutTiles']);
        //     this._gridList['_layoutTiles']();
        // }
    }

    onToggle(expanded: boolean) {
        //console.log('PanelContentChild just saw its parent toggle ', expanded);
        // if (expanded) {
        //     if (this._gridList) {
        //         console.log(this._gridList);
        //         setTimeout(() => { this._gridList['_layoutTiles']() }, 1000);
        //     }
        // }
    }
}
