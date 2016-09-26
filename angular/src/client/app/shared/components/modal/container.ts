import {
    Component,
    ElementRef,
    ViewChild,
    OnInit,
    OnDestroy,
    HostBinding
} from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { ModalComponent } from './modal';
import { JpaModal } from './provider';
import { ModalConfig } from './modal.interface';
import { RegistersSubscribers } from '../../index';

@Component({
    moduleId: module.id,
    selector: 'jpa-modal-container',
    template: '<jpa-modal #modal [config]="config" [class]="classList"></jpa-modal><jpa-modal-backdrop #backdrop></jpa-modal-backdrop>',
    styleUrls: ['./container.css']
})
export class ModalContainerComponent implements OnInit, OnDestroy, RegistersSubscribers {
    config: ModalConfig;
    opened = false;
    _subscriptions: Subscription[] = [];

    public get classList() {
        let cl = 'jpa-modal-wrapper';
        if (this.config) {
            cl += ' ' + this.config.mode;
        }

        return cl;
    }

    @HostBinding('attr.hidden') get hiddenAttr() { return this.opened ? null : true; }

    @ViewChild('modal') private modal: ModalComponent;

    constructor(public el: ElementRef, private service: JpaModal) {
        console.log('JPAPI ModalContainer constructed', this);

    /**
     * Initialize the directive/component after Angular initializes
     * the data-bound input properties.
     */
    ngOnInit(): void {
        let sub = this.service.openModal.subscribe((config: ModalConfig) => {
            this.config = config;
            this.opened = true;
        });

        this.registerSubscriber(sub);

        let sub2 = this.modal.onAction.subscribe((e) => {
            this.opened = false;
            this.service.buttonClicked.next(e);
        });

        this.registerSubscriber(sub2);
    }

    /**
     * Register a subscriber to be unsubscribed when component
     * is destroyed
     * @param {Subscription} sub
     */
    registerSubscriber(sub: Subscription): void {
        this._subscriptions.push(sub);
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
    }
}
