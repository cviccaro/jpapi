import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PanelFormControl, PanelFormControlSummary } from '../index';
import { LoggerService } from '../../../../services/index';
import { ManagedImage, RegistersSubscribers } from '../../../../models/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-form-control-summary',
    templateUrl: './summary.component.html',
    styleUrls: [ './summary.component.css' ]
})
export class PanelFormControlSummaryComponent implements OnInit, OnChanges, OnDestroy, RegistersSubscribers {
    @Input() control: PanelFormControl<any>;
    @Input() expanded: boolean;

    get summary() {
        return this._summary;
    }

    _subscriptions: Subscription[] = [];
    private _summary: PanelFormControlSummary;

    constructor(private log: LoggerService) { }

    /**
     * Ask the control to update it's summary
     * @param {boolean} expanded
     */
    updateSummary(expanded?: boolean): void {
        expanded = expanded === undefined ? this.expanded : expanded;
        this._summary = this.control.summary(expanded);
    }

    /**
     * Subscribe to control's summary observable and
     * image loaded observable (if image control)
     */
    ngOnInit(): void {
        // Subscribe to control's observable summary source
        this.registerSubscriber(
            this.control.summary$.distinctUntilChanged().subscribe(summary => this._summary = summary)
        );

        if (this.control.controlType === 'file' && (<any>this.control)['type'] === 'image' && this.control.value) {
            this.registerSubscriber(
                (<ManagedImage>this.control.value).imageLoaded.subscribe(() => this.updateSummary())
            );
        }
    }

    /**
     * Implements RegistersSubscribers
     */
    registerSubscriber(sub: Subscription): void {
        this._subscriptions.push(sub);
    }

    /**
     * Ask the control to update it's summary if the
     * parent pane's expanded property changes
     *
     * @param {SimpleChanges} changes [description]
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('expanded')) this.updateSummary(changes['expanded'].currentValue);
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
