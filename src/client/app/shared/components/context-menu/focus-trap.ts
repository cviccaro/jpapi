import { Component, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'jpa-context-menu-focus-trap',
	template: '',
	styles: [
		':host { display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 75; }'
	],
	host: { '(click)': 'clickedOutside($event)'}
})
export class ContextMenuFocusTrap {
    private _clickOutsideEmitter:EventEmitter<any> = new EventEmitter<any>();

    @Output('clickOutside') get onClickOutside(): Observable<any> { return this._clickOutsideEmitter.asObservable(); }

	clickedOutside(e) {
		this._clickOutsideEmitter.emit('');
	}
}
