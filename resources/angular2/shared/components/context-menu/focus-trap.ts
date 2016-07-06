import { Component } from '@angular/core';

@Component({
	selector: 'jpa-context-menu-focus-trap',
	template: '',
	styles: [
		':host { display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 75; }'
	],
	host: { '(click)': 'destroy()'}
})
export class ContextMenuFocusTrap {
	destroy() {
		console.log('FocusTrap Destroy');
	}
}
