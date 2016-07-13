import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';

@Component({
	moduleId: module.id,
	selector: 'jpa-chip',
	templateUrl: './chip.component.html',
	styleUrls: ['./chip.component.css'],
	directives: [ MATERIAL_DIRECTIVES ]
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
