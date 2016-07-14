import {
    Component,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-bar-title',
    template: '<ng-content></ng-content>'
})
export class PanelBarTitleComponent {
    @Output() onClick = new EventEmitter();

    @HostListener('click', ['$event'])
    _onClick(evt: Event) {
        this.onClick.emit(evt);
    }
}

@Component({
    moduleId: module.id,
    selector: 'jpa-panel2-bar-subtitle',
    template: '<ng-content></ng-content>'
})
export class PanelBarSubtitleComponent {
    @Output() onClick = new EventEmitter();

    @HostListener('click', ['$event'])
    _onClick(evt: Event) {
        this.onClick.emit(evt);
    }
}
