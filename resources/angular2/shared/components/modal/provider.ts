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

    private defaults: ModalConfig = {
        okText: 'GOT IT!',
        cancelText: 'Cancel',
        mode: 'alert',
        message: 'Are you sure?'
    };

    constructor(private _cr: ComponentResolver) {
        this.openModal = new Observable<ModalConfig>(observer => this._openModal = observer).share();

    }

    open(config: ModalConfig) {
        config = Object.assign(this.defaults, config);
        if (!this._openModal) {
            throw new Error("No Modal Containers have been initialized to receive modals.");
        }

        this._openModal.next(config);
        console.log('Opened modal with config', config);

        return Observable.create(observer => this.buttonClicked = observer);
    }
}
