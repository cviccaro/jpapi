import {
    Component,
    ContentChildren,
    ViewChildren,
    Output,
    EventEmitter,
    ElementRef,
    AfterContentInit,
    AfterViewInit,
    QueryList,
    HostListener
} from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-bar-title',
    template: '<ng-content></ng-content>'
})
export class PanelBarTitleComponent implements AfterViewInit {
    @Output() onClick = new EventEmitter();

    @HostListener('click', ['$event'])
    _onClick(evt: Event) {
        this.onClick.emit(evt);
    }
    ngAfterViewInit() {
        console.log('PanelBarTitle View Initialized', this);
    }
}

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-bar-subtitle',
    template: '<ng-content></ng-content>'
})
export class PanelBarSubtitleComponent extends PanelBarTitleComponent { }

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-bar',
    templateUrl: './panel-bar.component.html',
    styleUrls: ['./panel-bar.component.css'],
    directives: [ MATERIAL_DIRECTIVES, PanelBarTitleComponent, PanelBarSubtitleComponent ]
})
export class PanelBarComponent implements AfterContentInit, AfterViewInit {
    @Output() onToggle = new EventEmitter();

    @ContentChildren(PanelBarTitleComponent) titleCmps : QueryList<PanelBarTitleComponent>;
    @ContentChildren(PanelBarSubtitleComponent) subTitleCmps : QueryList<PanelBarSubtitleComponent>;

    ngAfterContentInit() {
        let titles = this.titleCmps.toArray().concat(this.subTitleCmps.toArray());
        titles.forEach(titleCmp => {
            titleCmp.onClick.subscribe(evt => {
                this.toggle(evt);
            });
        })
        console.log('PanelBarComponent Content Initialized ', this);
    }

    ngAfterViewInit() {
        console.log('PanelBarComponent View Initialized ', this);
    }

    toggle(evt: Event) {
        console.log('PanelBarComponent toggle ', evt);
        evt.preventDefault();
        evt.stopPropagation();
        this.onToggle.emit(evt);
    }
}