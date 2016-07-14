import { PanelFormControl, PanelFormControlConfig } from './control';

export interface PanelFormControlFilesConfig extends PanelFormControlConfig {
    multiple?: boolean;
    filesLabel?: string;
    type?: string;
    accept?: string;
}

export class PanelFormControlFiles extends PanelFormControl<Array<any>> {
    controlType = 'files';
    multiple: boolean;
    editIcon: string|boolean = 'panorama';
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

    summary(panelExpanded: boolean): { text: any, icon: string|boolean } {
        let val: any = this.value;

        if (this.multiple) {
            let arr = val === '' ? [] : this.value;

            let map = arr.reduce((carry, item) => {
                if (item['id'] !== undefined) {
                    carry.current++;
                } else {
                    carry.queue++;
                }

                return carry;
            }, { queue: 0, current: 0 });

            let text = `${map.current} ${this.filesLabel} | ${map.queue} in queue`;

            return { text: text, icon: this.editIcon };
        } else {
            if (val) {
                let text = '';
                if (this.type === 'image') {
                    text = `${val.filename} | ${Math.round(val.size/10)/100}kb`;
                    if (val.width && val.height) {
                        text += ` | ${val.width} x ${val.height} px`;
                    }
                } else {
                    text = `${val.filename} | ${Math.round(val.size/10)/100}kb | ${val.mimetype}`;
                }

                return { text: text, icon: this.editIcon };
            } else {
                return { text: this.editableText, icon: this.editIcon };
            }
        }
    }
}
