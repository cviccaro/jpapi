import { Component, AfterViewInit } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';

import { JpaModal, CONTEXT_MENU_DIRECTIVES } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [MATERIAL_DIRECTIVES, CONTEXT_MENU_DIRECTIVES]
})
export class HomeComponent implements AfterViewInit {

    ngAfterViewInit() {
        console.log('HomeComponent View Initialized', this);
    } 

    remove() {
        console.log('remove!');
    }
}
