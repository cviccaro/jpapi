import { Input, Component, OnInit, OnDestroy, AfterViewInit, QueryList, ViewChildren, ContentChildren, Output, EventEmitter } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NgModel, REACTIVE_FORM_DIRECTIVES, NgControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CKEditor } from 'ng2-ckeditor';

import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';

import { PanelComponent } from '../panel2.component';
import { PanelBarComponent, PanelBarTitleComponent, PanelBarSubtitleComponent } from '../bar/index';
import { PanelContentComponent } from '../content/index';
import { PanelGroupComponent } from '../group/index';
import { PanelFormControl } from './control';
import { DragnDropFormControl } from './dnd/dnd-form-control.component';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { PanelFormControlSummary } from './summary/summary.component';

declare var CKEDITOR: any;

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-form',
    templateUrl: './panel-form.component.html',
    styleUrls: ['./panel-form.component.css'],
    directives: [
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        PanelComponent,
        PanelBarComponent,
        PanelBarSubtitleComponent,
        PanelContentComponent,
        PanelGroupComponent,
        MATERIAL_DIRECTIVES,
        CKEditor,
        DragnDropFormControl,
        FileUploadComponent,
        PanelFormControlSummary,
        REACTIVE_FORM_DIRECTIVES
    ],
    viewProviders: [NgControl]
})
export class PanelFormComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(public builder: FormBuilder) { }

    panelForm: FormGroup;
    ready: boolean = true;
    panelToggleStates: { [key: string] : boolean } = {};
    private _controlPanels: { [key: string]: PanelComponent } = {};

    @Output() formSubmit = new EventEmitter();

    @Input() controls: PanelFormControl<any>[];
    @Input() model: any;
    @Input() formClass: string;
    @Input() saving: boolean = false;
    @Input() savingText: string = 'Saving...';
    @Input() submitText: string = 'Submit';

    @ViewChildren(PanelComponent) panels: QueryList<PanelComponent>;
    @ViewChildren(NgModel) _models: QueryList<NgModel>;
    @ViewChildren(NgControl) _formControls: QueryList<NgControl>;
    @ContentChildren(FormControl) _formControlsContent: QueryList<FormControl>;
    @ViewChildren(CKEditor) _ckEditors: QueryList<CKEditor>;

    ngOnInit() {
        let group = {};

        this.formClass = 'panel-form' + (this.formClass ? ' ' + this.formClass : '');
        this.controls = this.controls.sort((a, b) => a.order - b.order);
        this.controls.forEach(control => {
            control.value = this.model[control.name];

            let validators = [];

            if (control.required) {
                validators.push(Validators.required);
            }

            group[control.name] = [control.value, validators];

            this.panelToggleStates[control.name] = false;
        });

        this.panelForm = this.builder.group(group);
    }

    ngAfterViewInit() {
        this.controls.forEach(control => {
            let panel = this.getPanel(control);

            panel.onToggle.subscribe((expanded: boolean) => {
                this.panelToggleStates[control.name] = expanded;
            });

            this._controlPanels[control.name] = panel;
        });

        if (this.controls.length !== this._formControls.length) {
            console.warn(`${this.controls.length} PanelFormControlsControls passed
                in but could only find ${this._formControls.length} ngFormControls`);
        }

        this._formControls.forEach(formControl => {
            formControl.valueChanges.debounceTime(250).subscribe(e => {
               let panel = this._controlPanels[formControl.name];

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
        });

        console.log('PanelFormComponent afterViewInit', this);
    }

    getPanel(control: PanelFormControl<any>): PanelComponent {
        let panels = this.panels.filter(panel => {
            return panel.el.nativeElement.classList.contains(`control-${control.name}`);
        });

        if (panels.length === 0) throw new Error('Could not get panel for control ' + control.name);

        return panels[0];
    }

    handleChange(control: PanelFormControl<any>, e: any) {
        setTimeout(() => { this.model[control.name] = control.value = this.panelForm.value[control.name]; });

    }

    submit() {
        this.formSubmit.emit(this.panelForm.value);
    }

    ngOnDestroy() {
        if (this._ckEditors.length) {
            console.log({
                instances: CKEDITOR.instances,
                CKEDITOR: CKEDITOR,
                instance1: this._ckEditors.first
            })
            for(name in CKEDITOR.instances)
            {
                CKEDITOR.instances[name].destroy()
            }
            // this._ckEditors.forEach((ckeditor: CKEditor) => {
            //     console.log({
            //         ckeditor: ckeditor,
            //         instnace: ckeditor.instance
            //     });
            //     ckeditor.instance.destroy();
            // });
        }
    }
}
