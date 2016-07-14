import {
    Component,
    ContentChildren,
    ViewChildren,
    Output,
    EventEmitter,
    QueryList,
    AfterContentInit,
    HostListener,
    OnDestroy
} from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';
import { Subscription } from 'rxjs/Subscription';

import { PanelBarTitleComponent, PanelBarSubtitleComponent } from './panel-bar-title.component';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-bar',
    templateUrl: './panel-bar.component.html',
    styleUrls: ['./panel-bar.component.css'],
    directives: [ MATERIAL_DIRECTIVES, PanelBarTitleComponent, PanelBarSubtitleComponent ]
})
export class PanelBarComponent implements AfterContentInit, OnDestroy {
    private _subscriptions: Subscription[] = [];

    @Output() onToggle = new EventEmitter();

    @ContentChildren(PanelBarTitleComponent) titleCmps : QueryList<PanelBarTitleComponent>;
    @ContentChildren(PanelBarSubtitleComponent) subTitleCmps : QueryList<PanelBarSubtitleComponent>;

    ngAfterContentInit() {
        let titles = this.titleCmps.toArray().concat(this.subTitleCmps.toArray());

        titles.forEach(titleCmp => {
            let sub = titleCmp.onClick.subscribe(evt => {
                this.toggle(evt);
            });

            this._subscriptions.push(sub);
        })
    }

    toggle(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();
        this.onToggle.emit(evt);
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy() {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
    }
}