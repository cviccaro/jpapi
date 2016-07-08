import { ElementRef } from '@angular/core';

export class TooltipData {
	el: ElementRef;
	text: string;
	align: string;

	constructor(el: ElementRef, text: string, align: string = 'right') {
		this.el = el;
		this.text = text;
		this.align = align;
	}
}
