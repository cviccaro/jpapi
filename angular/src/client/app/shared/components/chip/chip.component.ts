import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jpa-chip',
	templateUrl: './chip.component.html',
	styleUrls: ['./chip.component.css']
})
export class ChipComponent {
	@Input() id: any;
	@Input() name: string;
	@Input() removeEnabled: boolean = true;

	@Output() onRemove = new EventEmitter();

	remove(e) {
		e.preventDefault();
		e.stopPropagation();

		this.onRemove.emit(this.id);
	}
}
