import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';

import { PagerData } from './pager-data';

@Component({
    moduleId: module.id,
    selector: 'jpa-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css'],
    directives: [ MATERIAL_DIRECTIVES ]
})
export class PagerComponent implements OnInit, OnChanges {
    pages: any[];

    @Input() pagerData: PagerData;

    @Output() pageChanged = new EventEmitter();

    ngOnInit() {
        this.pages = new Array(this.pagerData.lastPage);
    }

    previous() {
        this.changePage(this.pagerData.currentPage - 1);
    }

    next() {
        this.changePage(this.pagerData.currentPage + 1);
    }

    changePage(page: number) {
        if (page === this.pagerData.currentPage) {
            return;
        }

        this.pageChanged.emit(page);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('pagerData')) {
            this.pages = new Array(this.pagerData.lastPage);
        }
    }
}
