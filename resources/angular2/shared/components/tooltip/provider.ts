import { Injectable, ViewContainerRef, ElementRef, ComponentResolver, ComponentRef, ComponentFactory, ReflectiveInjector} from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { TooltipData } from './interfaces';
import { TooltipComponent } from './component';

@Injectable()
export class JpaTooltip {
	viewContainer: ViewContainerRef;

	private _toolTipCmp: ComponentRef<TooltipComponent>;

	constructor(private _cr: ComponentResolver) { }

	registerContainer(container: ViewContainerRef) {
		this.viewContainer = container;
	}

	open(el: ElementRef, text: string, align: string) {
		return Observable.create((observer: Observer<any>) => {
			// Resolve the TooltipComponent, and build it
			this._cr.resolveComponent(TooltipComponent).then((cmpFactory: ComponentFactory<TooltipComponent>) => {
				// Just use the injector of the viewContainer that was registered
				let injector = ReflectiveInjector.fromResolvedProviders(ReflectiveInjector.resolve([
					{ provide: TooltipData, useValue: new TooltipData(el, text, align) },
				]), this.viewContainer.parentInjector);

				// Create the component, outputs a promise...
				return this.viewContainer.createComponent(cmpFactory, this.viewContainer.length, injector);
			}).then((cmpRef: ComponentRef<TooltipComponent>) => {
				// Store reference to FocusTrap component
				this._toolTipCmp = cmpRef;

				// Append it to DOM
				this.viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);

				// Resolve the FocusTrap
				observer.next(this._toolTipCmp);
				observer.complete();
			});
		});
	}

	close() {
		console.log('destroying tool tip component: ', this._toolTipCmp);
		this._toolTipCmp.destroy();
	}
}
