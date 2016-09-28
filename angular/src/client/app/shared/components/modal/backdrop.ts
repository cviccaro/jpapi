import { Component, ElementRef, HostBinding } from '@angular/core';

@Component({
    selector: 'jpa-modal-backdrop',
    template: '',
})
export class ModalBackdropComponent {
    @HostBinding('class.backdrop') bdClass = true;

    constructor(public el: ElementRef) {
    	console.log('ModalBackdrop constructed.', this);
    }
}
