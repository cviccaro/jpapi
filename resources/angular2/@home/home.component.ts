import { Component, ContentChild, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';

import { JpaModal } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [MATERIAL_DIRECTIVES]
})
export class HomeComponent implements AfterViewInit {
    constructor(public modal: JpaModal, viewContainer: ViewContainerRef) {
        //this.modal.setContainer(viewContainer);
    }

    ngAfterViewInit() {
        console.log('HomeComponent View Initialized', this);
    }

    hello() {
        // this.modal.open({title: 'title!', message: 'message!', cancelText: 'cancel', okText: 'Discard'}).subscribe((...args) => {
        //     console.log('home component opened modal subscription resolution: ', args);
        // });
       // return this.modal.alert().size('lg').showClose(true).title('SUP!').open();
    }
}
