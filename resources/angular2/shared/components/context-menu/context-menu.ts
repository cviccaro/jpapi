import { Injectable, ComponentResolver, ComponentFactory, ComponentRef, ViewContainerRef, provide, Injector, ReflectiveInjector } from '@angular/core';

import { ContextMenuFocusTrap } from './focus-trap';

@Injectable()
export class JpaContextMenu {
	private viewContainer: ViewContainerRef;
	private _cmpRef: ComponentRef<any>;

	constructor(private _cr: ComponentResolver) { }

	setContainer(vc: ViewContainerRef) {
		this.viewContainer = vc;
	}

	resolveBackdrop() {

		this._cr.resolveComponent(ContextMenuFocusTrap).then((cmpFactory: ComponentFactory<any>) => {
			let injector = this.viewContainer.parentInjector;
			return this.viewContainer.createComponent(cmpFactory, this.viewContainer.length, injector)
		}).then((cmpRef: ComponentRef<any>) => {
			this._cmpRef = cmpRef;
			document.body.appendChild(cmpRef.location.nativeElement);
		});
	}

	ngOnDestroy() {
		if (typeof this._cmpRef.instance.canDestroy === 'function') {
		  this._cmpRef.instance.canDestroy().then ( () => this._cmpRef.destroy() );
		} else {
		  this._cmpRef.destroy();
		}
	}
}
