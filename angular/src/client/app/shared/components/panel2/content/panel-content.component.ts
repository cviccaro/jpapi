import { Component, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-content',
    templateUrl: './panel-content.component.html',
    styleUrls: ['./panel-content.component.css']
})
export class PanelContentComponent {
    hidden: boolean = true;

    @HostBinding('class.hidden') get hiddenAttr() { return this.hidden; }
}
