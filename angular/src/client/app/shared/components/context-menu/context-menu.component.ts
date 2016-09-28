import { Component, AfterViewInit, OnDestroy, Input, HostBinding, ComponentRef, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ContextMenuFocusTrapComponent } from './focus-trap';
import { JpaContextMenu } from './context-menu';
import { RegistersSubscribers }from '../../index';

@Component({
	moduleId: module.id,
	selector: 'jpa-context-menu',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements AfterViewInit, OnDestroy, RegistersSubscribers {
	backdrop: ComponentRef<ContextMenuFocusTrapComponent>;
	opened = false;
	element: ElementRef;
	_subscriptions: Subscription[] = [];

	@Input() showOnHover: boolean = false;

	private _topPos = '0px';
	private _leftPos = '0px';

	@HostBinding('style.top') get topPos() { return this._topPos; }
	@HostBinding('style.left') get leftPos() { return this._leftPos; }
	@HostBinding('attr.hidden') get hiddenAttr() { return this.opened ? null : true; }
	@HostBinding('class.hidden') get hiddenClass() { return this.opened ? false : true; }

	constructor(private service: JpaContextMenu, element: ElementRef) {
		this.element = element;
	}

	/**
	 * After Angular creates the component's view(s).
	 */
	ngAfterViewInit() {
		let sub = this.service.onClose.subscribe(e => {
			if (this.backdrop) this.backdrop.destroy();
			this.opened = false;
			this.element.nativeElement.remove();
		});
		this.registerSubscriber(sub);
	}

	/**
	 * Implemented as part of RegistersSubscribers
	 * @param {Subscription} sub
	 */
	registerSubscriber(sub: Subscription) {
		this._subscriptions.push(sub);
	}

	/**
	 * Open context menu
	 * @param {MouseEvent} e
	 */
	open(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		console.log('ContextMenuComponent.open() called.', e);

		if (this.opened) {
			return;
		}

		let sub = this.service.resolveBackdrop(this).subscribe((cmpRef: ComponentRef<ContextMenuFocusTrapComponent>) => {
			console.log('Resolved backdrop to : ', cmpRef);
			this.backdrop = cmpRef;
		});
		this.registerSubscriber(sub);

		this._topPos = (e.clientY+10) + 'px';

		if ( window.innerWidth - e.clientX < 150) {
			let targetboundingRect = (<HTMLElement>e.currentTarget).getBoundingClientRect();
			this._leftPos = (targetboundingRect.left - (window.innerWidth - e.clientX)) + 'px';
		} else {
			this._leftPos = (e.clientX+10) + 'px';
		}

		this.opened = true;
	}

	/**
	 * Cleanup just before Angular destroys the directive/component. Unsubscribe 
	 * observables and detach event handlers to avoid memory leaks.
	 */
	ngOnDestroy() {
		this._subscriptions.forEach(sub => {
			if (sub) sub.unsubscribe();
		});
		if (this.backdrop) this.backdrop.destroy();
	}
}
