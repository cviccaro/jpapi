import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jpa-file-icon',
	templateUrl: './file-icon.component.html',
	styleUrls: ['./file-icon.component.css' ]
})
export class FileIconComponent {
	@Input() extension: string;
	@Input() size: number = 48;

	get iconUrl() {
		return this.extension ?
			`/assets/Free-file-icons-master/${this.size}px/${this.extension}.png`
			: '';
	}
}
