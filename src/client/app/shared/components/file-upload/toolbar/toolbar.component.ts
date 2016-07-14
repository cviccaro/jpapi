import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

import { DateFormatPipe } from 'angular2-moment';

import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';
import { ManagedImage, ManagedFile } from '../../../models/file';
import { TooltipDirective } from '../../tooltip/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-file-upload-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css' ],
    directives: [ MATERIAL_DIRECTIVES, NgSwitch, NgSwitchCase, TooltipDirective ],
    pipes: [ DateFormatPipe ]
})
export class FileUploadToolbarComponent {
    new_file: any = '';

    @Input() file: ManagedImage|ManagedFile;
    @Input() type: string = 'file';
    @Input() accept: string = '*';
    @Input() icon: string = 'panorama';

    @Output() onRemoveFile = new EventEmitter();
    @Output() onReplaceFile = new EventEmitter();

    @ViewChild('newFile') private _newFileInput : ElementRef;

    /**
     * Handle the remove file button being clicked
     * @param {Event} evt
     */
    removeFile(evt: Event): void {
    	evt.preventDefault();
    	evt.stopPropagation();

    	this.onRemoveFile.emit(evt);
    }

    /**
     * Handle the replace file button being clicked
     * @param {Event} evt
     */
    replaceFile(evt: Event): void {
    	evt.preventDefault();
    	evt.stopPropagation();

    	this._newFileInput.nativeElement.dispatchEvent(new Event('click'));
    }

    /**
     * Handle a new file being chosen
     * @param {Event} evt
     */
    fileReplaced(evt: Event): void {
    	evt.preventDefault();
    	evt.stopPropagation();
        evt.stopImmediatePropagation();

        let files: FileList = (<HTMLInputElement>evt.target).files;

    	this.onReplaceFile.emit(files[0]);
    }

    fileDescriptionChanged(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    }
}
