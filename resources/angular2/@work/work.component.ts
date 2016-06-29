import {Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

import {WorkService, Work, ClientService, JpaMdSelectComponent, JpaPanel, JpaPanelGroup, JpaPanelContent} from '../shared/index';


@Component({
    moduleId: module.id,
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.css'],
    directives: [MATERIAL_DIRECTIVES, JpaMdSelectComponent, JpaPanel, JpaPanelGroup, JpaPanelContent]
})
export class WorkComponent implements OnInit {
    public work: Work;
    public clients: string[];
    public hasBaseDropZoneOver: boolean = false;
    public submitted = false;

    //public toasterConfig: ToasterConfig;
    private isNew: boolean = false;
    private ready: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private service: WorkService,
        private clientService: ClientService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    ngOnInit() {
        // console.log({
        //     snapshot: this.route.snapshot,
        //     params: this.route.snapshot.params,
        //     id: this.route.snapshot.params['id']
        // });

        this.clientService.options().subscribe(res => {
            this.clients = res;
        });

        this.isNew = this.route.snapshot.params['id'] === 'new';

        if (this.isNew) {
            this.work = {
                title: '',
                body: '',
                image: '',
                client: {
                    id: ''
                }
            };
            this.ready = true;
            console.debug('WorkComponent#Create initialized.', this);
        } else {
            let id = +this.route.snapshot.params['id'];

            this.service.find(id).subscribe(res => {
                this.work = res;
                console.debug('setting work model to ', res);
                this.ready = true;
            });

            console.debug('WorkComponent#Edit initialized.', this);
        }
    }

    onSubmit() {
        //console.log(this.work);
        // if (this.uploader.queue.length) {
        //     window['_files'] = this.uploader.queue;
        //     console.log('Working through gallery queue with ' + this.uploader.queue.length + ' files', {
        //         queue: this.uploader.queue
        //     });

        //     if (this.work.gallery_new === undefined) this.work.gallery_new = [];

        //     let i = 0;
        //     const length = this.uploader.queue.length;

        //     this.uploader.queue.forEach(item => {
        //         item._isLast = ++i === length;

        //         this.readFile(item._file)
        //             .subscribe(file => {
        //                 this.work.gallery_new.push(file);
        //                 this.uploader.removeFromQueue(item);
        //                 if (item._isLast) {
        //                     this.save();
        //                 }
        //             });
        //     });

        //     return;
        // }

        this.save();
    }

    save() {
        this.submitted = true;
        if (this.isNew) {
            console.log('Save NEW work. ', this.work);
            this.service.create(this.work)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', this.work.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.isNew = false;
                        this.work = res;
                        this.router.navigate(['/work', res.id]);
                    }, 6000);
                });
        } else {
            console.log('Save UPDATED work. ', this.work);
            this.service.update(this.work.id, this.work)
                .subscribe(res => {
                    console.log('response from update: ', res);
                    // this.work = res;
                    // this.toasterService.pop('success', 'Success!', this.work.title + ' has been saved.');
                });
        }
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

    private _once = {};

    once(prop) {
        if (this._once[prop]) {
            return this._once[prop];
        }

        var val = prop.split('.').reduce((carry, next) => { return carry[next]; }, this)
        this._once[prop] = val;
        return val;
    }

    fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }
}
