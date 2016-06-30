import { Component, ContentChild, ViewChild } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import { NgForm } from '@angular/forms';

import { FileUploader, ImageUploadComponent } from '../shared/index';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        ImageUploadComponent,
        NgForm
    ],
    providers: [FileUploader]
})
export class HomeComponent {
    public model: any;

    @ViewChild(ImageUploadComponent) _uploadCmp: ImageUploadComponent;

    // ngAfterViewInit() {
    //     console.log('HomeComponent view initialized.', this);
    // }

    // handleChange(e) {
    //     console.log('HOME --- handleChange', e);
    // }

    // fileAdded(e) {
    //     console.log('HOME --- fileAdded', e);
    // }

    // imageAdded(e) {
    //     console.log('HOME --- IMAGE ADDED TO GRID ', e);
    // }

    // imageLoaded(e) {
    //     console.log('HOME --- IMAGE LOADED ON GRID', e);
    // }

    // submit() {
    //     console.log('this.model = ', this.model);

    //     console.log(this._uploadCmp.uploader.queue);

    //     this._uploadCmp.uploader.uploadAll()
    //         .subscribe(e => {
    //             console.log('upload all response: ', e);
    //         });
    // }
}