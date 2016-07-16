import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    OnInit
} from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

import { DateFormatPipe } from 'angular2-moment';

import { MATERIAL_DIRECTIVES } from '../../../libs/angular2-material';
import { ManagedImage, ManagedFile } from '../../../models/file';
import { TooltipDirective } from '../../tooltip/index';
import { LoggerService } from '../../../services/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-file-upload-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css' ],
    directives: [ MATERIAL_DIRECTIVES, NgSwitch, NgSwitchCase, TooltipDirective ],
    pipes: [ DateFormatPipe ]
})
export class FileUploadToolbarComponent implements OnInit {
    new_file: any = '';
    file_description: string = '';
    file_description_placeholder: string = 'Add a description';

    @Input() file: ManagedImage|ManagedFile;
    @Input() controlName: string;
    @Input() type: string = 'file';
    @Input() accept: string = '*';
    @Input() icon: string = 'panorama';

    @Output() onRemoveFile = new EventEmitter();
    @Output() onReplaceFile = new EventEmitter();
    @Output() fileDescriptionChanged = new EventEmitter();

    @ViewChild('newFile') private _newFileInput : ElementRef;

    constructor(private log: LoggerService) { }

    /**
     * Initialization
     */
    ngOnInit() {
        if (this.file) this.file_description = this.file.description;
    }

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

        this.file_description = '';
        this.setFileDescriptionPlaceholder();
    }

    /**
     * File descipriton changed
     * @param {Event} evt [description]
     */
    onFileDescriptionChange(evt: Event): void {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        this.log.debug('FileDescription changed', { evt: evt, this: this });

        this.setFileDescriptionPlaceholder();

        this.fileDescriptionChanged.emit(this.file_description);
    }

    /**
     * Set file description placeholder based on
     * file description
     */
    setFileDescriptionPlaceholder(): void {
        if (this.file_description.length) {
            this.file_description_placeholder = 'Description';
        } else {
            this.file_description_placeholder = 'Add a description';
        }
    }
}
