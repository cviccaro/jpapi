import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TimeAgoPipe, CalendarPipe} from 'angular2-moment';

import { MATERIAL_DIRECTIVES } from '../../libs/angular2-material';

@Component({
    selector: 'jpa-list',
    moduleId: module.id,
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    directives: [
        MATERIAL_DIRECTIVES
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

    ngOnInit() {
        console.log('ListComponent initialized.', this);
    }

    fetch() {
        this.listUpdate.emit({
            config: this.listConfig,
            data: this.listData
        });
    }

    edit(item, $event) {
        this.listItemEdit.emit(item);
    }

    delete(item, $event) {
        this.listItemDelete.emit(item);
    }
}
