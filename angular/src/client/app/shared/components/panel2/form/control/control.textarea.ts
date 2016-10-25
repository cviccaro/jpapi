import { PanelFormControl, PanelFormControlConfig, PanelFormControlSummary } from './control';

export interface TextareaConfig extends PanelFormControlConfig {
  ckeditor?: boolean;
  ckeditorConfig?: { [key: string]: any };
}

export class PanelFormControlTextarea extends PanelFormControl<string> {
  controlType = 'textarea';
  ckeditor: boolean;
  ckeditorConfig: { [key: string]: any };

  get empty(): boolean {
    if (typeof this.value === 'undefined') return true;

    return this.value === '' || this.value === null;
  }

  constructor(config: TextareaConfig) {
    super(config);

    this.ckeditor = config.ckeditor || false;
    this.ckeditorConfig = config.ckeditorConfig || {};

    this.ckeditorConfig['filebrowserBrowseUrl'] = '/file-upload/browse';
    this.ckeditorConfig['filebrowserUploadUrl'] = '/file-upload/upload';
  }

  summary(panelExpanded: boolean): PanelFormControlSummary {
    let summary: PanelFormControlSummary;

    if (panelExpanded || this.empty) {
      summary = { text: this.editableText, icon: this.editIcon };
    } else {
      summary = { text: this.value.length + ' characters', icon: false };
    }

    this.summaryObservable = summary;

    return summary;
  }
}
