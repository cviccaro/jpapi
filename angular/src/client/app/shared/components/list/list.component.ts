import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'jpa-list',
    moduleId: module.id,
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {

    @Input() listTitle: string;
    @Input() listConfig: any;
    @Input() listData: any[];

    @Output() listUpdate = new EventEmitter();
    @Output() listItemEdit = new EventEmitter();
    @Output() listItemDelete = new EventEmitter();
    @Output() listItemAdd = new EventEmitter();

    @Output() onPageChange = new EventEmitter();

    /**
     * Handle add-to-list button click
     */
    add() {
        this.listItemAdd.emit({});
    }

    /**
     * Handle any fetch call
     */
    fetch() {
        this.listUpdate.emit({});
    }

    /**
     * Handle edit button click
     */
    edit(item: any, $event: any) {
        this.listItemEdit.emit(item);
    }

    /**
     * Handle delete button click
     */
    delete(item: any, $event: any) {
        this.listItemDelete.emit(item);
    }

    pageChanged(num: number) {
        this.onPageChange.emit(num);
    }
}
