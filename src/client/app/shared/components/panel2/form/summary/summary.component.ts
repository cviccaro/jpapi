import { Component, Input } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../../../../libs/angular2-material';

import { PanelFormControl } from '../control';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-form-control-summary',
    templateUrl: './summary.component.html',
    directives: [ MATERIAL_DIRECTIVES ]
})
export class PanelFormControlSummary {
    @Input() control: PanelFormControl<any>;
    @Input() expanded: boolean;

    get summary() {
        return this._summary;
    }

    private get _summary() {
        return this.control.summary(this.expanded);
    }
}
