import { Component, AfterViewInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MATERIAL_DIRECTIVES }  from '../../libs/angular2-material';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { ModalConfig, ModalInput, ModalFormField, ModalAction } from './modal.interface';

@Component({
    moduleId: module.id,
    selector: 'jpa-modal',
    templateUrl: './modal.html',
    styleUrls: ['./modal.css'],
    directives: [MATERIAL_DIRECTIVES, NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class ModalComponent implements AfterViewInit, OnChanges {
    private _actionEmitter: EventEmitter<ModalAction> = new EventEmitter<ModalAction>();

    private _files: { [key: string] : FileList } = {};

    @Input() config: ModalConfig;

    @Output('action') get onAction(): Observable<ModalAction> {
        return this._actionEmitter.asObservable();
    }

    ngAfterViewInit() {
        console.log('ModalComponent View Initialized.', this);
    }

    action(type, config, event) {
        console.log(type + ' button clicked.', event);
        event.preventDefault();
        event.stopPropagation();

        this._actionEmitter.emit({ type: type, config: config, event: event });
    }

    modalFormSubmit() {
        this._actionEmitter.emit({ type: 'submit', config: this.config, event: null });
    }

    handleChange(col: ModalFormField, e: Event) {
        console.log('handle change in modal', {
            col: col,
            e: e
        });
        if (col.type === 'file') {
            col.value = e.target['files'];
        }

        let inputs = <ModalFormField[]>this.config.inputs;

        this.config.inputs.forEach(col => { (<ModalFormField>col).evaluateConditions(inputs); });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('config')) {
            let currentValue: ModalConfig = changes['config'].currentValue;

            if (currentValue) {
                switch (currentValue.mode) {
                    case "form":
                        this.config.inputs = this.config.inputs.map(input => new ModalFormField(input));
                        break;
                }
            }
        }
    }
}