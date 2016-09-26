import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ModalConfig, ModalFormField, ModalAction } from './modal.interface';
import {ManagedFile} from '../../models/file';

@Component({
    moduleId: module.id,
    selector: 'jpa-modal',
    templateUrl: './modal.html',
    styleUrls: ['./modal.css']
})
export class ModalComponent implements OnChanges {
    _files: any[] = [];
    _minWidth: string = null;

    @Input() config: ModalConfig;
    @Output('action') get onAction(): Observable<ModalAction> {
        return this._actionEmitter.asObservable();
    }

    @HostBinding('style.minWidth') get minWidthStyle() { return this._minWidth; }

    private _actionEmitter: EventEmitter<ModalAction> = new EventEmitter<ModalAction>();

    action(type: string, config: ModalConfig, event: any) {
        event.preventDefault();
        event.stopPropagation();

        this._actionEmitter.emit({ type: type, config: config, event: event });
    }

    /**
     * Submit a modal-form
     */
    modalFormSubmit(): void {
        this._actionEmitter.emit({ type: 'submit', config: this.config, event: null });
    }

    handleChange(col: ModalFormField, e: Event) {
        if (col.type === 'file') {
            col.value = new ManagedFile({
                _file: (<HTMLInputElement>e.target).files[0]
            }, 0);
        }

        let inputs = <ModalFormField[]>this.config.inputs;

        this.config.inputs.forEach(col => { (<ModalFormField>col).evaluateConditions(inputs); });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('config')) {
            let currentValue: ModalConfig = changes['config'].currentValue;

            if (currentValue) {
                switch (currentValue.mode) {
                    case 'form':
                        this.config.inputs = this.config.inputs.map(input => new ModalFormField(input));
                        break;
                }
                if (currentValue.minWidth) {
                    this._minWidth = currentValue.minWidth;
                }
            }
        }
    }
}
