import {
	Injectable,
	ComponentResolver,
	ComponentFactory,
	ComponentRef,
	ViewContainerRef,
	Output,
	EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuFocusTrap } from './focus-trap';

@Injectable()
export class JpaContextMenu {
	private viewContainer: ViewContainerRef;
	private _focusTrapRef: ComponentRef<any>;
	private _closeEmitter: EventEmitter<any> = new EventEmitter<any>();

	@Output() get onClose(): Observable<any> { return this._closeEmitter.asObservable(); }

	constructor(private _cr: ComponentResolver) { }

	setContainer(vc: ViewContainerRef) {
		// @todo: there must be a better way to get the container than
		// having to register it in a "root" component
		this.viewContainer = vc;
	}

	resolveBackdrop(component: ContextMenuComponent) {
		return Observable.create(observer => {
			// Avoid z-index issues by moving menu to body.
			// @todo: avoid messing with DOM..
			document.body.appendChild(component.element.nativeElement);

			// Resolve the ContextMenuComponent, and build it
			this._cr.resolveComponent(ContextMenuFocusTrap).then((cmpFactory: ComponentFactory<any>) => {
				// Just use the injector of the viewContainer that was registered
				let injector = this.viewContainer.parentInjector;

				// Create the component, outputs a promise...
				return this.viewContainer.createComponent(cmpFactory, this.viewContainer.length, injector);
			}).then((cmpRef: ComponentRef<ContextMenuFocusTrap>) => {
				// Store reference to FocusTrap component
				this._focusTrapRef = cmpRef;

				// Subscribe to focus trap's event
				(<ContextMenuFocusTrap>this._focusTrapRef.instance).onClickOutside.subscribe(e => {
					this.close();
				})

				// Append it to DOM
				this.viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);

				// Resolve the FocusTrap
				observer.next(this._focusTrapRef);
				observer.complete();
			});
		});
	}

	close() {
		this._closeEmitter.emit(true);
	}

	ngOnDestroy() {
		if (typeof this._focusTrapRef.instance.canDestroy === 'function') {
		  this._focusTrapRef.instance.canDestroy().then ( () => this._focusTrapRef.destroy() );
		} else {
		  this._focusTrapRef.destroy();
		}
	}
}
