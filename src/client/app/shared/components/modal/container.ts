import {
    Component,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    OnInit,
    OnDestroy,
    HostBinding
} from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { ModalBackdropComponent } from './backdrop';
import { ModalComponent } from './modal';
import { JpaModal } from './provider';
import { ModalConfig } from './modal.interface';

@Component({
    moduleId: module.id,
    selector: 'jpa-modal-container',
    template: '<jpa-modal #modal [config]="config" [class]="classList"></jpa-modal><jpa-modal-backdrop #backdrop></jpa-modal-backdrop>',
    styleUrls: ['./container.css'],
    directives: [ ModalBackdropComponent, ModalComponent ]
})
export class ModalContainerComponent implements OnInit, OnDestroy {

    public config: ModalConfig;
    private opened = false;

    private openModalSubscriber: Subscription;
    private actionSubscriber: Subscription;
    private okModalSubscriber: Subscription;

    public get classList() {
        let cl = 'jpa-modal-wrapper';
        if (this.config) {
            cl += ' ' + this.config.mode;
        }

        return cl;
    }

    @HostBinding('attr.hidden') get hiddenAttr() { return this.opened ? null : true; }

    @ViewChild('backdrop') private backdrop: ModalBackdropComponent;
    @ViewChild('modal') private modal: ModalComponent;

    constructor(public el: ElementRef, private service: JpaModal, private ref : ChangeDetectorRef) {

    }

    ngOnInit() {
        this.registerSubscribers();
    }

    private registerSubscribers() {
        this.openModalSubscriber = this.service.openModal.subscribe((config: ModalConfig) => {
            this.config = config;
            this.opened = true;
        });
        this.actionSubscriber = this.modal.onAction.subscribe((e) => {
            this.opened = false;
            this.service.buttonClicked.next(e);
        });
    }

    ngOnDestroy() {
        if (this.openModalSubscriber) this.openModalSubscriber.unsubscribe();
        if (this.okModalSubscriber) this.okModalSubscriber.unsubscribe();
    }
}
