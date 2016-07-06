import { Component, ElementRef, ViewChild, AfterViewInit, HostBinding } from '@angular/core';

@Component({
    selector: 'jpa-modal-backdrop',
    template: '',
})
export class ModalBackdropComponent {

    @HostBinding('class.backdrop') bdClass = true;

    constructor(public el: ElementRef) {

    }

    ngAfterViewInit() {
        console.log('ModalBackdropComponent View Initialized', this);
    }
}
