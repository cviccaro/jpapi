import { Component, AfterViewInit, AfterContentInit, ContentChildren, QueryList, HostBinding } from '@angular/core';

import { PanelComponent } from '../panel2.component';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-group',
    template: '<ng-content></ng-content>',
    styleUrls: ['./panel-group.component.css'],
    directives: [PanelComponent]
})
export class PanelGroupComponent implements AfterContentInit {
    @HostBinding('class.child-expanded') get expandedClass() { return this.childExpanded; }

    childExpanded: boolean = false;

    @ContentChildren(PanelComponent) private _panelChildren : QueryList<PanelComponent>;

    ngAfterContentInit() {
        this._panelChildren.forEach(panel => {
            panel.onToggle.subscribe((expanded: boolean) => {
                this.childExpanded = !!this._panelChildren.filter(panel => panel.expanded).length
            });
        })
    }
}
