import {
    Component,
    AfterViewInit,
    Input,
    ViewChild,
    ElementRef,
    OnChanges,
    SimpleChanges,
    SimpleChange,
    QueryList
} from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NgSelectOption } from '@angular/forms';

import { MATERIAL_DIRECTIVES } from '../../../../shared/libs/angular2-material';

import { PanelSummaryImage } from './summary-image/index';
import { PanelSummaryImages } from './summary-images/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-summary',
    templateUrl: './panel-summary.component.html',
    styleUrls: ['./panel-summary.component.css'],
    directives: [MATERIAL_DIRECTIVES, PanelSummaryImage, PanelSummaryImages],
    viewProviders: [NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class PanelSummaryComponent implements AfterViewInit, OnChanges {
    private imageLoaded = false;
    private _currentImageSize = null;
    private _currentImageName = false;
    private _summary: string = '';
    private _selectOptions: any[];
    private _hasImage = false;

    private _imagesCount = 0;
    private _imagesQueueCount = 0;

    @Input() expanded: boolean = false;
    @Input() empty: boolean = true;
    @Input() type: string;
    @Input() value: any;
    @Input() currentImage: any;
    @Input() valueChanged: boolean = false;
    @Input() editText: string;

    @ViewChild('imagePreview') _imagePreview: ElementRef;

    set currentImageSize(v: { w: number, h: number }) {
        this._currentImageSize = v;
    }
    get currentImageSize() {
        return this._currentImageSize;
    }

    ngAfterViewInit() {
        this.summary = this.value;
    }

    report(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(this);
    }

    setOptions(options: QueryList<NgSelectOption>) {
        if (options.length) {
        	this._selectOptions = options.map(item => {
        		return {
        			value: item['_element']['nativeElement']['value'],
        			label: (<HTMLOptionElement>item['_element']['nativeElement']).innerHTML
        		};
        	});

            this.setSummaryOf(this.value);
        }
    }

    get summary(): any {
        return this._summary;
    }

    set summary(v: any) {
        //console.debug('PanelSummary'+this.type+' setting summary to ', {value: v});
        this._summary = v;
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let prop in changes) {
            let previousValue = changes[prop].previousValue;
            let currentValue = changes[prop].currentValue;
            let isFirstChange = changes[prop].isFirstChange();

            //console.debug('PanelSummary.'+this.type+'.'+prop + ' changed: ', {from: previousValue, to: currentValue, isFirstChange: isFirstChange});

            switch (prop) {
                case 'value':
                    this.setSummaryOf(currentValue);
                    this._hasImage = this.type === 'image' && this.currentImage;
                    break;
                case 'empty':
                    this.setSummaryOf(this.value);
                    this._hasImage = this.type === 'image' && this.currentImage;
                    break;
            }
        }
    }

    setSummaryOf(value: any): void {
        //console.log('PanelSummary<'+this.type+'>.setSummaryOf() called with value ', { value: value });
    	switch(this.type) {
    		case 'select':
                if (!this._selectOptions) return;

                let filtered = this._selectOptions.filter(opt => {
                    return opt['value'] == value;
                });
                if (filtered.length) {
                    this.summary = filtered[0]['label'];
                }
    			break;
            case 'images':
                if (Array.isArray(this.value)) {
                    let _new = 0;
                    let _old = 0;

                    this.value.forEach(function(val) {
                        if (val.hasOwnProperty('id')) {
                            _old++;
                        } else {
                            _new++;
                        }
                    });

                    this._imagesCount = _old;
                    this._imagesQueueCount = _new;

                    //console.debug('set count to ' + this._imagesCount + ' old and ' + this._imagesQueueCount + ' new');
                }
                break;
			default:
				this.summary = value;
		}
    }
}
