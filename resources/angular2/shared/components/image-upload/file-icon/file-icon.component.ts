import { Component, Input, AfterViewInit } from '@angular/core';

import { ManagedFile, ManagedImage } from '../../../models/jp-file';

@Component({
	moduleId: module.id,
	selector: 'jpa-file-icon',
	templateUrl: './file-icon.component.html',
	styleUrls: ['./file-icon.component.css' ]
})
export class FileIconComponent {
	@Input() file: ManagedFile|ManagedImage;
	@Input() size: number = 48;

	get iconUrl() {
		return this.file ? `/libs/Free-file-icons-master/${this.size}px/${this.file.extension}.png` : '';
	}

	ngAfterViewInit() {
		console.debug('FileIconComponent view initialized. ', this);
	}
}
