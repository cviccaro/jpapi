import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

import { DateFormatPipe } from 'angular2-moment';

import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';
import { ManagedImage, ManagedFile, JpFile } from '../../../models/jp-file';
import { TooltipDirective } from '../../tooltip/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-file-upload-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css' ],
    directives: [ MATERIAL_DIRECTIVES, NgSwitch, NgSwitchCase, TooltipDirective ],
    pipes: [ DateFormatPipe ]
})
export class FileUploadToolbar implements AfterViewInit {
    new_file: any = '';

    @Input() file: ManagedImage|ManagedFile;
    @Input() type: string = 'file';
    @Input() accept: string = '*';
    @Input() icon: string = 'panorama';

    @Output() onRemoveFile = new EventEmitter();
    @Output() onReplaceFile = new EventEmitter();

    @ViewChild('newFile') private _newFileInput : ElementRef;

    ngAfterViewInit() {
        console.log('FileUploadToolbar AFter View Init', this);
    }

    removeFile(evt: Event) {
    	evt.preventDefault();
    	evt.stopPropagation();

    	this.onRemoveFile.emit(evt);
    	console.log('remove file! ', evt);
    }

    replaceFile(evt: Event) {
    	evt.preventDefault();
    	evt.stopPropagation();

    	//this.onReplaceFile.emit(evt);

    	this._newFileInput.nativeElement.dispatchEvent(new Event('click'));
    	console.log('replace file! ', evt);
    }

    fileReplaced(evt: Event) {
    	evt.preventDefault();
    	evt.stopPropagation();
        evt.stopImmediatePropagation();

    	console.log('file replaced! ');

    	this.onReplaceFile.emit(evt.target['files'][0]);
    }

    fileDescriptionChanged(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        console.log('FileDescriptionChanged!', evt);
    }
}
