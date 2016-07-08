import { 
	ComponentRef,
	ComponentResolver,
	ComponentFactory,
	ElementRef,
	Injectable,
	ReflectiveInjector,
	ViewContainerRef
} from '@angular/core';
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
				// Create reflective injector to provide an instance of TooltipData 
				let providers = ReflectiveInjector.resolve([
					{ provide: TooltipData, useValue: new TooltipData(el, text, align) },
				]);
				let injector = ReflectiveInjector.fromResolvedProviders(providers, this.viewContainer.parentInjector);

				// Create the component, outputs a promise...
				return this.viewContainer.createComponent(cmpFactory, this.viewContainer.length, injector);
			}).then((cmpRef: ComponentRef<TooltipComponent>) => {
				// Store reference to TooltipComponent
				this._toolTipCmp = cmpRef;

				// Append it to DOM
				this.viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);

				// Resolve the component
				observer.next(this._toolTipCmp);
				observer.complete();
			});
		});
	}

	close() {
		if (this._toolTipCmp) this._toolTipCmp.destroy();
	}
}
