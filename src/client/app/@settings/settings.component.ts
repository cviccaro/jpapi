import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import {
	CacheService,
	LoggerService,
	SettingsService,
	PANEL2_DIRECTIVES,
	PanelFormControl,
	PanelFormControlTextfield,
	PanelFormControlFile,
	SettingFormControl
} from '../shared/index';
import {PanelFormControlTextarea} from '../shared/components/panel2/form/control/control.textarea';

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
	settings: SettingFormControl[];

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

		this.settings.forEach((setting:SettingFormControl) => {
			this.log.debug('Parsing setting ', setting);

			switch(setting.control_type) {
				case 'text':
					this.controls.push(new PanelFormControlTextfield({
						name: setting.name,
						label: setting.label,
						hint: setting.description
					}));

					this.model[setting.name] = setting.value;
					break;
				case 'textarea':
					this.controls.push(new PanelFormControlTextarea({
						name: setting.name,
						label: setting.label,
						hint: setting.description,
						ckeditor: true
					}));
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

		this.log.debug('Settings after parse: ', {settings: this.settings, model: this.model});

		setTimeout(() => this.ready = true);
	}

	ngOnInit() {
		this.ready = true;
		this.log.debug('SetingsComponent initialized!', this);
	}

	onSubmit(model) {
		this.log.log('SettingsComponent on submit ', model);

		this.log.log(Object.assign({},this.settings));

//		this.saving = true;

		// inject form model values
		for (var key in model) {
			let setting = this.settings.find(setting => setting.name === key);

			if (setting) {
				let index = this.settings.indexOf(setting);

				this.settings[index].value = model[key];
			}
		}

		this.log.log(this.settings);

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
