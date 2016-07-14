import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {
	DivisionService,
	CacheService,
	JpaModal,
	Division,
	TooltipDirective,
	LoggerService,
	CONTEXT_MENU_DIRECTIVES
} from '../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jpa-divisions',
	templateUrl: './divisions.component.html',
	styleUrls: ['./divisions.component.css'],
	directives: [ MATERIAL_DIRECTIVES, CONTEXT_MENU_DIRECTIVES, TooltipDirective ]
})
export class DivisionsComponent implements AfterViewInit {
	public divisions: Division[] = [];

	private state: any;

	constructor(
		public service: DivisionService,
		public cache: CacheService,
		public modal: JpaModal,
		public toaster: ToasterService,
		public router: Router,
		public log: LoggerService
	) {
		this.state = this.cache.get('divisions');
		this.divisions = this.state.data;
	}

	/**
	 *  After Angular creates the component's view(s).
	 */
	ngAfterViewInit() {
		this.log.log('DivisionComponent AfterViewInit', this);
	}

	/**
	 * Navigate to the edit page
	 * @param {Division} division
	 */
	edit(division: Division) {
		let command = ['/divisions', division.id];
		this.log.log('Route to ', command);
		this.router.navigate(command);
	}
}
