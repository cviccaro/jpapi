import { PanelFormControl, PanelFormControlConfig, PanelFormControlSummary } from './control';

export interface PanelFormControlFilesConfig extends PanelFormControlConfig {
    filesLabel?: string;
    type?: string;
    accept?: string;
}

export class PanelFormControlFiles extends PanelFormControl<Array<any>> {
    controlType = 'files';
    editIcon: string | boolean = 'panorama';
    filesLabel: string;
    type: string;
    accept: string;

    get empty(): boolean {
        if (typeof this.value === 'undefined') return true;

        return !this.value || this.value.length === 0;
    }

    constructor(config: PanelFormControlFilesConfig) {
        super(config);

        this.filesLabel = config.filesLabel || 'files';
        this.type = config.type || 'file';
        this.accept = config.accept || '*';

        if (this.type === 'file' && this.editIcon === 'panorama') {
            this.editIcon = 'attachment';
        }
    }

    summary(panelExpanded: boolean): PanelFormControlSummary {
        let val: any = this.value;
        let text: string;

        if (val !== '') {
            let map = val.reduce((carry, item) => {
                if (item['id'] !== undefined) {
                    carry.current++;
                } else {
                    carry.queue++;
                }

                return carry;
            }, { queue: 0, current: 0 });

            text = `${map.current} ${this.filesLabel} | ${map.queue} in queue`;
        } else {
            text = `0 ${this.filesLabel} | 0 in queue`;
        }

        let summary = { text: text, icon: this.editIcon };

        this.summaryObservable = summary;

        return summary;
    }
}
