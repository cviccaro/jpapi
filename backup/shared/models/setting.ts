export interface Setting {
    name: string;
    description: string;
    label: string;
    value?: any;
}

export interface SettingFormControl extends Setting {
    control_type: string;
    type?: string;
}
