import { PanelFormControl, PanelFormControlConfig } from './control';

export interface PanelFormControlFilesConfig extends PanelFormControlConfig {
    multiple?: boolean;
    filesLabel?: string;
    type?: string;
}

export class PanelFormControlFiles extends PanelFormControl<Array<any>> {
    controlType = 'files';
    multiple: boolean;
    editIcon: string|boolean = 'panorama';
    filesLabel: string;
    type: string;

    get empty(): boolean {
        return this.value.length === 0;
    }

    constructor(config: PanelFormControlFilesConfig) {
      super(config);

      this.multiple = config.multiple === undefined ? true : config.multiple;
      this.filesLabel = config.filesLabel || 'files';
      this.type = config.type || 'file';

      if (this.type === 'file' && this.editIcon === 'panorama') {
          this.editIcon = 'attachment';
      }

      console.warn('PanelFormControlFiles constructed', {
          this: this,
          config: config
      });
    }

    summary(panelExpanded: boolean): { text: any, icon: string|boolean } {
        let val: any = this.value;

        //@todo: make observable so can use distinctuntilchanged

        // console.log('get summary for files ', {
        //     this: this,
        //     panelExpanded: panelExpanded,
        //     val: val,
        // });

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
                    text = `${val.filename} | ${Math.round(val.size/10)/100}kb | ${val.width} x ${val.height} px`;
                } else {
                    text = `${val.filename} | ${Math.round(val.size/10)/100}kb`;
                }

                return { text: text, icon: this.editIcon };
            } else {
                return { text: this.editText, icon: this.editIcon };
            }
        }
    }

    // summary(panelExpanded: boolean): Observable<{ text: any, icon: string|boolean }> {
    //     return Observable.create(observer => {
    //         let val: any = this.value;

    //         console.log('PanelFormControlFiles# get summary for files ', {
    //             this: this,
    //             panelExpanded: panelExpanded,
    //             val: val,
    //         });

    //         let summary = {};

    //         if (this.multiple) {
    //             let arr = val === '' ? [] : this.value;

    //             let map = arr.reduce((carry, item) => {
    //                 if (item['id'] !== undefined) {
    //                     carry.current++;
    //                 } else {
    //                     carry.queue++;
    //                 }

    //                 return carry;
    //             }, { queue: 0, current: 0 });

    //             let text = `${map.current} ${this.filesLabel} | ${map.queue} in queue`;

    //             summary = { text: text, icon: this.editIcon };
    //         } else {
    //             let text = `${val.filename} | ${Math.round(val.size/10)/100}kb | ${val.width} x ${val.height} px`;

    //             summary = { text: text, icon: this.editIcon };
    //         }

    //         console.log('PanelFormControlFiles# summary() returning ', summary);

    //         observer.next(summary);
    //     });
    // }
}
