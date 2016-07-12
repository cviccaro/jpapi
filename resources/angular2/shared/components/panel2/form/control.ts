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
        return this.value === undefined;
    }

    get editableText(): string {
        if (this.empty) return this.emptyText;

        return this.editText;
    }

    constructor(config: PanelFormControlConfig) {
        if (!config.label) {
            // @todo: drop label property?
            config.label = config.name.substr(0,1).toUpperCase() + config.name.substr(1,config.name.length-1);
            config.placeholder = config.label;
        }

        config.editText = config.editText || 'Edit ' + config.label;
        config.emptyText = config.emptyText || 'Add ' + config.label;

        if (config.editIcon !== false) {
            config.editIcon = config.editIcon || 'help_outline';
        }

        Object.assign(this, config);
    }

    summary(panelExpanded: boolean): { text: any, icon: string|boolean } {
        if (panelExpanded || this.empty) return { text: this.editableText, icon: this.editIcon };

        return { text: this.value, icon: false };
    }

    // summary(panelExpanded: boolean): Observable<{ text: any, icon: string|boolean }> {
    //     return Observable.create(observer => {
    //         if (panelExpanded || this.empty) {
    //             observer.next({ text: this.editText, icon: this.editIcon });
    //         } else {
    //             observer.next({ text: this.value, icon: false });
    //         }
    //     });
    // }

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
                } else {
                    console.warn(`No target field "${condition.target}" was found while checking condition for source field ${this.name}`);
                }
            });
        }
    }
}
