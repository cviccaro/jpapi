import { PanelFormControl, PanelFormControlConfig } from './control';

import { Observable } from 'rxjs/Rx';

export interface TextareaConfig extends PanelFormControlConfig {
  ckeditor?: boolean;
  ckeditorConfig?: { [key: string] : any };
}

export class PanelFormControlTextarea extends PanelFormControl<string> {
    controlType = 'textarea';
    ckeditor: boolean;
    ckeditorConfig: { [key: string] : any };

    get empty(): boolean {
        if (typeof this.value === 'undefined') return true;
        
        return this.value === '';
    }

    constructor(config: TextareaConfig) {
      super(config);

      this.ckeditor = config.ckeditor || false;
      this.ckeditorConfig = config.ckeditorConfig || {};
    }

    summary(panelExpanded: boolean) {
      if (panelExpanded || this.empty) {
        return { text: this.editableText, icon: this.editIcon };
      } else {
        return { text: this.value.length + ' characters', icon: false};
      }
    }

    // summary(panelExpanded: boolean): Observable<{ text: any, icon: string|boolean }> {
    //     return Observable.create(observer => {
    //       if (panelExpanded || this.empty) {
    //         observer.next({ text: this.editText, icon: this.editIcon });
    //       } else {
    //         observer.next({ text: this.value.length + ' characters', icon: false});
    //       }
    //     });
    // }
}
