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
        return (typeof this.value === "number") ? (this.value === undefined || this.value === null) : this.value['length'] === 0;
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

    // summary(panelExpanded: boolean): Observable<{ text: any, icon: string|boolean }> {
    //     return Observable.create(observer => {
    //         if (panelExpanded || this.empty) {
    //             observer.next({ text: this.editText, icon: this.editIcon });
    //         } else {
    //             observer.next({ text: this.options.find(option => option.value == this.value).label, icon: false});
    //         }
    //     });
    // }
}
