import { Component, Input } from '@angular/core';

import { DropZoneCell } from './drop-zone-cell';

import { Droppable } from '../droppable';

@Component({
	moduleId: module.id,
	selector: 'jpa-image-upload-drop-zones',
	templateUrl: './drop-zones.component.html',
	styleUrls: ['./drop-zones.component.css'],
	directives: [DropZoneCell, Droppable]
})
export class ImageUploadDropZones {
	@Input() cols;
	@Input() rows;

	private _rows: any[];
	private _cols: any[];

	ngOnInit() {
		this._rows = new Array(this.rows);
		this._cols = new Array(this.cols);
		console.log('DropZones Component initialized', this);
	}
}
