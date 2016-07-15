import { LoggerService } from '../../../index';
import { ReplaySubject } from 'rxjs/Rx';

export interface PanelFormControlSummary {
    text: any;
    icon: string | boolean;
}

export interface PanelFormControlCondition {
    target: string;
    condition: (source: PanelFormControl<any>, target: PanelFormControl<any>) => boolean;
    action: string;
}

export interface PanelFormControlConfig {
    name: string;
    required?: boolean;
    order?: number;
    label?: string;
    placeholder?: string;
    editText?: string;
    emptyText?: string;
    editIcon?: string | boolean;
    hidden?: boolean;
    conditions?: PanelFormControlCondition[];
}

let uniqueId = 0;

export class PanelFormControl<T> {
    value: T;
    controlType: string;
    hidden: boolean;
    name: string;
    required: boolean = false;
    order: number = uniqueId++;
    label: string;
    placeholder: string;
    editIcon: string | boolean;
    editText: string;
    emptyText: string;
    conditions: PanelFormControlCondition[];

    public _summarySource = new ReplaySubject<PanelFormControlSummary>(1); // Observable source
    public summary$ = this._summarySource.asObservable(); // Observable stream
    protected _summary: PanelFormControlSummary;
    protected log = new LoggerService();

    get empty(): boolean {
        if (typeof this.value === 'undefined') return true;

        return this.value === undefined || this.value === null;
    }

    get editableText(): string {
        if (this.empty) return this.emptyText;

        return this.editText;
    }

    constructor(config: PanelFormControlConfig) {
        if (!config.label) {
            config.label = config.name.substr(0, 1).toUpperCase() + config.name.substr(1, config.name.length - 1);
        }

        config.placeholder = config.placeholder || config.label;

        config.editText = config.editText || 'Edit ' + config.label;
        config.emptyText = config.emptyText || 'Add ' + config.label;

        if (config.editIcon !== false) {
            config.editIcon = config.editIcon || 'help_outline';
        }

        Object.assign(this, config);

        if (uniqueId > 1 && config.order !== undefined) {
            uniqueId = config.order + 1;
        }
    }

    summary(panelExpanded: boolean): PanelFormControlSummary {
        let summary: any;

        if (panelExpanded || this.empty) {
            summary = { text: this.editableText, icon: this.editIcon };
        } else {
            summary = { text: this.value, icon: false };
        }

        this.summaryObservable = summary;

        return summary;
    }

    get summaryObservable() { return this._summary; }
    set summaryObservable(v: PanelFormControlSummary) {
        this._summary = v;
        this._summarySource.next(v);
    }


    evaluateConditions(inputs: PanelFormControl<any>[]) {
        if (this.conditions) {
            this.conditions.forEach((condition: PanelFormControlCondition) => {
                let target: any = false;

                inputs.forEach((input: PanelFormControl<any>) => {
                    if (input.name === condition.target) target = input;
                });

                if (target) {
                    let result = condition.condition.apply(this, [this, target]);

                    switch (condition.action) {
                        case 'hidden':
                            this.hidden = result;
                            break;
                        case 'required':
                            this.required = result;
                            break;
                    }
                }
            });
        }
    }
}
