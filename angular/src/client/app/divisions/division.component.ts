import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import {
    DivisionService,
    Division,
    CacheService,
    PanelFormControl,
    PanelFormControlTextfield,
    PanelFormControlTextarea,
    PanelFormControlFile,
    LoggerService,
    RegistersSubscribers
} from '../shared/index';

@Component({
    moduleId: module.id,
    templateUrl: './division.component.html',
    styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit, OnDestroy, RegistersSubscribers {
    _subscriptions: Subscription[] = [];
    controls: PanelFormControl<any>[];
    isNew: boolean = false;
    originalTitle: string;
    ready: boolean = false;
    saving: boolean = false;

    private _division: Division = new Division();

    @HostBinding('class.new') get isNewClass() { return this.isNew; }

    //@ViewChild(PanelFormComponent) private _formCmp: PanelFormComponent;

    get division(): Division { return this._division; }
    set division(v: Division) {
        this._division = v;
        this.setup();
    }

    constructor(
        public route: ActivatedRoute,
        public service: DivisionService,
        public toasterService: ToasterService,
        public router: Router,
        public cache: CacheService,
        public log: LoggerService
    ) { }

    /**
     * Initialize the directive/component after Angular initializes the data-bound input properties.
     */
    ngOnInit() {
//        this.clients = this.cache.get('clients');

        if (this.route.snapshot.params['id'] === 'new') {
            this.ready = true;
            this.isNew = true;
            // setTimeout(() => {
            //   this.ckEditors = this._formCmp._ckEditors;
            // });
        } else {
            let sub = this.service.find(+this.route.snapshot.params['id']).subscribe(res => {
                this.division = res;
                this.ready = true;
                // setTimeout(() => {
                //   this.ckEditors = this._formCmp._ckEditors;
                // });
            });

            this.registerSubscriber(sub);
        }

        this.controls = [
          new PanelFormControlTextfield({
              name: 'name',
              required: true
          }),
          new PanelFormControlFile({
              name: 'image',
              label: 'Backdrop',
              required: true,
              type: 'image'
          }),
          new PanelFormControlTextfield({
              name: 'site_title',
              label: 'Site Title',
              required: false
          }),
          new PanelFormControlTextfield({
              name: 'splash_headline',
              label: 'Splash Headline',
              required: false
          }),
          new PanelFormControlTextarea({
              label: 'Splash Body',
              name: 'splash_body',
              required: false,
              ckeditor: true
          }),
          new PanelFormControlFile({
              name: 'logo',
              label: 'Logo',
              required: false,
              type: 'image'
          })
        ];

        this.log.info('DivisionComponent#'+(this.isNew?'create':'edit')+' initialized.', this);
    }

    /**
     * Form submission
     * @param {Project} model
     */
    onSubmit(model: Division) {
        this.log.log('On Submit Division', model);
        this.saving = true;

        // if (this.isNew) {
        //     this.log.log('Save NEW division. ', model);

        //     let sub = this.service.create(model)
        //         .subscribe(res => {
        //             this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
        //             setTimeout(() => {
        //                 this.division = res;
        //                 this.log.log('Navigating to /divisions/' + res.id);
        //                 this.router.navigate(['/divisions', res.id]);
        //                 this.reset();
        //             }, 1000);
        //         },err => {
        //             this.log.log('Error when saving division: ', err);
        //             this.saving = false;
        //             this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this division.  Sorry.  Try again later and/or alert the developer!');
        //         });

        //     this.registerSubscriber(sub);
        // } else {
            this.log.log('Save UPDATED division. ', model);

            let sub = this.service.update(this.division.id, model)
                .subscribe(res => {
                    this.log.log('response from update: ', res);
                    this.division = res;
                    this.reset();
                    this.toasterService.pop('success', 'Success!', res.name + ' has been saved.');
                }, err => {
                    this.log.log('Error when saving division: ', err);
                    this.saving = false;
                    this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this division.  Sorry.  Try again later and/or alert the developer!');
                });

            this.registerSubscriber(sub);
        // }
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
        this.log.info('DivisionComponent.reset()', this);

        this.saving = false;

        // Temporary workaround until angular2 implements
        // a proper form reset
        this.ready = false;

        setTimeout(() => {
          this.ready = true;
        });
    }
    /**
     * Cache the original title and the new/edit flag
     */
    private setup() {
        this.originalTitle = this.division.name;
        this.isNew = this.division.id === undefined;
    }
}
