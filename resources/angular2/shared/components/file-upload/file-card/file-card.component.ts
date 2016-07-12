import {
    Component,
    Directive,
    Input,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    EventEmitter,
    Output,
    HostBinding,
    HostListener,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FromUnixPipe, DateFormatPipe } from 'angular2-moment';
import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';
import { ManagedFile, ManagedImage } from '../../../models/jp-file';
import { FileIconComponent } from '../file-icon/index';

@Directive({
    selector: '[jpa-action-delegate]',
})
export class ActionDelegate {
    constructor(public el: ElementRef) { }

    @Output() clicked = new EventEmitter();
    @Output() hover = new EventEmitter();
    @Output() hoverOut = new EventEmitter();

    @HostListener('click')
    onClick(e: Event) {
        this.clicked.emit(e);
    }
    @HostListener('mouseenter')
    onMouseEnter(e: Event) {
        this.hover.emit(e);
    }

    @HostListener('mouseleave')
    onMouseLeaver(e: Event) {
        this.hoverOut.emit(e);
    }
}

@Component({
    moduleId: module.id,
    selector: 'jpa-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: [ './file-card.component.css' ],
    directives: [ MATERIAL_DIRECTIVES, FileIconComponent, ActionDelegate ],
    pipes: [ DateFormatPipe ]
})
export class FileCardComponent implements OnInit, AfterViewInit, OnDestroy {
    public hovering = false;

    private hoverSub: Subscription;
    private hoverOutSub: Subscription;

    @Input() file: ManagedFile|ManagedImage
    @Input() actions: boolean = true;

    @Output() clickedRemove = new EventEmitter();

    @ViewChild(ActionDelegate) actionDelegate : ActionDelegate;

    @HostBinding('class.actions-hovering') get actionsHoveringClass() { return this.hovering; }

    remove(e: Event) {
        this.clickedRemove.emit(e);
    }

    ngOnInit() {
        // if ( !(this.file instanceof ManagedFile) && !(this.file instanceof ManagedImage) ) {

        // }
        console.log('FileCardComponent initialized', this);
    }

    ngAfterViewInit() {
        console.log('FileCardComponent VIEW initialized', this);

        if (this.actionDelegate) {
            this.hoverSub = this.actionDelegate.hover.subscribe(e => this.hovering = true);
            this.hoverOutSub = this.actionDelegate.hoverOut.subscribe(e => this.hovering = false);
        }
    }

    ngOnDestroy() {
        if (this.hoverSub) this.hoverSub.unsubscribe();
        if (this.hoverOutSub) this.hoverOutSub.unsubscribe();
    }
}
