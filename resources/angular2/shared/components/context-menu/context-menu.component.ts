import { Component, AfterViewInit, OnDestroy, HostBinding, ComponentRef, ElementRef } from '@angular/core';

import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';

import { ContextMenuItem } from './menu-item';
import { ContextMenuFocusTrap } from './focus-trap';
import { JpaContextMenu } from './context-menu';

import { Subscription } from 'rxjs/Rx';

@Component({
	moduleId: module.id,
	selector: 'jpa-context-menu',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.css'],
	directives: [ MATERIAL_DIRECTIVES, ContextMenuItem, ContextMenuFocusTrap ]
})
export class ContextMenuComponent implements AfterViewInit, OnDestroy {
	public opened = false;
	public element: ElementRef;

	private _topPos = '0px';
	private _leftPos = '0px';

	private backdrop: ComponentRef<ContextMenuFocusTrap>;
	private backdropSubscription: Subscription;
	private closeSubscriber: Subscription;

	@HostBinding('style.top') get topPos() { return this._topPos; }
	@HostBinding('style.left') get leftPos() { return this._leftPos; }
	@HostBinding('attr.hidden') get hiddenAttr() { return this.opened ? null : true; }

	constructor(private service: JpaContextMenu, element: ElementRef) {
		this.element = element;
	}

	ngAfterViewInit() {
		console.log('ContextMenu View Initialized.', this);

		this.registerSubscribers();
	}

	registerSubscribers() {
		this.closeSubscriber = this.service.onClose.subscribe(e => {
			this.opened = false;
			if (this.backdrop) this.backdrop.destroy();
			console.log('setting opened to false motherfucker', this);
		});
	}

	open(e: any) {
		e.preventDefault();
		e.stopPropagation();

		if (this.opened) {
			return;
		}

		this.backdropSubscription = this.service.resolveBackdrop(this).subscribe((cmpRef: ComponentRef<ContextMenuFocusTrap>) => {
			this.backdrop = cmpRef;
		});

		this._topPos = (e.clientY+10) + 'px';
		this._leftPos = (e.clientX+10) + 'px';
		this.opened = true;
	}

	ngOnDestroy() {
		if (this.closeSubscriber) this.closeSubscriber.unsubscribe();
		if (this.backdropSubscription) this.backdropSubscription.unsubscribe();
		if (this.backdrop) this.backdrop.destroy();
	}
}
