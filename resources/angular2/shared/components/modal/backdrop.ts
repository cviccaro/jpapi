import { Component, ElementRef, ViewChild, HostBinding } from '@angular/core';

@Component({
    selector: 'jpa-modal-backdrop',
    template: '',
})
export class ModalBackdropComponent {

    @HostBinding('class.backdrop') bdClass = true;

    constructor(public el: ElementRef) { }
}
