import { PanelFormControl, PanelFormControlConfig } from './control';

export interface TextfieldConfig extends PanelFormControlConfig {
    type?: string;
}

export class PanelFormControlTextfield extends PanelFormControl<string> {
    controlType = 'text';
    type: string;

    get empty(): boolean {
        if (typeof this.value === 'undefined') return true;

        return this.value === null || this.value === undefined || this.value === '';
    }

    constructor(config: TextfieldConfig) {
      super(config);

      this.type = config.type || '';
    }
}
