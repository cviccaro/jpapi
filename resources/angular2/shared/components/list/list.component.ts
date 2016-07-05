import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TimeAgoPipe, CalendarPipe} from 'angular2-moment';

import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';

import { PagerComponent, PagerData } from './pager/index';

@Component({
    selector: 'jpa-list',
    moduleId: module.id,
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        PagerComponent
    ],
    pipes: [TimeAgoPipe, CalendarPipe]
})
export class ListComponent implements OnInit {

    @Input() listTitle: string;
    @Input() listConfig: any;
    @Input() listData: any[];

    @Output() listUpdate = new EventEmitter();
    @Output() listItemEdit = new EventEmitter();
    @Output() listItemDelete = new EventEmitter();
    @Output() listItemAdd = new EventEmitter();

    @Output() onPageChange = new EventEmitter();

    ngOnInit() {
        console.log('ListComponent initialized.', this);
    }

    add() {
        this.listItemAdd.emit({});
    }

    fetch() {
        this.listUpdate.emit({});
    }

    edit(item, $event) {
        this.listItemEdit.emit(item);
    }

    delete(item, $event) {
        this.listItemDelete.emit(item);
    }

    pageChanged(num: number) {
        this.onPageChange.emit(num);
    }
}
