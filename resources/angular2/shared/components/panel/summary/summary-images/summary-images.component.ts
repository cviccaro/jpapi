import { Component, Input } from '@angular/core';

import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel-summary-images',
    directives: [MD_ICON_DIRECTIVES],
    templateUrl: './summary-images.component.html',
    styleUrls: ['./summary-images.component.css']
})
export class PanelSummaryImages {
    @Input() old: number = 0;
    @Input() queue: number = 0;
}
