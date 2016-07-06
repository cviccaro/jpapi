import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MATERIAL_DIRECTIVES }  from '../../libs/angular2-material';

import { Observable } from 'rxjs/Rx';

import { ModalConfig } from './modal.interface';

export interface ModalAction {
    type: string;
    config?: any;
    event: MouseEvent;
}

@Component({
    moduleId: module.id,
    selector: 'jpa-modal',
    templateUrl: './modal.html',
    styleUrls: ['./modal.css'],
    directives: [ MATERIAL_DIRECTIVES ]
})
export class ModalComponent implements AfterViewInit {
    private _actionEmitter: EventEmitter<ModalAction> = new EventEmitter<ModalAction>();

    @Input() config: ModalConfig;

    @Output('action') get onAction(): Observable<ModalAction> {
        return this._actionEmitter.asObservable();
    }

    ngAfterViewInit() {
        console.log('ModalComponent View Initialized.', this);
    }

    action(type, config, event) {
        console.log(type + ' button clicked.', event);
        this._actionEmitter.emit({type: type, config: config, event: event});
    }
}