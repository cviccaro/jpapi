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

import { PanelSummaryImage } from '../summary-image/summary-image.component';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-summary',
    templateUrl: './panel-summary.component.html',
    styleUrls: ['./panel-summary.component.css'],
    directives: [MATERIAL_DIRECTIVES, PanelSummaryImage],
    viewProviders: [NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class PanelSummaryComponent implements AfterViewInit, OnChanges {
    private imageLoaded = false;
    private _currentImageSize = null;
    private _currentImageName = false;
    private _summary: string = '';
    private _selectOptions: any[];

    @Input() expanded: boolean = false;
    @Input() empty: boolean = true;
    @Input() type: string;
    @Input() gallery: any;
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
        	})
        }
    }

    get summary(): any {
        return this._summary;
    }

    set summary(v: any) {
        this._summary = v;
    }

    ngOnChanges(changes: SimpleChanges) {
        //console.log('PanelSummary changed something: ', changes);
        for (let prop in changes) {
            let previousValue = changes[prop].previousValue;
            let currentValue = changes[prop].currentValue;
            let isFirstChange = changes[prop].isFirstChange;
            console.log('PanelSummary.'+prop + ' changed: ', {from: previousValue, to: currentValue, isFirstChange: isFirstChange});

            switch (prop) {
                case 'value':
                    this.setSummaryOf(currentValue);
                    break;
            }
        }
    }

    setSummaryOf(value: any) {
    	switch(this.type) {
    		case 'select':
                let filtered = this._selectOptions.filter(opt => {
                    return opt['value'] == value;
                });
                if (filtered.length) {
                    this.summary = filtered[0]['label'];
                }
    			break;
			default:
				this.summary = value;
		}
    }

    // set summary(value: any) {
    //     switch(this.type) {
    //         case 'select':
    //             let interval = setInterval(() => {
    //                 let filtered = this._optionChildren.filter(opt => {
    //                     return opt['_element']['nativeElement']['value'] == this._value;
    //                 });
    //                 if (filtered.length) {
    //                     this._summary = filtered[0]['_element']['nativeElement']['innerHTML'];
    //                     clearInterval(interval);
    //                 }
    //             }, 250);
    //             break;
    //         case 'image':
    //             this._summary = value || '';
    //             break;
    //         case 'images':
    //             this._setGallerySummary();
    //             break;
    //         default:
    //             this._summary = value;
    //     }
    //     // console.debug('JpaPanel.'+this.type+' ' + this.name + '#set summary(): ', this._summary);
    // }

    // private _setGallerySummary() {
    //     if (this.gallery.length) {
    //         this._summary = this.gallery.length + ' pictures in gallery';
    //     } else {
    //         this._summary = '';
    //     }
    // }
}
