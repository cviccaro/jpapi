import {
    Input,
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    QueryList,
    ViewChildren,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';
import { NgControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CKEditorComponent } from 'ng2-ckeditor';

import { RegistersSubscribers } from '../../../index';
import { LoggerService } from '../../../services/logger.service';
import { PanelComponent } from '../panel2.component';
import { PanelFormControl } from './control/index';
import { PanelFormControlSummaryComponent } from './summary/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-form',
    templateUrl: './panel-form.component.html',
    styleUrls: ['./panel-form.component.css']
})
export class PanelFormComponent implements OnInit, AfterViewInit, OnDestroy, RegistersSubscribers {
    _subscriptions: Subscription[] = [];
    panelForm: FormGroup;
    ready: boolean = true;
    panelToggleStates: { [key: string] : boolean } = {};

    @Input() controls: PanelFormControl<any>[];
    @Input() model: any;
    @Input() formClass: string;
    @Input() saving: boolean = false;
    @Input() savingText: string = 'Saving...';
    @Input() submitText: string = 'Submit';

    @Output() formSubmit = new EventEmitter();

    @ViewChildren(PanelComponent) _panels: QueryList<PanelComponent>;
    @ViewChildren(PanelFormControlSummaryComponent) _summaries: QueryList<PanelFormControlSummaryComponent>;
    @ViewChildren(NgControl) _formControls: QueryList<NgControl>;
    @ViewChildren(CKEditorComponent) _ckEditors: QueryList<CKEditorComponent>;

    private _controlPanels: { [key: string]: { panel: PanelComponent, summary: PanelFormControlSummaryComponent } } = {};

    @HostListener('window:beforeunload', [ '$event'] )
    onBeforeUnload(e: BeforeUnloadEvent): string|void {
       if ( this.panelForm.dirty ) {
           let message = 'Are you sure?';

           e.returnValue = message;

           return message;
       }

        return void 0;
    }

    constructor(public builder: FormBuilder, private log: LoggerService) { }

    /**
     * Initialize the directive/component after Angular initializes
     * the data-bound input properties.
     */
    ngOnInit(): void {
        let group: {[key: string] : any} = {};

        this.formClass = 'panel-form' + (this.formClass ? ' ' + this.formClass : '');
        this.controls = this.controls.sort((a, b) => a.order - b.order);

        this.controls.forEach(control => {
            control.value = this.model[control.name];

            let validators: any[] = [];

            if (control.required) {
                validators.push(Validators.required);
            }

            if (Array.isArray(control.value) && control.value.length === 0) control.value = '';

            group[control.name] = [control.value, validators];

            this.panelToggleStates[control.name] = false;
        });

        this.panelForm = this.builder.group(group);

        this.log.debug('PanelFormComponent initialized.', this);
    }

    /**
     * After Angular creates the component's view(s).
     */
    ngAfterViewInit(): void {
        this.controls.forEach(control => {
            let panel = this.getPanel(control);

            let sub = panel.onToggle.subscribe((expanded: boolean) => {
                this.panelToggleStates[control.name] = expanded;
            });

            this.registerSubscriber(sub);

            let summary:PanelFormControlSummaryComponent[] = this._summaries.filter(cmp => cmp.control.name === control.name);

            this._controlPanels[control.name] = { panel: panel, summary: summary[0] };
        });

        if (this.controls.length !== this._formControls.length) {
            this.log.warn(`${this.controls.length} PanelFormControlsControls passed
                in but could only find ${this._formControls.length} ngFormControls`);
        }

        this._formControls.forEach(formControl => {
            let sub = formControl.valueChanges.debounceTime(250).subscribe(e => {

               let panel = this._controlPanels[formControl.name].panel;
               let summary = this._controlPanels[formControl.name].summary;

               summary.updateSummary(panel.expanded);

               let el: HTMLElement = panel.el.nativeElement;

                if (formControl.valid) {
                    el.classList.remove('ng-invalid');
                    el.classList.add('ng-valid');
                } else {
                    el.classList.add('ng-invalid');
                    el.classList.remove('ng-valid');
                }

                if (formControl.dirty) {
                    el.classList.remove('ng-pristine');
                    el.classList.add('ng-dirty');
                } else {
                    el.classList.add('ng-pristine');
                    el.classList.remove('ng-dirty');
                }
            });

            this.registerSubscriber(sub);
        });
    }

    /**
     * Get the PanelComponent housing a PanelFormControl
     *
     * @param  {PanelFormControl<any>}
     * @return {PanelComponent}
     */
    getPanel(control: PanelFormControl<any>): PanelComponent {
        let panels = this._panels.filter(panel => {
            return panel.el.nativeElement.classList.contains(`control-${control.name}`);
        });

        if (panels.length === 0) throw new Error('Could not get panel for control ' + control.name);

        return panels[0];
    }

    /**
     * Workaround for a bug that appeared after
     * integrating angular2-seed
     *
     * @param Event
     */
    expandPanel(e: Event): void {
        (<any>e.currentTarget).nextElementSibling.click();
    }

    /**
     * Handle change events from elements housing PanelFormControls
     *
     * @param {PanelFormControl<any>}
     * @param {Event}
     * @return void
     */
    handleChange(control: PanelFormControl<any>, e: any): void {
        this.log.debug('PanelFormComponent#handleChange() ', { control: control, e: e});
        setTimeout(() => {
            this.model[control.name] = control.value = this.panelForm.value[control.name];
        });
    }

    /**
     * Register a subscriber to be unsubscribed on ngOnDestroy
     */
    registerSubscriber(sub: Subscription) {
        this._subscriptions.push(sub);
    }

    /**
     * Callback to form ngSubmit()
     */
    submit(): void {
        this.log.debug('Submitting form ', this.panelForm.value);
        this.formSubmit.emit(this.panelForm.value);
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
