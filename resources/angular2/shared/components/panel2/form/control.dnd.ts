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
        let summary = panelExpanded ?
                { text: this.editText, icon: this.editIcon }
                : {text: this.value.length + ' selected', icon: false};

        return summary;
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
