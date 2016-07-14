import { PanelFormControl, PanelFormControlConfig, PanelFormControlSummary } from './control';
import { ManagedImage, ManagedFile } from '../../../index';

export interface PanelFormControlFilesConfig extends PanelFormControlConfig {
    multiple?: boolean;
    filesLabel?: string;
    type?: string;
    accept?: string;
}

export class PanelFormControlFiles extends PanelFormControl<Array<any>> {
    controlType = 'files';
    multiple: boolean;
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

        this.multiple = config.multiple === undefined ? true : config.multiple;
        this.filesLabel = config.filesLabel || 'files';
        this.type = config.type || 'file';
        this.accept = config.accept || '*';

        if (this.type === 'file' && this.editIcon === 'panorama') {
            this.editIcon = 'attachment';
        }
    }

    summary(panelExpanded: boolean): PanelFormControlSummary {
        let val: any = this.value;

        if ( !( val instanceof ManagedImage || val instanceof ManagedFile ) ) {
            switch(this.type) {
                case 'image': val = new ManagedImage(val, val.idx); break;
                case 'file': val = new ManagedFile(val, val.idx); break;
            }
        }

        let summary: PanelFormControlSummary;

        if (this.multiple) {
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

            summary = { text: text, icon: this.editIcon };
        } else {
            summary = { text: this.editableText, icon: this.editIcon };

            if (val) {
                let text = '';

                console.log('Summary for files control', {
                    this: this,
                    val: val
                });

                if (this.type === 'image') {
                    text = `${val.filename}`;

                    if (val instanceof ManagedImage || val instanceof ManagedFile) {
                        text += ` | ${val.filesize()}kb`;
                    }

                    if (val.width && val.height) text += ` | ${val.width} x ${val.height} px`;
                } else {
                    text = `${val.filename}`;
                    if (val instanceof ManagedImage || val instanceof ManagedFile) {
                        text += ` | ${val.filesize()}kb`;
                    }
                    text += ` | ${val.mimetype}`;
                }

                summary = { text: text, icon: this.editIcon };
            }
        }

        this.summaryObservable = summary;

        return summary;
    }
}
