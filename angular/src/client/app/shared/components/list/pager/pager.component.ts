import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { PagerData } from './pager-data';

@Component({
    moduleId: module.id,
    selector: 'jpa-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit, OnChanges {
    pages: any[];

    @Input() pagerData: PagerData;

    @Output() pageChanged = new EventEmitter();

    ngOnInit() {
        this.pages = new Array(this.pagerData.last_page);
    }

    previous() {
        this.changePage(this.pagerData.current_page - 1);
    }

    next() {
        this.changePage(this.pagerData.current_page + 1);
    }

    changePage(page: number) {
        if (page === this.pagerData.current_page) {
            return;
        }

        this.pageChanged.emit(page);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('pagerData')) {
            this.pages = new Array(this.pagerData.last_page);
        }
    }
}
