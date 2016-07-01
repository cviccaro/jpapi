import { Component, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

let nextUniqueId = 0;

@Component({
	selector: 'drop-zone-cell',
	template: '',
})
export class DropZoneCell {
	@Input() cols : number;

	private id = nextUniqueId++;

	@HostBinding('class.drop-zone-cell') get dropZoneCellClass() { return true; }

	@HostListener('dragenter')
	onDragEnter(event: MouseEvent) {
		console.log('Drop Zone Cell ' + this.id + ' Drag Enter', event);
	}

	@HostListener('dragleave')
	onDragLeave(event: MouseEvent) {
		console.log('Drop Zone Cell ' + this.id + ' Drag Leave', event);
	}

	constructor(public el: ElementRef) { }

	ngOnInit() {
		this.el.nativeElement.style.width = 'calc(100% / ' + this.cols + ')';
		console.log('DropZoneCell directive initialized.', this);
	}
}
