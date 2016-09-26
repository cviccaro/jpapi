import {
    Component,
    ContentChildren,
    Output,
    EventEmitter,
    QueryList,
    AfterContentInit,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RegistersSubscribers } from '../../../index';
import { PanelBarTitleComponent, PanelBarSubtitleComponent } from './panel-bar-title.component';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-bar',
    templateUrl: './panel-bar.component.html',
    styleUrls: ['./panel-bar.component.css']
})
export class PanelBarComponent implements AfterContentInit, OnDestroy, RegistersSubscribers {
    public _subscriptions: Subscription[] = [];

    @Output() onToggle = new EventEmitter();

    @ContentChildren(PanelBarTitleComponent) titleCmps : QueryList<PanelBarTitleComponent>;
    @ContentChildren(PanelBarSubtitleComponent) subTitleCmps : QueryList<PanelBarSubtitleComponent>;

    /**
     * After Angular checks the bindings of the external content that it projected into its view
     */
    ngAfterContentInit(): void {
        let titles = this.titleCmps.toArray().concat(this.subTitleCmps.toArray());

        titles.forEach(titleCmp => {
            let sub = titleCmp.onClick.subscribe(evt => {
                this.toggle(evt);
            });

            this._subscriptions.push(sub);
        });
    }

    /**
     * Toggle the panel
     * @param {Event} evt
     */
    toggle(evt: Event): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.onToggle.emit(evt);
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
    }
}
