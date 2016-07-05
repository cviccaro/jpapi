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
    ImageUpload,
    JpaMdSelectComponent,
    JpaPanel,
    JpaPanelGroup,
    JpaPanelContent,
    JpImage,
    BlogService,
    Blog,
    DivisionService,
    Tag,
    TagService
} from '../shared/index';

@Component({
    moduleId: module.id,
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    directives: [
        MATERIAL_DIRECTIVES,
        JpaMdSelectComponent,
        JpaPanel,
        JpaPanelGroup,
        JpaPanelContent,
        NgForm
    ]
})
export class BlogComponent implements OnInit, AfterViewInit {
    public divisions: string[];
    public tags: string[];

    public ready: boolean = false;
    public submitted = false;

    private _originalTitle: string;
    private _isNew: boolean = false;
    private _blog: Blog = new Blog();
    private _blogImage: JpImage = undefined;

    get blog(): Blog { return this._blog; }
    set blog(v: Blog) {
        this._blog = v;
        this.setup();
    }

    constructor(
        private route: ActivatedRoute,
        private service: BlogService,
        private divisionService: DivisionService,
        private toasterService: ToasterService,
        private tagService: TagService,
        private router: Router
    ) { }

    ngOnInit() {
        this.tags = this.tagService.cached();
        this.divisions = this.divisionService.cached();

        let id = this.route.snapshot.params['id'];

        if (id === 'new') {
            this.ready = true;
            this._isNew = true;
        } else {
            this.service.find(+id).subscribe(res => {
                this.blog = res;
                console.debug('setting blog model to ', res);
                this.ready = true;
            });
        }

        console.info('BlogComponent#'+(this._isNew?'create':'edit')+' initialized.', this);
    }

    ngAfterViewInit() {
        console.info('BlogComponent#'+(this._isNew?'create':'edit')+' View Initialized.', this);
    }

    onSubmit() {
        this.submitted = true;
        if (this._isNew) {
            console.log('Save NEW blog. ', this.blog);
            this.service.create(this.blog)
                .subscribe(res => {
                    this.toasterService.pop('success', 'Success!', this.blog.title + ' has been created.  Redirecting to its page.');
                    setTimeout(() => {
                        this.blog = res;
                        console.log("Navigating to /blogs/" + res.id);
                        this.router.navigate(['/blogs', res.id]);
                        this.reset();
                    }, 2000);
                },err => {
                    console.log('Error when saving blog: ', err);
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });
        } else {
            console.log('Save UPDATED blog. ', this.blog);
            this.service.update(this.blog.id, this.blog)
                .subscribe(res => {
                    console.log('response from update: ', res);
                    this.blog = res;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', this.blog.title + ' has been saved.');
                }, err => {
                    console.log('Error when saving blog: ', err);
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
                });
        }
    }

    private setup() {
        this._blogImage = this._blog.image;
        this._blog.image = null;
        this._originalTitle = this._blog.title;
        this._isNew = this.blog.id === undefined;
        console.info('BlogComponent.setup()', this);
    }

    private reset(e?:Event) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.info('BlogComponent.reset()', this);

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

        console.log(this.blog);
    }
}
