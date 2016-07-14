import { Component, HostBinding, OnInit, OnDestroy, ViewChild, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { CKEditor } from 'ng2-ckeditor';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {
    ProjectService,
    Project,
    CacheService,
    PANEL2_DIRECTIVES,
    PanelFormComponent,
    PanelFormControl,
    PanelFormControlTextfield,
    PanelFormControlSelect,
    PanelFormControlTextarea,
    PanelFormControlFiles,
    LoggerService,
    RegistersSubscribers
} from '../shared/index';

@Component({
    moduleId: module.id,
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        PANEL2_DIRECTIVES
    ]
})
export class ProjectComponent implements OnInit, OnDestroy, RegistersSubscribers {
    _subscriptions: Subscription[] = [];
    ckEditors: QueryList<CKEditor>;
    clients: { label: string, value: any }[];
    controls: PanelFormControl<any>[];
    isNew: boolean = false;
    originalTitle: string;
    ready: boolean = false;
    saving: boolean = false;

    private _project: Project = new Project();

    @HostBinding('class.new') get isNewClass() { return this.isNew; }

    @ViewChild(PanelFormComponent) private _formCmp: PanelFormComponent;

    get project(): Project { return this._project; }
    set project(v: Project) {
        this._project = v;
        this.setup();
    }

    constructor(
        public route: ActivatedRoute,
        public service: ProjectService,
        public toasterService: ToasterService,
        public router: Router,
        public cache: CacheService,
        public log: LoggerService
    ) { }

    /**
     * Initialize the directive/component after Angular initializes the data-bound input properties.
     */
    ngOnInit() {
        this.clients = this.cache.get('clients');

        if (this.route.snapshot.params['id'] === 'new') {
            this.ready = true;
            this.isNew = true;
            setTimeout(() => {
              this.ckEditors = this._formCmp._ckEditors;
            });
        } else {
            let sub = this.service.find(+this.route.snapshot.params['id']).subscribe(res => {
                this.project = res;
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
          new PanelFormControlSelect({
              name: 'client_id',
              label: 'Client',
              required: true,
              options: this.clients
          }),
          new PanelFormControlTextarea({
              name: 'description',
              required: true,
              ckeditor: true
          }),
          new PanelFormControlFiles({
              name: 'image',
              label: 'Cover Image',
              required: true,
              multiple: false,
              type: 'image'
          }),
          new PanelFormControlFiles({
              name: 'images',
              required: false,
              multiple: true,
              filesLabel: 'images in gallery',
              type: 'image'
          })
        ];

        this.log.info('ProjectComponent#'+(this.isNew?'create':'edit')+' initialized.', this);
    }

    /**
     * Form submission
     * @param {Project} model
     */
    onSubmit(model: Project) {
        this.saving = true;

        if (this.isNew) {
            this.log.log('Save NEW project. ', model);

            let sub = this.service.create(model)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.project = res;
                        this.log.log('Navigating to /projects/' + res.id);
                        this.router.navigate(['/projects', res.id]);
                        this.reset();
                    }, 1000);
                },err => {
                    this.log.log('Error when saving project: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
                });

            this.registerSubscriber(sub);
        } else {
            this.log.log('Save UPDATED project. ', model);

            let sub = this.service.update(this.project.id, model)
                .subscribe(res => {
                    this.log.log('response from update: ', res);
                    this.project = res;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', res.title + ' has been saved.');
                }, err => {
                    this.log.log('Error when saving projet: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
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
    private reset(e?:Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.log.debug('ProjectComponent.reset()', this);

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
        this.originalTitle = this.project.title;
        this.isNew = this.project.id === undefined;
    }
}
