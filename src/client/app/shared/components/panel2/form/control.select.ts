import { PanelFormControl, PanelFormControlConfig } from './control';

import { Observable } from 'rxjs/Rx';

export interface SelectConfig extends PanelFormControlConfig {
    options: {label: any, value: any}[];
}

export class PanelFormControlSelect extends PanelFormControl<string|number> {
    controlType = 'select';
    options: {label: string, value: any}[];
    focused: boolean = false;

    get empty(): boolean {
        if (typeof this.value === 'undefined') return true;

        switch(typeof this.value) {
            case 'number': return this.value === undefined || this.value === null;
            default: return !!this.value && this.value['length'] === 0;
        }
    }

    constructor(config: SelectConfig) {
      super(config);

      this.options = config.options || [];
    }

    summary(panelExpanded: boolean) {
        if (panelExpanded || this.empty) {
            return { text: this.editableText, icon: this.editIcon };
        } else {
            return { text: this.options.find(option => option.value == this.value).label, icon: false};
        }
    }
}
