import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import {
	CacheService,
	LoggerService,
	SettingsService,
	PANEL2_DIRECTIVES,
	PanelFormControl,
	PanelFormControlTextfield,
	PanelFormControlFile
} from '../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jpa-settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.css' ],
	directives: [ PANEL2_DIRECTIVES ]
})
export class SettingsComponent implements OnInit {
	controls: PanelFormControl<any>[] = [];
	ready: boolean = false;

	model: any = {};
	settings: any[];

	saving: boolean = false;

	constructor(
		public cache: CacheService,
		public log: LoggerService,
		public service: SettingsService,
		public toaster: ToasterService
	) {
		this.settings = this.cache.get('settings');
		this.parseSettings();

		this.log.log('SettingsComponent constructed', this);
	}

	parseSettings(): void {
		this.ready = false;
		this.controls = [];

		this.settings.forEach(setting => {
			console.log('Parsing setting ', setting);
			this.settings[setting.name] = setting.value;

			switch(setting.control_type) {
				case 'text':
					this.controls.push(new PanelFormControlTextfield({
						name: setting.name,
						label: setting.label,
						hint: setting.description
					}));

					this.model[setting.name] = setting.value;
					break;
				case 'file':
					let config = {
						name: setting.name,
						label: setting.label,
						type: setting.type,
						hint: setting.description
					};
					this.controls.push(new PanelFormControlFile(config));

					this.model[setting.name] = setting.value;
					break;
			}
		});

		this.log.log('Settings after parse: ', {settings: this.settings, model: this.model});

		setTimeout(() => this.ready = true);
	}

	ngOnInit() {
		this.settings = this.cache.get('settings');

		this.ready = true;

		this.log.log('SetingsComponent initialized!', this);
	}

	onSubmit(model) {
		console.log('SettingsComponent on submit ', model);

		this.saving = true;

		// map back to settings objects
		for (var key in model) {
			let setting = this.settings.find(setting => setting.name === key);

			if (setting) {
				let index = this.settings.indexOf(setting);

				this.settings[index].value = model[key];
			}
		}

		this.service.updateMany(this.settings)
			.subscribe(res => {
				this.log.info('SettingsComponent received response from updateMany after form onSubmit', res);
				this.saving = false;
				this.settings = res;
				this.parseSettings();
				this.toaster.pop('success', 'Success!', 'Your changes to the settings have been saved.');
			});
	}
}
