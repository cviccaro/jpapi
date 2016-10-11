import { LoggerService } from '../../services/logger.service';

export interface ModalConfig {
    mode?: string;
    title?: string;
    message?: string;
    buttons?: any[];
    cancelText?: string;
    okText?: string;
    inputs?: ModalInput[];
    formClass?: any;
    showTitle?: boolean;
    minWidth?: any;
}

export interface ModalAction {
    type: string;
    config?: any;
    event: MouseEvent;
}

export interface ModalInputCondition {
    target: string;
    condition: (source: ModalInput, target: ModalInput) => boolean;
    action: string;
}

export interface ModalInput {
    label?: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value?: any;
    hint?: any;
    hidden?: boolean;
    conditions?: ModalInputCondition[];
    prefix?: string;
}

export class GenericFormField implements ModalInput {
    label: string;
    name: string;
    type: string = 'text';
    required: boolean = false;
    placeholder: string;
    value: any;
    hint: any;
    conditions: ModalInputCondition[];
    hidden: boolean = false;
    prefix: string;
}

export class ModalFormField extends GenericFormField {
    private log: LoggerService = new LoggerService();

    constructor(column: any) {
        super();

        if (!column.label) {
            // @todo: drop label property?
            column.label = column.name.substr(0,1).toUpperCase() + column.name.substr(1,column.name.length-1);
            column.placeholder = column.label;
        }

        if (!column.placeholder) column.placeholder = column.label;

        Object.assign(this, column);
    }

    evaluateConditions(inputs: ModalFormField[]) {
        if (this.conditions) {
            this.conditions.forEach((condition: ModalInputCondition) => {
                let target:any = false;

                inputs.forEach((input: ModalFormField) => {
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
                    this.log.warn(`No target field "${condition.target}" was found while checking condition for source field ${this.name}`);
                }
            });
        }
    }
}
