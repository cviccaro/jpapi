import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster';

import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {
    BlogService,
    Blog,
    DivisionService,
    Tag,
    TagService,
    JpaCache,
    PANEL2_DIRECTIVES,
    PanelFormControl,
    PanelFormControlTextfield,
    PanelFormControlSelect,
    PanelFormControlTextarea,
    PanelFormControlDragnDrop,
    PanelFormControlFiles
} from '../shared/index';

@Component({
    moduleId: module.id,
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        PANEL2_DIRECTIVES
    ]
})
export class BlogComponent implements OnInit {
    public divisions: { label: string, value: any }[];
    public tags: { label: string, value: any }[];

    public isNew: boolean = false;
    public ready: boolean = false;
    public saving: boolean = false;

    private _originalTitle: string;
    private _blog: Blog = new Blog();

    public controls: PanelFormControl<any>[];

    get blog(): Blog { return this._blog; }
    set blog(v: Blog) {
        this._blog = v;
        this.setup();
    }

    constructor(
        private route: ActivatedRoute,
        private service: BlogService,
        private cache: JpaCache,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    ngOnInit() {
        this.tags = this.cache.get('tags');
        this.divisions = this.cache.get('divisions');

        let id = this.route.snapshot.params['id'];

        if (id === 'new') {
            this.ready = true;
            this.isNew = true;
        } else {
            this.service.find(+id).subscribe(res => {
                this.blog = res;
                console.debug('setting blog model to ', res);
                this.ready = true;
            });
        }

        this.controls = [
          new PanelFormControlTextfield({
            name: 'title',
            required: true,
            order: 3
          }),
          new PanelFormControlDragnDrop({
              name: 'tags',
              required: true,
              options: this.tags
          }),
          new PanelFormControlDragnDrop({
              name: 'divisions',
              required: true,
              options: this.divisions
          }),
          new PanelFormControlTextarea({
              name: 'body',
              required: true,
              ckeditor: true
          }),
          new PanelFormControlTextarea({
              name: 'summary',
              required: false,
              ckeditor: true
          }),
          new PanelFormControlTextfield({
            name: 'author',
            required: true
          }),
          new PanelFormControlFiles({
              name: 'image',
              label: 'Cover Image',
              required: true,
              multiple: false,
              type: 'image'
          })
        ];

        console.info('BlogComponent#' + (this.isNew ? 'create' : 'edit') + ' initialized.', this);
    }

    onSubmit(model) {
        this.saving = true;

        if (this.isNew) {
            console.log('Save NEW blog. ', model);
            this.service.create(model)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.blog = res;
                        console.log("Navigating to /blogs/" + res.id);
                        this.router.navigate(['/blogs', res.id]);
                        this.reset();
                    }, 2000);
                }, err => {
                    console.log('Error when saving blog: ', err);
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });
        } else {
            console.log('Save UPDATED blog. ', model);
            this.service.update(this.blog.id, model)
                .subscribe(res => {
                    console.log('response from update: ', res);
                    this.blog = res;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', res.title + ' has been saved.');
                }, err => {
                    console.log('Error when saving blog: ', err);
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });
        }
    }

    private setup() {
        this._originalTitle = this._blog.title;
        this.isNew = this.blog.id === undefined;

        console.info('BlogComponent.setup()', this);
    }

    private reset(e?: Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.info('BlogComponent.reset()', this);

        // Temporary workaround until angular2 implements
        // a proper form reset
        this.ready = false;

        setTimeout(() => { this.ready = true; }, 0);
    }
}
