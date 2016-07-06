import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit,
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
    template: '<jpa-modal class="jpa-modal-wrapper" #modal [config]="config"></jpa-modal><jpa-modal-backdrop #backdrop></jpa-modal-backdrop>',
    styleUrls: ['./container.css'],
    directives: [ ModalBackdropComponent, ModalComponent ]
})
export class ModalContainerComponent implements OnInit, OnDestroy {
    public config: ModalConfig;
    private opened = false;

    private openModalSubscriber: Subscription;
    private actionSubscriber: Subscription;
    private okModalSubscriber: Subscription;

    @HostBinding('attr.hidden') get hiddenAttr() { return this.opened ? null : true; }

    @ViewChild('backdrop') private backdrop: ModalBackdropComponent;
    @ViewChild('modal') private modal: ModalComponent;

    constructor(public el: ElementRef, private service: JpaModal, private ref : ChangeDetectorRef) {

    }

    ngOnInit() {
        this.registerSubscribers();
        console.log('ModalContainerComponent initialized.', this);
    }

    ngAfterViewInit() {
        console.log('ModalContainerComponent View Initialized', this);
    }

    private registerSubscribers() {
        this.openModalSubscriber = this.service.openModal.subscribe((config: ModalConfig) => {
            console.log('open modal!', config);
            this.config = config;
            this.opened = true;
        });
        this.actionSubscriber = this.modal.onAction.subscribe((e) => {
            console.log('modal button clicked', e);
            this.opened = false;
            this.service.buttonClicked.next(e);
        });
    }

    ngOnDestroy() {
        if (this.openModalSubscriber) this.openModalSubscriber.unsubscribe();
        if (this.okModalSubscriber) this.okModalSubscriber.unsubscribe();
    }
}
