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
     * @param {[type]} item   [description]
     * @param {[type]} $event [description]
     */
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
