import {
    Component,
    ContentChild,
    AfterContentInit,
    HostBinding,
    Output,
    EventEmitter,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';
import { PanelContentComponent } from './content/index';
import { PanelBarComponent } from './bar/index';

export interface PanelToggle {
    onToggle: EventEmitter<boolean>;
}

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2',
    templateUrl: './panel2.component.html',
    styleUrls: ['./panel2.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        PanelContentComponent
    ]
})
export class PanelComponent implements AfterContentInit, PanelToggle, OnDestroy {
    @ContentChild(PanelContentComponent) content : PanelContentComponent;
    @ContentChild(PanelBarComponent) bar : PanelBarComponent;

    @Output() onToggle = new EventEmitter<boolean>();

    @HostBinding('class.expanded') private get expandedClass() { return this.expanded; }
    @HostBinding('class.jpa-panel') private get jpapanelClass() { return true; }

    private _expanded: boolean = false;
    private _toggleSub: Subscription;

    constructor(public el: ElementRef) { }

    get expanded() { return this._expanded; }
    set expanded(v: boolean) {
        this._expanded = v;
        this.content.hidden = !v;
    }
    ngAfterContentInit() {
        this._toggleSub = this.bar.onToggle.subscribe(e => {
            this.expanded = !this.expanded;
            this.onToggle.emit(this.expanded);
        });
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe 
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy() {
        if (this._toggleSub) this._toggleSub.unsubscribe();
    }
}
