import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/common';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

import {WorkService, Work, ClientService} from '../shared/index';

import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, MD_ICON_DIRECTIVES]
})
export class WorkComponent implements OnInit {
    public work: Work;
    public clients: string[];
    public uploader:FileUploader = new FileUploader({url: 'wtf'});
    public hasBaseDropZoneOver: boolean = false;
    //public toasterConfig: ToasterConfig;

    constructor(
        private route: ActivatedRoute,
        private service: WorkService,
        private clientService: ClientService,
        private toasterService: ToasterService
    ) { }
    
    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        
        this.clientService.options().subscribe(res => {
            this.clients = res;
        });
        this.service.find(id).subscribe(res => {
            this.work = res;
        });

        console.log('WorkComponent initialized.', this);
    }

    onSubmit() {
        if (this.uploader.queue.length) {
            window['_files'] = this.uploader.queue;
            console.log('Working through gallery queue with ' + this.uploader.queue.length + ' files', {
                queue: this.uploader.queue
            });

            if (this.work.gallery_new === undefined) this.work.gallery_new = [];

            let i = 0;
            const length = this.uploader.queue.length;

            this.uploader.queue.forEach(item => {
                item._isLast = ++i === length;

                this.readFile(item._file)
                    .subscribe(file => {
                        this.work.gallery_new.push(file);
                        this.uploader.removeFromQueue(item);
                        if (item._isLast) {
                            this.save();
                        }
                    });
            });

            return;
        }

        this.save();
    }

    save() {
        console.log('Save work. ', this.work);
        this.service.update(this.work.id, this.work)
            .subscribe(res => {
                console.log('response from update: ', res);
                this.work = res;
                this.toasterService.pop('success', 'Success!', this.work.title + ' has been saved.');
            });
    }

    ceil(a) {
        return Math.ceil(a);
    }

    imageFieldChanged(e) {
        let file = e.target.files[0];
        const filename = file.name;

        console.log('imageFieldChanged to ' + filename);

        let reader = new FileReader();

        reader.onload = readerEvt => {
            let base64 = btoa(readerEvt.target['result']);

            this.work.image_new = {
                name: filename,
                base64: base64
            };
        };

        reader.readAsBinaryString(file);
    }

    readFile(file) : Observable<any> {
        const filename = file.name;

        return Observable.create(observer => {
            let reader = new FileReader();

            reader.onload = readerEvt => {
                let base64 = btoa(readerEvt.target['result']);

                observer.next({
                    name: filename,
                    base64: base64
                });
            };

            reader.readAsBinaryString(file);
        });
    }

    fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }
}
