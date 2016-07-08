import { Directive, HostListener, Input, ElementRef, ComponentRef } from '@angular/core';

import { JpaTooltip, TooltipComponent } from './index';

@Directive({
	selector: '[jpa-tooltip]'
})
export class TooltipDirective {
	constructor(public el: ElementRef, public provider: JpaTooltip) { }

	private _cmpRef: ComponentRef<TooltipComponent>;

	@Input() tooltip: string;
	@Input() tooltipAlign: string;

	@HostListener('mouseenter')
	onMouseEnter(e: any) {
		this.provider.open(this.el, this.tooltip, this.tooltipAlign)
			.subscribe((e: ComponentRef<TooltipComponent>) => {
				this._cmpRef = e;
			})
	}

	@HostListener('mouseleave')
	onMouseLeave(e: any) {
		this._cmpRef.destroy();
	}
}
