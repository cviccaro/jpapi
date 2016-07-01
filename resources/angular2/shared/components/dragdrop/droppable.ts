import { Directive, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';

import { DragDropAbstractComponent } from './dragdrop.component';
import { DragDropData, DragDropService } from './dragdrop.service';

@Directive({ selector: '[jpa-droppable]' })
export class Droppable extends DragDropAbstractComponent {
	constructor(el: ElementRef, service: DragDropService, cdr: ChangeDetectorRef) {
		super(el, service, cdr);
		console.log('Droppable constructed', this);
	}
}
