import { Component, HostBinding } from '@angular/core';

import { TooltipData } from './index';

@Component({
	moduleId: module.id,
	selector: 'jpa-tooltip',
	template: '<div class="tooltip">{{ text }}</div>',
	styleUrls: ['./tooltip.css']
})
export class TooltipComponent {
	private _top: number = 0;
	private _left: number = 0;

	private text: string;

	@HostBinding('style.top') get topStyle() { return this._top + 'px'; }
	@HostBinding('style.left') get leftStyle() { return this._left + 'px'; }

	constructor(public data: TooltipData) {
		let boundingRect = this.data.el.nativeElement.getBoundingClientRect();

		this._top = boundingRect.top + (boundingRect.height / 4);

		if (data.align === 'left') {
			this._left = boundingRect.left - (this.data.text.length * 10);
		} else {
			this._left = boundingRect.left + boundingRect.width + 12;
		}

		this.text = this.data.text;
	}
}
