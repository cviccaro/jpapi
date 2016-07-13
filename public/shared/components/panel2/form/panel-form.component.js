"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var ng2_ckeditor_1 = require('ng2-ckeditor');
var angular2_material_1 = require('../../../libs/angular2-material');
var panel2_component_1 = require('../panel2.component');
var index_1 = require('../bar/index');
var index_2 = require('../content/index');
var index_3 = require('../group/index');
var dnd_form_control_component_1 = require('./dnd/dnd-form-control.component');
var file_upload_component_1 = require('../../file-upload/file-upload.component');
var summary_component_1 = require('./summary/summary.component');
var PanelFormComponent = (function () {
    function PanelFormComponent(builder) {
        this.builder = builder;
        this.ready = true;
        this.panelToggleStates = {};
        this._controlPanels = {};
        this._subscriptions = [];
        this.saving = false;
        this.savingText = 'Saving...';
        this.submitText = 'Submit';
        this.formSubmit = new core_1.EventEmitter();
    }
    PanelFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        var group = {};
        this.formClass = 'panel-form' + (this.formClass ? ' ' + this.formClass : '');
        this.controls = this.controls.sort(function (a, b) { return a.order - b.order; });
        this.controls.forEach(function (control) {
            control.value = _this.model[control.name];
            var validators = [];
            if (control.required) {
                validators.push(forms_1.Validators.required);
            }
            group[control.name] = [control.value, validators];
            _this.panelToggleStates[control.name] = false;
        });
        this.panelForm = this.builder.group(group);
    };
    PanelFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.controls.forEach(function (control) {
            var panel = _this.getPanel(control);
            var sub = panel.onToggle.subscribe(function (expanded) {
                _this.panelToggleStates[control.name] = expanded;
            });
            _this._subscriptions.push(sub);
            _this._controlPanels[control.name] = panel;
        });
        if (this.controls.length !== this._formControls.length) {
            console.warn(this.controls.length + " PanelFormControlsControls passed\n                in but could only find " + this._formControls.length + " ngFormControls");
        }
        this._formControls.forEach(function (formControl) {
            var sub = formControl.valueChanges.debounceTime(250).subscribe(function (e) {
                var panel = _this._controlPanels[formControl.name];
                var el = panel.el.nativeElement;
                if (formControl.valid) {
                    el.classList.remove('ng-invalid');
                    el.classList.add('ng-valid');
                }
                else {
                    el.classList.add('ng-invalid');
                    el.classList.remove('ng-valid');
                }
                if (formControl.dirty) {
                    el.classList.remove('ng-pristine');
                    el.classList.add('ng-dirty');
                }
                else {
                    el.classList.add('ng-pristine');
                    el.classList.remove('ng-dirty');
                }
            });
            _this._subscriptions.push(sub);
        });
        console.log('PanelFormComponent afterViewInit', this);
    };
    PanelFormComponent.prototype.getPanel = function (control) {
        var panels = this._panels.filter(function (panel) {
            return panel.el.nativeElement.classList.contains("control-" + control.name);
        });
        if (panels.length === 0)
            throw new Error('Could not get panel for control ' + control.name);
        return panels[0];
    };
    PanelFormComponent.prototype.handleChange = function (control, e) {
        var _this = this;
        setTimeout(function () { _this.model[control.name] = control.value = _this.panelForm.value[control.name]; });
    };
    PanelFormComponent.prototype.submit = function () {
        this.formSubmit.emit(this.panelForm.value);
    };
    PanelFormComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) {
            if (sub)
                sub.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PanelFormComponent.prototype, "controls", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelFormComponent.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormComponent.prototype, "formClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelFormComponent.prototype, "saving", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormComponent.prototype, "savingText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelFormComponent.prototype, "submitText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PanelFormComponent.prototype, "formSubmit", void 0);
    __decorate([
        core_1.ViewChildren(panel2_component_1.PanelComponent), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormComponent.prototype, "_panels", void 0);
    __decorate([
        core_1.ViewChildren(forms_1.NgControl), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormComponent.prototype, "_formControls", void 0);
    __decorate([
        core_1.ViewChildren(ng2_ckeditor_1.CKEditor), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormComponent.prototype, "_ckEditors", void 0);
    PanelFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel2-form',
            templateUrl: './panel-form.component.html',
            styleUrls: ['./panel-form.component.css'],
            directives: [
                common_1.NgSwitch,
                common_1.NgSwitchCase,
                common_1.NgSwitchDefault,
                panel2_component_1.PanelComponent,
                index_1.PanelBarComponent,
                index_1.PanelBarSubtitleComponent,
                index_2.PanelContentComponent,
                index_3.PanelGroupComponent,
                angular2_material_1.MATERIAL_DIRECTIVES,
                ng2_ckeditor_1.CKEditor,
                dnd_form_control_component_1.DragnDropFormControl,
                file_upload_component_1.FileUploadComponent,
                summary_component_1.PanelFormControlSummary,
                forms_1.REACTIVE_FORM_DIRECTIVES
            ],
            viewProviders: [forms_1.NgControl]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], PanelFormComponent);
    return PanelFormComponent;
}());
exports.PanelFormComponent = PanelFormComponent;

//# sourceMappingURL=panel-form.component.js.map
