import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jpa-context-menu-item',
	template: '<ng-content></ng-content>',
	styleUrls: ['./menu-item.css']
})
export class ContextMenuItem { }
