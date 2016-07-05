import { Component, Input, Output, AfterViewInit, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';

import { PagerData } from './pager-data';

@Component({
    moduleId: module.id,
    selector: 'jpa-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css'],
    directives: [ MATERIAL_DIRECTIVES ]
})
export class PagerComponent implements OnInit, AfterViewInit, OnChanges {
    public pages: any[];

    @Input() pagerData: PagerData;

    @Output() pageChanged = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.pages = new Array(this.pagerData.lastPage);
    }

    ngAfterViewInit() {
        console.log('PagerComponent AfterViewInit', this);
    }

    previous() {
        console.log('pager previous from ' + this.pagerData.currentPage + ' to ' + (this.pagerData.currentPage - 1));
        this.changePage(this.pagerData.currentPage - 1);
    }

    next() {
        console.log('pager next from ' + this.pagerData.currentPage + ' to ' + (this.pagerData.currentPage + 1));
        this.changePage(this.pagerData.currentPage + 1);
    }

    changePage(page: number) {
        if (page === this.pagerData.currentPage) {
            return;
        }

        this.pageChanged.emit(page);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('PagerComponent changed :', changes);
        if (changes.hasOwnProperty('pagerData')) {
            this.pages = new Array(this.pagerData.lastPage);
        }
    }
}
