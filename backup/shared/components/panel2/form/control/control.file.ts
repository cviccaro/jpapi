import { PanelFormControl, PanelFormControlConfig, PanelFormControlSummary } from './control';
import {ManagedFile, ManagedImage} from "../../../../models/file";

export interface PanelFormControlFileConfig extends PanelFormControlConfig {
    type?: string;
    accept?: string;
}

export class PanelFormControlFile extends PanelFormControl<any> {
    controlType = 'file';
    editIcon: string | boolean = 'panorama';
    type: string;
    accept: string;

    get value(): any { return this._value; }
    set value(v: any) {
        if ( !!v ) {
            if ( !( v instanceof ManagedImage || v instanceof ManagedFile ) ) {
                switch(this.type) {
                    case 'file':
                        v = new ManagedFile(v, v.idx);
                        break;
                    case 'image':
                        v = new ManagedImage(v, v.idx);
                        break;
                }
            }
        }
        this._value = v;
    }

    get empty(): boolean {
        if (typeof this.value === 'undefined') return true;

        return !this.value || this.value.length === 0;
    }

    private _value: ManagedFile|ManagedImage;

    constructor(config: PanelFormControlFileConfig) {
        super(config);

        this.type = config.type || 'file';
        this.accept = config.accept || '*';

        if (this.type === 'file' && this.editIcon === 'panorama') {
            this.editIcon = 'attachment';
        }
    }

    summary(panelExpanded: boolean): PanelFormControlSummary {
        let val: ManagedImage = this.value;

        let summary: PanelFormControlSummary = { text: this.editableText, icon: this.editIcon };

        if (val) {
            let text = `${val.alias || val.filename} | ${val.filesize()}kb`;

            if (this.type === 'image' && val.width && val.height) text += ` | ${val.width} x ${val.height} px`;
            if (this.type === 'file' && val.mimetype) text += ` | ${val.mimetype}`;

            if (val.description) text += ` | ${val.description}`;

            summary = { text: text, icon: this.editIcon };
        }

        this.summaryObservable = summary;

        return summary;
    }
}
