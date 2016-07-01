import { Directive, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';

import { DragDropAbstractComponent } from './dragdrop.component';
import { DragDropData, DragDropService } from './dragdrop.service';

@Directive({ selector: '[jpa-draggable]' })
export class Draggable extends DragDropAbstractComponent {
	@Output() onDragStart: EventEmitter<DragDropData> = new EventEmitter<DragDropData>();
	@Output() onDragEnd: EventEmitter<DragDropData> = new EventEmitter<DragDropData>();

	constructor(el: ElementRef, service: DragDropService, cdr: ChangeDetectorRef) {
		super(el, service, cdr);
		console.log('Draggable constructed', this);
	}
}
