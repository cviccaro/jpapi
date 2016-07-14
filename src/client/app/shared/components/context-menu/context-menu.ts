import {
	Injectable,
	ComponentResolver,
	ComponentFactory,
	ComponentRef,
	ViewContainerRef,
	Output,
	OnDestroy,
	EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuFocusTrapComponent } from './focus-trap';

@Injectable()
export class JpaContextMenu implements OnDestroy {
	private viewContainer: ViewContainerRef;
	private _focusTrapRef: ComponentRef<any>;
	private _closeEmitter: EventEmitter<any> = new EventEmitter<any>();

	@Output() get onClose(): Observable<any> { return this._closeEmitter.asObservable(); }

	constructor(private _cr: ComponentResolver) { }

	registerContainer(vc: ViewContainerRef) {
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
			this._cr.resolveComponent(ContextMenuFocusTrapComponent).then((cmpFactory: ComponentFactory<any>) => {
				// Create the component, outputs a promise...
				return this.viewContainer.createComponent(cmpFactory, this.viewContainer.length);
			}).then((cmpRef: ComponentRef<ContextMenuFocusTrapComponent>) => {
				// Store reference to FocusTrap component
				this._focusTrapRef = cmpRef;

				// Subscribe to focus trap's event
				(<ContextMenuFocusTrapComponent>this._focusTrapRef.instance).onClickOutside.subscribe(e => {
					this.close();
				});

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
