import { Component, OnInit } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';

import { PANEL2_DIRECTIVES, PanelFormControl, PanelFormControlFile, DivisionService } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [MATERIAL_DIRECTIVES, PANEL2_DIRECTIVES]
})
export class HomeComponent implements OnInit {
	controls: PanelFormControl<any>[];
	ready: boolean = false;

	model: any;

	constructor(public divisionService: DivisionService) {
		this.controls = [
			new PanelFormControlFile({
				name: 'image',
				label: 'Background',
				required: true,
				type: 'image'
			})
		];
	}

	ngOnInit() {
		this.divisionService.find(3).subscribe(division => {
			this.model = division;
			this.ready = true;
			console.log('got model!', division);
		});
	}

	onSubmit(model) {
		console.log('HomeComponent on submit ', model);
	}
}
