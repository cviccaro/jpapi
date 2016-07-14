import { Injectable, Inject, ComponentResolver, ComponentRef, ComponentFactory, ViewContainerRef } from '@angular/core';

import {Observable, Observer, Subscriber} from 'rxjs/Rx';
import 'rxjs/add/operator/share';

import { ModalConfig } from './modal.interface';
import { ModalContainerComponent } from './container';
import { ModalBackdropComponent } from './backdrop';
import { ModalComponent } from './modal';

@Injectable()
export class JpaModal {
    public openModal: Observable<ModalConfig>;
    private _openModal: Observer<ModalConfig>;

    public buttonClicked: Observer<any>;

    private _modes = ['alert', 'form'];
    private _config: ModalConfig;

    private get defaults(): ModalConfig {
        switch(this._config.mode) {
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

    constructor(private _cr: ComponentResolver) {
        this.openModal = new Observable<ModalConfig>(observer => this._openModal = observer).share();

    }

    open(config: ModalConfig) {
        this._config = config;

        if (this._modes.indexOf(config.mode) < 0) {
            // Assign a default if no mode is provided
            config.mode = 'alert';
        }

        this._config = Object.assign(this.defaults, config);

        if (this._config.mode === 'form' && this._config.inputs.length === 0) {
            throw new Error('Modal with type \'form\' needs some inputs.');
        }

        if (!this._openModal) {
            throw new Error("No Modal Containers have been initialized to receive modals.");
        }

        this._openModal.next(this._config);

        return Observable.create(observer => this.buttonClicked = observer);
    }
}
