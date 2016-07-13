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
    editIcon?: string|boolean;
    hidden?: boolean;
    conditions?: PanelFormControlCondition[];
}

export class PanelFormControl<T> {
    value: T;
    controlType: string;
    hidden: boolean;

    name: string;
    required: boolean = false;
    order: number;
    label: string;
    placeholder: string;
    editIcon: string|boolean;
    editText: string;
    emptyText: string;
    conditions: PanelFormControlCondition[];

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
            config.label = config.name.substr(0,1).toUpperCase() + config.name.substr(1,config.name.length-1);
        }

        config.placeholder = config.placeholder || config.label;

        config.editText = config.editText || 'Edit ' + config.label;
        config.emptyText = config.emptyText || 'Add ' + config.label;

        if (config.editIcon !== false) {
            config.editIcon = config.editIcon || 'help_outline';
        }

        Object.assign(this, config);
    }

    //@todo: make observable so can use distinctuntilchanged
    summary(panelExpanded: boolean): { text: any, icon: string|boolean } {
        if (panelExpanded || this.empty) return { text: this.editableText, icon: this.editIcon };

        return { text: this.value, icon: false };
    }

    evaluateConditions(inputs: PanelFormControl<any>[]) {
        if (this.conditions) {
            this.conditions.forEach((condition: PanelFormControlCondition) => {
                let target:any = false;

                inputs.forEach((input: PanelFormControl<any>) => {
                    if (input.name === condition.target) target = input;
                });

                if (target) {
                    let result = condition.condition.apply(this, [this, target]);

                    switch(condition.action) {
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
