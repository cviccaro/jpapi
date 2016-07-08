export interface ModalConfig {
    mode?: string;
    title?: string;
    message?: string;
    buttons?: any[];
    cancelText?: string;
    okText?: string;
    inputs?: ModalInput[];
    formClass?: any;
}

export interface ModalAction {
    type: string;
    config?: any;
    event: MouseEvent;
}

export interface ModalInput {
    label?: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value?: any;
    hint?: any;
    hidden?: string;
}

export class GenericFormColumn implements ModalInput {
    label: string;
    name: string;
    type: string = 'text';
    required: boolean = false;
    placeholder: string;
    value: any;
    hint: any;
}

export class ModalFormColumn extends GenericFormColumn {
    constructor(column: any) {
        super();

        if (!column.label) {
            // @todo: drop label property?
            column.label = column.name.substr(0,1).toUpperCase() + column.name.substr(1,column.name.length-1);
            column.placeholder = column.label;
        }
        Object.assign(this, column);
    }
}
