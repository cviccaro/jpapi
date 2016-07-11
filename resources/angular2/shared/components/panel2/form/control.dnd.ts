import { PanelFormControl, PanelFormControlConfig } from './control';

import { Observable } from 'rxjs/Rx';

export interface DragnDropConfig extends PanelFormControlConfig {
    options: {id: number, name: string}[];
}

export class PanelFormControlDragnDrop extends PanelFormControl<Array<any>> {
    controlType = 'dnd';
    options: {id: number, name: string}[];

    get empty(): boolean {
        return this.value.length === 0;
    }

    constructor(config: DragnDropConfig) {
      super(config);

      this.options = config.options || [];
    }

    summary(panelExpanded: boolean) {
        if (panelExpanded) {
            return { text: this.editText, icon: this.editIcon };
        }

        if (this.value.length > 5) {
            return { text: this.value.length + ' selected', icon: false};
        } else {
            let val = this.value.slice(0);
            let text: string = val.shift().name;

            if (val.length) {
                text = val.reduce((carry, item) => { return carry += ', ' + item.name }, text);
            }
            
            return { text: text, icon: false};
        }
    }

    // summary(panelExpanded: boolean): Observable<{ text: any, icon: string|boolean }> {
    //     return Observable.create(observer => {
    //         let summary = panelExpanded ?
    //             { text: this.editText, icon: this.editIcon }
    //             : {text: this.value.length + ' selected', icon: false};

    //         observer.next(summary);
    //     });
    // }
}
