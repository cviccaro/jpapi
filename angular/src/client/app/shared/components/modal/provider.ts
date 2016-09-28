import { Injectable } from '@angular/core';

import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/share';

import { ModalConfig } from './modal.interface';

@Injectable()
export class JpaModal {
    public buttonClicked: Observer<any>;
    public config: ModalConfig;
    public openModal: Observable<ModalConfig>;

    private _openModal: Observer<ModalConfig>;
    private _modes = ['alert', 'form'];

    private get defaults(): ModalConfig {
        switch(this.config.mode) {
            case 'form':
                return {
                    okText: 'Save',
                    cancelText: 'Cancel',
                    inputs: [],
                    showTitle: true
                };
            default:
                return {
                    okText: 'GOT IT!',
                    cancelText: 'Cancel',
                    message: 'Are you sure?',
                    showTitle: false
                };
        }
    };

    constructor() {
        this.openModal = new Observable<ModalConfig>(observer => this._openModal = observer).share();

    }

    open(config: ModalConfig) {
        this.config = config;

        if (this._modes.indexOf(config.mode) < 0) {
            // Assign a default if no mode is provided
            config.mode = 'alert';
        }

        this.config = Object.assign(this.defaults, config);

        if (this.config.mode === 'form' && this.config.inputs.length === 0) {
            throw new Error('Modal with type \'form\' needs some inputs.');
        }

        if (!this._openModal) {
            throw new Error('No Modal Containers have been initialized to receive modals.');
        }

        this._openModal.next(this.config);

        return Observable.create(observer => this.buttonClicked = observer);
    }
}
