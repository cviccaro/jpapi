import { Directive, HostListener, Input, ElementRef, ComponentRef, OnDestroy } from '@angular/core';

import { JpaTooltip, TooltipComponent } from './index';

@Directive({
	selector: '[jpaTooltip]'
})
export class TooltipDirective implements OnDestroy {

	@Input() tooltip: string;
	@Input() tooltipAlign: string;

	private _cmpRef: ComponentRef<TooltipComponent>;
	private _openTimer: any;
	private _hasRef = false;

	constructor(public el: ElementRef, public provider: JpaTooltip) { }

	@HostListener('mouseenter')
	onMouseEnter(e: any) {
		this.openTooltip();
	}

	@HostListener('mouseleave')
	onMouseLeave(e: any) {
		this.destroyElement();
	}

	/**
	 * Open the tooltip after an elapsed time
	 */
	openTooltip() {
		clearTimeout(this._openTimer);
		this._openTimer = setTimeout(() => {
			this.provider.open(this.el, this.tooltip, this.tooltipAlign)
				.subscribe((cmpRef: ComponentRef<TooltipComponent>) => {
					this._cmpRef = cmpRef;
					this._hasRef = true;
				});
		}, 500);
	}

	/**
	 * Dsstroy the tooltip component and clear
	 * the open timer
	 */
	destroyElement() {
		clearTimeout(this._openTimer);

		if (this._hasRef) this._cmpRef.destroy();
	}

	/**
	 * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
	 */
	ngOnDestroy() {
		this.destroyElement();
	}
}
