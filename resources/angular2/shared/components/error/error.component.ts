import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'jpa-error',
    moduleId: module.id,
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    @Input() ajaxResponse;
    @Input() message;

    ngOnInit() {
        if (this.ajaxResponse !== undefined) {
            console.log('show an ajax error: ', this.ajaxResponse);
        }
    }
}
