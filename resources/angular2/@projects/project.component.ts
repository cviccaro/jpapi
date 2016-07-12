import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster';

import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {
    ProjectService,
    Project,
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
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        PANEL2_DIRECTIVES
    ]
})
export class ProjectComponent implements OnInit {
    public clients: { label: string, value: any }[];
    public isNew: boolean = false;
    public ready: boolean = false;
    public saving: boolean = false;

    private _originalTitle: string;
    private _project: Project = new Project();

    public controls: PanelFormControl<any>[];

    @HostBinding('class.new') get isNewClass() { return this.isNew; }

    constructor(
        private route: ActivatedRoute,
        private service: ProjectService,
        private toasterService: ToasterService,
        private router: Router,
        private cache: JpaCache
    ) { }

    get project(): Project { return this._project; }
    set project(v: Project) {
        this._project = v;
        this.setup();
    }

    ngOnInit() {
        this.clients = this.cache.get('clients');

        if (this.route.snapshot.params['id'] === 'new') {
            this.ready = true;
            this.isNew = true;
        } else {
            // this.project = this.cache.get('project');
            // this.ready = true;

            this.service.find(+this.route.snapshot.params['id']).subscribe(res => {
                this.project = res;
                console.debug('setting project model to ', res);
                this.ready = true;
            });
        }

        this.controls = [
          new PanelFormControlTextfield({
            name: 'title',
            required: true,
            order: 3
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

        console.info('ProjectComponent#'+(this.isNew?'create':'edit')+' initialized.', this);
    }

    onSubmit(model) {
        this.saving = true;

        if (this.isNew) {
            console.log('Save NEW project. ', model);
            this.service.create(model)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.project = res;
                        this.saving = false;
                        console.log("Navigating to /projects/" + res.id);
                        this.router.navigate(['/projects', res.id]);
                        this.reset();
                    }, 2000);
                },err => {
                    console.log('Error when saving project: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
                });
        } else {
            console.log('Save UPDATED project. ', model);
            this.service.update(this.project.id, model)
                .subscribe(res => {
                    console.log('response from update: ', res);
                    this.project = res;
                    this.saving = false;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', res.title + ' has been saved.');
                }, err => {
                    console.log('Error when saving projet: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
                });
        }
    }

    private setup() {
        this._originalTitle = this._project.title;
        this.isNew = this.project.id === undefined;
        console.info('ProjectComponent.setup()', this);
    }

    private reset(e?:Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.info('ProjectComponent.reset()', this);

        // Temporary workaround until angular2 implements
        // a proper form reset
        this.ready = false;

        setTimeout(() => { this.ready = true; },0);
    }
}
