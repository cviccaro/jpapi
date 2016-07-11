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
var image_upload_component_1 = require('../../image-upload/image-upload.component');
var summary_component_1 = require('./summary/summary.component');
var PanelFormComponent = (function () {
    function PanelFormComponent() {
        this.ready = true;
        this.panelToggleStates = {};
        this.submitText = 'Submit';
        this._controlPanels = {};
    }
    PanelFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.controls = this.controls.sort(function (a, b) { return a.order - b.order; });
        this.controls.forEach(function (control) {
            control.value = _this.model[control.name];
            _this.panelToggleStates[control.name] = false;
            console.log('Just set value for control ' + control.name + ' to ' + control.value, {
                model: _this.model,
                control: control
            });
        });
    };
    PanelFormComponent.prototype.ngAfterContentInit = function () {
        console.log('PanelFormComponent AfterContentInit', this);
    };
    PanelFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('PanelFormComponent AfterViewInit', this);
        this.controls.forEach(function (control) {
            var panel = _this.getPanel(control);
            panel.onToggle.subscribe(function (expanded) {
                _this.panelToggleStates[control.name] = expanded;
            });
            _this._controlPanels[control.name] = panel;
        });
        this._models.forEach(function (model) {
            var control = _this.controls.find(function (control) { return control.name === model.name; });
            var panel = _this._controlPanels[control.name];
            var el = panel.el.nativeElement;
            model.valueChanges.debounceTime(500).subscribe(function (e) {
                if (control.required && control.controlType === 'textarea' && control['ckeditor']) {
                    if (model.value === '') {
                        model['_control']['_status'] = 'INVALID';
                        model['_value'] = model['_control']['_value'] = model['viewModel'] = model['model'] = null;
                    }
                }
                if (model.valid) {
                    el.classList.remove('ng-invalid');
                    el.classList.add('ng-valid');
                }
                else {
                    el.classList.add('ng-invalid');
                    el.classList.remove('ng-valid');
                }
                if (model.dirty) {
                    el.classList.remove('ng-pristine');
                    el.classList.add('ng-dirty');
                }
                else {
                    el.classList.add('ng-pristine');
                    el.classList.remove('ng-dirty');
                }
            });
        });
    };
    PanelFormComponent.prototype.getPanel = function (control) {
        console.debug("Get Panel for control: ", control);
        var panels = this.panels.filter(function (panel) {
            return panel.el.nativeElement.classList.contains("control-" + control.name);
        });
        if (panels.length === 0)
            throw new Error('Could not get panel for control ' + control.name);
        return panels[0];
    };
    PanelFormComponent.prototype.handleChange = function (control, e, value) {
        console.warn('PanelFormComponent.handleChange : ', {
            control: control,
            e: e,
            value: value,
        });
        if (value !== undefined) {
            console.debug('Setting ' + control.name + ' in model to passed in value:', value);
            this.model[control.name] = control.value = value;
        }
        else {
            console.debug('Setting ' + control.name + ' in model to control\'s value:', control.value);
            this.model[control.name] = control.value;
        }
    };
    PanelFormComponent.prototype.submit = function () {
        console.log('submit!', this.model);
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
        __metadata('design:type', String)
    ], PanelFormComponent.prototype, "submitText", void 0);
    __decorate([
        core_1.ViewChildren(panel2_component_1.PanelComponent), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormComponent.prototype, "panels", void 0);
    __decorate([
        core_1.ViewChildren(forms_1.NgModel), 
        __metadata('design:type', core_1.QueryList)
    ], PanelFormComponent.prototype, "_models", void 0);
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
                image_upload_component_1.ImageUploadComponent,
                summary_component_1.PanelFormControlSummary
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelFormComponent);
    return PanelFormComponent;
}());
exports.PanelFormComponent = PanelFormComponent;

//# sourceMappingURL=panel-form.component.js.map
