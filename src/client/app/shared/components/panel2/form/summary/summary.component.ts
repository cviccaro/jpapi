import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../../../../libs/angular2-material';
import { Subscription } from 'rxjs/Subscription';
import { PanelFormControl, PanelFormControlSummary } from '../control';
import { LoggerService } from '../../../../services/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-form-control-summary',
    templateUrl: './summary.component.html',
    directives: [ MATERIAL_DIRECTIVES ]
})
export class PanelFormControlSummaryComponent implements OnInit, OnChanges, OnDestroy {
    @Input() control: PanelFormControl<any>;
    @Input() expanded: boolean;

    get summary() {
        return this._summary;
    }

    private _summarySub: Subscription;
    private _summary: PanelFormControlSummary;

    constructor(private log: LoggerService) { }

    updateSummary(expanded?: boolean): void {
        expanded = expanded === undefined ? this.expanded : expanded;
        this._summary = this.control.summary(expanded);
    }

    /**
     * Initialize the directive/component after Angular initializes 
     * the data-bound input properties.
     */
    ngOnInit(): void {
        // Subscribe to control's observable summary source
        this._summarySub = this.control.summary$.debounceTime(500).subscribe(summary => {
            this._summary = summary;
        });

        // Get the initial summary
        this.updateSummary();
    }

    /**
     * Request the summary be determined again, which will 
     * push to the summary$ observable on the control
     * 
     * @param {SimpleChanges} changes [description]
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('expanded')) this.updateSummary(changes['expanded'].currentValue);
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe 
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy() {
        if (this._summarySub) this._summarySub.unsubscribe();
    }
}
