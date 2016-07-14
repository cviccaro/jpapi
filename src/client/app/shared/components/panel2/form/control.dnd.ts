import { PanelFormControl, PanelFormControlConfig, PanelFormControlSummary } from './control';

export interface DragnDropConfig extends PanelFormControlConfig {
    options: { id: number, name: string }[];
}

export class PanelFormControlDragnDrop extends PanelFormControl<Array<any>> {
    controlType = 'dnd';
    options: { id: number, name: string }[];

    get empty(): boolean {
        if (typeof this.value === 'undefined') return true;

        return this.value.length === 0;
    }

    constructor(config: DragnDropConfig) {
        super(config);

        this.options = config.options || [];
    }

    summary(panelExpanded: boolean): PanelFormControlSummary {
        let summary: PanelFormControlSummary;

        if (panelExpanded || this.empty) {
            summary = { text: this.editableText, icon: this.editIcon };
        } else {
            if (this.value.length > 5) {
                summary = { text: this.value.length + ' selected', icon: false };
            } else {
                let val = this.value.slice(0);
                let text: string = val.shift().name;

                if (val.length) {
                    text = val.reduce((carry, item) => { return carry += ', ' + item.name; }, text);
                }

                summary = { text: text, icon: false };
            }
        }

        this.summaryObservable = summary;

        return summary;
    }
}
