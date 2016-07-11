import { PanelFormControl, PanelFormControlConfig } from './control';

export interface TextfieldConfig extends PanelFormControlConfig {
    type?: string;
}

export class PanelFormControlTextfield extends PanelFormControl<string> {
    controlType = 'text';
    type: string;

    get empty(): boolean {
        return this.value === '';
    }

    constructor(config: TextfieldConfig) {
      super(config);

      this.type = config.type || '';
    }
}