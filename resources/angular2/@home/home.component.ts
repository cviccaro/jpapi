import { Component } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [
        MATERIAL_DIRECTIVES
    ]
})
export class HomeComponent {

    progress: number = 0;

    constructor() {
        // Update the value for the progress-bar on an interval.
        setInterval(() => {
          this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
        }, 200);
    }
}