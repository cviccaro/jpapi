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
    directives: [MATERIAL_DIRECTIVES]
})
export class HomeComponent { }
