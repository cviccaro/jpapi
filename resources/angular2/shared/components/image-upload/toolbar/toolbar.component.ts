import { Component, AfterViewInit, Input } from '@angular/core';

import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';
import { ManagedImage } from '../../../models/jp-file';
@Component({
    moduleId: module.id,
    selector: 'jpa-image-upload-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css' ],
    directives: [ MATERIAL_DIRECTIVES ]
})
export class ImageUploadToolbar implements AfterViewInit {
    @Input() image: ManagedImage;

    ngAfterViewInit() {
        console.log('ImageUploadTOolbar AFter View Init', this);
    }
}
