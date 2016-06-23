import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms/index';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MD_RADIO_DIRECTIVES, MdRadioDispatcher} from '@angular2-material/radio';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [MdRadioDispatcher, MdIconRegistry],
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MD_BUTTON_DIRECTIVES,
        MD_CHECKBOX_DIRECTIVES,
        MD_RADIO_DIRECTIVES,
        MD_PROGRESS_CIRCLE_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_PROGRESS_BAR_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        MD_TABS_DIRECTIVES
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