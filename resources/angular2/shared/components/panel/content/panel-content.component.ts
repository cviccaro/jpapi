import {
    Component,
    Input,
    OnInit,
    AfterContentInit,
    AfterViewInit,
    ElementRef,
    ContentChild,
    HostBinding,
    SimpleChanges,
    SimpleChange
} from '@angular/core';
import { MdGridList } from '@angular2-material/grid-list';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.css'],
    directives: [MdGridList]
})
export class JpaPanelContent implements AfterContentInit, AfterViewInit {
    private _hasImage: boolean = false;
    private imageExtension: string = '';

    constructor(public el: ElementRef) { }

    @Input() file: File = null;
    @Input() image: string = null;
    @Input() align: string = 'right';

    @HostBinding('class.left') get ifLeftClass() { return this.align === 'left'; }
    @HostBinding('class.right') get ifRightClass() { return this.align === 'right'; }
    @HostBinding('class.bottom') get ifBottomClass() { return this.align === 'bottom'; }

    @ContentChild(MdGridList) private _gridList: MdGridList;

    ngAfterContentInit() {
        if (this.image) {
            this._hasImage = true;
            this.imageExtension = 'image/' + this.image.split('.').pop();
        }
        console.log('PanelContent (' + this.align + ') Content Initialized: ', { this: this });
    }

    ngAfterViewInit() {
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

    ngOnChanges(changes: SimpleChanges) {
        console.log('PanelContent (' + this.align + ') changed: ', { changes: changes });
    }
}
