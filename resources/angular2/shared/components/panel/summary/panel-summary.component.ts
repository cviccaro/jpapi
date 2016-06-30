import { Component, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';

import { MATERIAL_DIRECTIVES } from '../../../../shared/libs/angular2-material';

@Component({
	moduleId: module.id,
	selector: 'jpa-panel-summary',
	templateUrl: './panel-summary.component.html',
	styleUrls: ['./panel-summary.component.css'],
	directives: [MATERIAL_DIRECTIVES]
})
export class PanelSummaryComponent implements AfterViewInit {
	private imageLoaded = false;
	private _currentImageSize = null;
	private _currentImageName = false;
	@Input() summary: string = '';
	@Input() expanded: boolean = false;
	@Input() empty: boolean = true;
	@Input() type: string;
	@Input() gallery: any;
	@Input() value: any;
	@Input() currentImage: any;
	@Input() valueChanged: boolean = false;
	@Input() editText: string;

	@ViewChild('imagePreview') _imagePreview : ElementRef;

	set currentImageSize(v: {w: number, h: number}) {
	    this._currentImageSize = v;
	}
	get currentImageSize() {
		return this._currentImageSize;
	}
	    

	ngAfterViewInit() {
		console.log('PanelSummary# AfterViewInit', this);
		if (this._imagePreview) {
			console.log('Binding to image preview to check its loaded status ', this._imagePreview);
			(<HTMLImageElement>this._imagePreview.nativeElement).addEventListener('load', e => {
				this.imageLoaded = true;
				this.currentImageSize = {w: this._imagePreview.nativeElement.naturalWidth, h: this._imagePreview.nativeElement.naturalHeight};
				const parts = this._imagePreview.nativeElement.currentSrc.split('/');
				this._currentImageName = parts[parts.length - 1];
				console.log(this);
			})
		} else {
			console.log('Skipping image preview check because it is does not exist. ', this);
		}
	}
}
