import { Directive, HostListener, Input, ElementRef, ComponentRef, OnDestroy } from '@angular/core';

import { JpaTooltip, TooltipComponent } from './index';

@Directive({
	selector: '[jpa-tooltip]'
})
export class TooltipDirective implements OnDestroy {
	constructor(public el: ElementRef, public provider: JpaTooltip) { }

	private _cmpRef: ComponentRef<TooltipComponent>;
	private _openTimer: any;
	private _hasRef = false;

	@Input() tooltip: string;
	@Input() tooltipAlign: string;

	@HostListener('mouseenter')
	onMouseEnter(e: any) {
		clearTimeout(this._openTimer);
		this._openTimer = setTimeout(() => {
			this.provider.open(this.el, this.tooltip, this.tooltipAlign)
				.subscribe((e: ComponentRef<TooltipComponent>) => {
					this._cmpRef = e;
					this._hasRef = true;
				});
		}, 500);
	}

	@HostListener('mouseleave')
	onMouseLeave(e: any) {
		clearTimeout(this._openTimer);
		this.destroyElement();
	}

	destroyElement() {
		if (this._hasRef) {
			this._cmpRef.destroy();
		}
	}

	ngOnDestroy() {
		this.destroyElement();
	}
}
