import { Component, AfterViewInit, HostBinding, ComponentResolver, ComponentFactory } from '@angular/core';

import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';

import { ContextMenuItem } from './menu-item';
import { ContextMenuFocusTrap } from './focus-trap';
import { JpaContextMenu } from './context-menu';

@Component({
	moduleId: module.id,
	selector: 'jpa-context-menu',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.css'],
	directives: [ MATERIAL_DIRECTIVES, ContextMenuItem, ContextMenuFocusTrap ] 
})
export class ContextMenuComponent implements AfterViewInit {
	private opened = false;
	private _topPos = '0px';
	private _leftPos = '0px';

	@HostBinding('style.top') get topPos() { return this._topPos; }
	@HostBinding('style.left') get leftPos() { return this._leftPos; }
	@HostBinding('attr.hidden') get hiddenAttr() { return this.opened ? null : true; }

	constructor(private _cr: ComponentResolver, private service: JpaContextMenu) { }

	ngAfterViewInit() {
		console.log('ContextMenu View Initialized.', this);
	}

	open(e: any) {
		e.preventDefault();
		e.stopPropagation();

		if (this.opened) {
			return;
		}
		
		this.service.resolveBackdrop();

		this._topPos = (e.clientY+10) + 'px';
		this._leftPos = (e.clientX+10) + 'px';
		this.opened = true;
	}
}
