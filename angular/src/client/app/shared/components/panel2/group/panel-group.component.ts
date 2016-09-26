import {
    Component,
    AfterContentInit,
    ContentChildren,
    QueryList,
    HostBinding,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PanelComponent } from '../panel2.component';
import { RegistersSubscribers } from '../../../index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-group',
    template: '<ng-content></ng-content>',
    styleUrls: ['./panel-group.component.css']
})
export class PanelGroupComponent implements AfterContentInit, OnDestroy, RegistersSubscribers {
    public childExpanded: boolean = false;
    public _subscriptions: Subscription[] = [];

    @HostBinding('class.child-expanded') get expandedClass() { return this.childExpanded; }

    @ContentChildren(PanelComponent) private _panelChildren : QueryList<PanelComponent>;

    ngAfterContentInit() {
        this._panelChildren.forEach(panel => {
            let sub = panel.onToggle.subscribe((expanded: boolean) => {
                this.childExpanded = !!this._panelChildren.filter(panel => panel.expanded).length;
            });
            this._subscriptions.push(sub);
        });
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
