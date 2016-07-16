import { Component, HostBinding, OnInit, ViewChild, QueryList, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { CKEditor } from 'ng2-ckeditor';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {
    BlogService,
    Blog,
    CacheService,
    PANEL2_DIRECTIVES,
    PanelFormComponent,
    PanelFormControl,
    PanelFormControlTextfield,
    PanelFormControlTextarea,
    PanelFormControlDragnDrop,
    PanelFormControlFile,
    LoggerService,
    RegistersSubscribers
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
export class BlogComponent implements OnInit, OnDestroy, RegistersSubscribers {
    _subscriptions: Subscription[] = [];
    ckEditors: QueryList<CKEditor>;
    controls: PanelFormControl<any>[];
    divisions: { id: number, name: string }[];
    isNew: boolean = false;
    originalTitle: string;
    ready: boolean = false;
    saving: boolean = false;
    tags: { id: number, name: string }[];

    private _blog: Blog = new Blog();

    @HostBinding('class.new') get isNewClass() { return this.isNew; }

    @ViewChild(PanelFormComponent) private _formCmp: PanelFormComponent;

    get blog(): Blog { return this._blog; }
    set blog(v: Blog) {
        this._blog = v;
        this.setup();
    }

    constructor(
        private route: ActivatedRoute,
        private service: BlogService,
        private cache: CacheService,
        private toasterService: ToasterService,
        private router: Router,
        private log: LoggerService
    ) { }

    /**
     * Initialize the directive/component after Angular initializes the data-bound input properties.
     */
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

            this.registerSubscriber(sub);
        }

        this.controls = [
          new PanelFormControlTextfield({
            name: 'title',
            required: true
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
          new PanelFormControlFile({
              name: 'image',
              label: 'Cover Image',
              required: false,
              type: 'image'
          })
        ];

        this.log.info('BlogComponent#' + (this.isNew ? 'create' : 'edit') + ' initialized.', this);
    }

    /**
     * Form submission
     * @param {Blog} model
     */
    onSubmit(model: Blog) {
        this.saving = true;

        if (this.isNew) {
            this.log.log('Save NEW blog. ', model);
            let sub = this.service.create(model)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.blog = res;
                        this.log.log('Navigating to /blogs/' + res.id);
                        this.router.navigate(['/blogs', res.id]);
                        this.reset();
                    }, 1000);
                }, err => {
                    this.log.log('Error when saving blog: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });
            this.registerSubscriber(sub);
        } else {
            this.log.log('Save UPDATED blog. ', model);

            let sub = this.service.update(this.blog.id, model)
                .subscribe(res => {
                    this.log.log('response from update: ', res);
                    this.blog = res;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', res.title + ' has been saved.');
                }, err => {
                    this.log.log('Error when saving blog: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });

            this.registerSubscriber(sub);
        }
    }

    /**
     * Register a subscriber to be unsubscribed on ngOnDestroy
     */
    registerSubscriber(sub: Subscription) {
        this._subscriptions.push(sub);
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

    /**
     * Reset the form
     */
    private reset(e?: Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.log.info('BlogComponent.reset()', this);

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
     * Cache the original title and the new/edit flag
     */
    private setup() {
        this.originalTitle = this._blog.title;
        this.isNew = this.blog.id === undefined;
    }
}
