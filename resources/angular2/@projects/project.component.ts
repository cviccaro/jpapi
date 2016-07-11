import {
    AfterViewInit,
    AfterViewChecked,
    AfterContentChecked,
    AfterContentInit,
    Component,
    HostBinding,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ContentChildren
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgForm, FormControl, FormControlDirective } from '@angular/forms';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

import {
    ClientService,
    ImageUpload,
    JpaMdSelectComponent,
    JpaPanel,
    JpaPanelGroup,
    JpaPanelContent,
    JpFile,
    ProjectService,
    Project
} from '../shared/index';

@Component({
    moduleId: module.id,
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        JpaMdSelectComponent,
        JpaPanel,
        JpaPanelGroup,
        JpaPanelContent,
        NgForm
    ]
})
export class ProjectComponent implements OnInit, AfterViewInit {
    public clients: string[];
    public ready: boolean = false;
    public submitted = false;

    private _originalTitle: string;
    private _isNew: boolean = false;
    private _project: Project = new Project();
    private _projectImage: JpFile = undefined;

    @HostBinding('class.new') get isNewClass() { return this._isNew; }

    @ViewChildren(JpaPanel) private _panelChildren: QueryList<JpaPanel>;
    @ContentChildren(FormControl) private _controls: QueryList<FormControl>;
    @ViewChildren(FormControl) private _controlsView: QueryList<FormControl>;
    @ContentChildren(FormControlDirective) private _controlsDir: QueryList<FormControlDirective>;
    @ViewChildren(FormControlDirective) private _controlsDirView: QueryList<FormControlDirective>;
    @ViewChild(NgForm) private _form: NgForm;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectService,
        private clientService: ClientService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    get project(): Project { return this._project; }
    set project(v: Project) {
        this._project = v;
        this.setup();
    }

    ngOnInit() {
        this.clients = this.clientService.cached();

        if (this.route.snapshot.params['id'] === 'new') {
            this.ready = true;
            this._isNew = true;
        } else {
            this.service.find(+this.route.snapshot.params['id']).subscribe(res => {
                this.project = res;
                console.debug('setting project model to ', res);
                this.ready = true;
            });
        }

        console.info('ProjectComponent#'+(this._isNew?'create':'edit')+' initialized.', this);
    }

    ngAfterViewInit() {
        console.info('ProjectComponent#'+(this._isNew?'create':'edit')+' View Initialized.', this);
    }

    onSubmit() {
        this.submitted = true;
        if (this._isNew) {
            console.log('Save NEW project. ', this.project);
            this.service.create(this.project)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', this.project.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.project = res;
                        console.log("Navigating to /projects/" + res.id);
                        this.router.navigate(['/projects', res.id]);
                        this.reset();
                    }, 2000);
                },err => {
                    console.log('Error when saving projet: ', err);
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
                });
        } else {
            console.log('Save UPDATED project. ', this.project);
            this.service.update(this.project.id, this.project)
                .subscribe(res => {
                    console.log('response from update: ', res);
                    this.project = res;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', this.project.title + ' has been saved.');
                }, err => {
                    console.log('Error when saving projet: ', err);
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
                });
        }
    }

    private setup() {
        this._projectImage = this._project.image;
        this._project.image = null;
        this._originalTitle = this._project.title;
        this._isNew = this.project.id === undefined;
        console.info('ProjectComponent.setup()', this);
    }

    private reset(e?:Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.info('ProjectComponent.reset()', this);

        // this._panelChildren.forEach(panel => {
        //     panel.reset();
        // });

        // Temporary workaround until angular2 implements
        // a proper form reset
        this.ready = false;

        setTimeout(() => { this.ready = true; },0);
    }

    report(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log(this.project);
    }
}
