import { Component, HostBinding, OnInit, ViewChild, QueryList, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster';
import { CKEditor } from 'ng2-ckeditor';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {
    BlogService,
    Blog,
    DivisionService,
    Tag,
    TagService,
    JpaCache,
    PANEL2_DIRECTIVES,
    PanelFormComponent,
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
export class BlogComponent implements OnInit, OnDestroy {
    public divisions: { id: number, name: string }[];
    public tags: { id: number, name: string }[];
    public controls: PanelFormControl<any>[];

    public isNew: boolean = false;
    public ready: boolean = false;
    public saving: boolean = false;

    private _originalTitle: string;
    private _blog: Blog = new Blog();
    private _subscriptions: Subscription[] = [];

    @HostBinding('class.new') get isNewClass() { return this.isNew; }

    @ViewChild(PanelFormComponent) public _formCmp: PanelFormComponent;
    public ckEditors: QueryList<CKEditor>;

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
            setTimeout(() => {
              this.ckEditors = this._formCmp._ckEditors;
            });
        } else {
            let sub = this.service.find(+id).subscribe(res => {
                this.blog = res;
                this.ready = true;
                setTimeout(() => {
                  this.ckEditors = this._formCmp._ckEditors;
                });
            });

            this._subscriptions.push(sub);
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
              options: this.tags,
              placeholder: 'Add a tag'
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
            required: false
          }),
          new PanelFormControlFiles({
              name: 'image',
              label: 'Cover Image',
              required: false,
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
            let sub = this.service.create(model)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.blog = res;
                        console.log("Navigating to /blogs/" + res.id);
                        this.router.navigate(['/blogs', res.id]);
                        this.reset();
                    }, 1000);
                }, err => {
                    console.log('Error when saving blog: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });
            this._subscriptions.push(sub);
        } else {
            console.log('Save UPDATED blog. ', model);

            let sub = this.service.update(this.blog.id, model)
                .subscribe(res => {
                    console.log('response from update: ', res);
                    this.blog = res;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', res.title + ' has been saved.');
                }, err => {
                    console.log('Error when saving blog: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });

            this._subscriptions.push(sub);
        }
    }

    private setup() {
        this._originalTitle = this._blog.title;
        this.isNew = this.blog.id === undefined;
    }

    private reset(e?: Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.info('BlogComponent.reset()', this);

        this.saving = false;
        
        // Temporary workaround until angular2 implements
        // a proper form reset
        this.ready = false;
        if (this.ckEditors.length) {
          this._formCmp._ckEditors.forEach(editor => editor.instance.destroy());
        }

        setTimeout(() => { 
          this.ready = true; 
          setTimeout(() => {
            this.ckEditors = this._formCmp._ckEditors;
          });
        });
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe 
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy() {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
    }
}
