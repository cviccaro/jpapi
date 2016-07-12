import { Input, Component, OnInit, AfterViewInit, QueryList, ViewChildren, ContentChildren, AfterContentInit, Output, EventEmitter } from '@angular/core';
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
export class PanelFormComponent implements OnInit, AfterContentInit, AfterViewInit {
    constructor(public builder: FormBuilder) { }

    panelForm: FormGroup;
    ready: boolean = true;
    panelToggleStates: { [key: string] : boolean } = {};

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

    private _controlPanels: { [key: string]: PanelComponent } = {};

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
            console.log('Just set value for control ' + control.name + ' to ' + control.value, {
                model: this.model,
                control: control
            });
        });

        this.panelForm = this.builder.group(group);
        console.log('PanelForm', this.panelForm);
    }

    ngAfterContentInit() {
        console.log('PanelFormComponent AfterContentInit', this);
    }

    ngAfterViewInit() {
        console.log('PanelFormComponent AfterViewInit', this);

        this.controls.forEach(control => {
            let panel = this.getPanel(control);

            panel.onToggle.subscribe((expanded: boolean) => {
                this.panelToggleStates[control.name] = expanded;
            });

            this._controlPanels[control.name] = panel;
        });

        this._formControls.forEach(formControl => {
            console.warn('Subscribing to status Changes on form control: ',formControl);
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

                console.log('form control ' + formControl.name + ' value change', e);
            });
        });

        // Sync validation classes with the model
        // this._models.forEach(model => {
        //     console.log('Model ', {
        //         model: model,
        //         validator: model.validator,
        //         validators: model['_validators'],
        //         control: model['_control']
        //     })

        //     let control = this.controls.find(control => control.name === model.name);

        //     let panel = this._controlPanels[control.name];

        //     let el: HTMLElement = panel.el.nativeElement;

        //     model.valueChanges.debounceTime(500).subscribe(e => {
        //         console.log('Model value changed ', { 
        //             e: e,
        //             control: control
        //         });
        //         // Handle CKEditor's lack of proper validation
        //         // @todo: remove when CKEditor patches this
        //         if (control.required && control.controlType === 'textarea' && control['ckeditor']) {
        //             if (model.value === '') {
        //                 model['_control']['_status'] = 'INVALID';
        //                 model['_value'] = model['_control']['_value'] = model['viewModel'] = model['model'] = null;
        //             }
        //         }

        //         if (model.valid) {
        //             el.classList.remove('ng-invalid');
        //             el.classList.add('ng-valid');
        //         } else {
        //             el.classList.add('ng-invalid');
        //             el.classList.remove('ng-valid');
        //         }

        //         if (model.dirty) {
        //             el.classList.remove('ng-pristine');
        //             el.classList.add('ng-dirty');
        //         } else {
        //             el.classList.add('ng-pristine');
        //             el.classList.remove('ng-dirty');
        //         }
        //     });
        // });
    }

    getPanel(control: PanelFormControl<any>): PanelComponent {
        console.debug("Get Panel for control: ", control);
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
        console.log('submit!', this.panelForm.value);

        this.formSubmit.emit(this.panelForm.value);
    }
}
