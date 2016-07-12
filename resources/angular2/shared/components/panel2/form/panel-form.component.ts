import { Input, Component, OnInit, AfterViewInit, QueryList, ViewChildren, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NgModel } from '@angular/forms';
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
        PanelFormControlSummary
    ]
})
export class PanelFormComponent implements OnInit, AfterContentInit, AfterViewInit {
    ready: boolean = true;
    panelToggleStates: { [key: string] : boolean } = {};

    @Output() formSubmit = new EventEmitter();

    @Input() controls: PanelFormControl<any>[];
    @Input() model: any;
    @Input() formClass: string;
    @Input() submitText: string = 'Submit';

    @ViewChildren(PanelComponent) panels: QueryList<PanelComponent>;
    @ViewChildren(NgModel) _models: QueryList<NgModel>;

    private _controlPanels: { [key: string]: PanelComponent } = {};

    ngOnInit() {
        this.formClass = 'panel-form' + (this.formClass ? ' ' + this.formClass : '');
        this.controls = this.controls.sort((a, b) => a.order - b.order);
        this.controls.forEach(control => {
            control.value = this.model[control.name];
            this.panelToggleStates[control.name] = false;
            console.log('Just set value for control ' + control.name + ' to ' + control.value, {
                model: this.model,
                control: control
            });
        });
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

        // Sync validation classes with the model
        this._models.forEach(model => {
            let control = this.controls.find(control => control.name === model.name);

            let panel = this._controlPanels[control.name];

            let el: HTMLElement = panel.el.nativeElement;
            model.valueChanges.debounceTime(500).subscribe(e => {
                // Handle CKEditor's lack of proper validation
                // @todo: remove when CKEditor patches this
                if (control.required && control.controlType === 'textarea' && control['ckeditor']) {
                    if (model.value === '') {
                        model['_control']['_status'] = 'INVALID';
                        model['_value'] = model['_control']['_value'] = model['viewModel'] = model['model'] = null;
                    }
                }

                if (model.valid) {
                    el.classList.remove('ng-invalid');
                    el.classList.add('ng-valid');
                } else {
                    el.classList.add('ng-invalid');
                    el.classList.remove('ng-valid');
                }

                if (model.dirty) {
                    el.classList.remove('ng-pristine');
                    el.classList.add('ng-dirty');
                } else {
                    el.classList.add('ng-pristine');
                    el.classList.remove('ng-dirty');
                }
            });
        });
    }

    getPanel(control: PanelFormControl<any>): PanelComponent {
        console.debug("Get Panel for control: ", control);
        let panels = this.panels.filter(panel => {
            return panel.el.nativeElement.classList.contains(`control-${control.name}`);
        });

        if (panels.length === 0) throw new Error('Could not get panel for control ' + control.name);

        return panels[0];
    }

    handleChange(control: PanelFormControl<any>, e: any, value?: any) {
        console.warn('PanelFormComponent.handleChange : ', {
            control: control,
            e: e,
            value: value,
        });
        if (control.controlType === 'files' && control['type'] === 'image' && !control['multiple']) {
            this.model[control.name] = value;
        } else {
            if (value !== undefined) {
                console.debug('Setting ' + control.name + ' in model to passed in value:', value);
                this.model[control.name] = control.value = value;
            } else {
                console.debug('Setting ' + control.name + ' in model to control\'s value:', control.value);
                this.model[control.name] = control.value;
            }
        }
    }

    submit() {
        console.log('submit!', this.model);

        this.formSubmit.emit(this.model);
    }
}
