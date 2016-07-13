import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import { DivisionService, CacheService, JpaModal, Division, TooltipDirective, LoggerService } from '../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jpa-divisions',
	templateUrl: './divisions.component.html',
	styleUrls: ['./divisions.component.css'],
	directives: [ MATERIAL_DIRECTIVES, TooltipDirective ]
})
export class DivisionsComponent implements AfterViewInit {
	private state: any;
	public divisions: Division[] = [];

	constructor(
		private service: DivisionService, 
		private cache: CacheService, 
		private modal: JpaModal, 
		private toaster: ToasterService, 
		private router: Router,
		private log: LoggerService
	) {
		this.state = this.cache.get('divisions');
		this.divisions = this.state.data;
	}
	ngAfterViewInit() {
		this.log.log('DivisionComponent AfterViewInit', this);
	}

	edit(division: Division) {
		let command = ['/divisions', division.id];
		this.log.log('Route to ', command);
		this.router.navigate(command);
	}
}
