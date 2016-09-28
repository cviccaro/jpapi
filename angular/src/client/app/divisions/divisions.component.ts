import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import {
	DivisionService,
	CacheService,
	JpaModal,
	Division,
	JpaContextMenu,
	LoggerService,
} from '../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jpa-divisions',
	templateUrl: './divisions.component.html',
	styleUrls: ['./divisions.component.css']
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
		public menu: JpaContextMenu,
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
		this.menu.close();
		let command = ['/admin/divisions', division.id];
		this.log.log('Route to ', command);
		this.router.navigate(command);
	}
}
