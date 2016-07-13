"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angular2_toaster_1 = require('angular2-toaster');
var angular2_material_1 = require('../shared/libs/angular2-material');
var index_1 = require('../shared/index');
var ProjectComponent = (function () {
    function ProjectComponent(route, service, toasterService, router, cache, log) {
        this.route = route;
        this.service = service;
        this.toasterService = toasterService;
        this.router = router;
        this.cache = cache;
        this.log = log;
        this.isNew = false;
        this.ready = false;
        this.saving = false;
        this._project = new index_1.Project();
        this._subscriptions = [];
    }
    Object.defineProperty(ProjectComponent.prototype, "isNewClass", {
        get: function () { return this.isNew; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectComponent.prototype, "project", {
        get: function () { return this._project; },
        set: function (v) {
            this._project = v;
            this.setup();
        },
        enumerable: true,
        configurable: true
    });
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clients = this.cache.get('clients');
        if (this.route.snapshot.params['id'] === 'new') {
            this.ready = true;
            this.isNew = true;
            setTimeout(function () {
                _this.ckEditors = _this._formCmp._ckEditors;
            });
        }
        else {
            var sub = this.service.find(+this.route.snapshot.params['id']).subscribe(function (res) {
                _this.project = res;
                _this.ready = true;
                setTimeout(function () {
                    _this.ckEditors = _this._formCmp._ckEditors;
                });
            });
            this._subscriptions.push(sub);
        }
        this.controls = [
            new index_1.PanelFormControlTextfield({
                name: 'title',
                required: true,
                order: 3
            }),
            new index_1.PanelFormControlSelect({
                name: 'client_id',
                label: 'Client',
                required: true,
                options: this.clients
            }),
            new index_1.PanelFormControlTextarea({
                name: 'description',
                required: true,
                ckeditor: true
            }),
            new index_1.PanelFormControlFiles({
                name: 'image',
                label: 'Cover Image',
                required: true,
                multiple: false,
                type: 'image'
            }),
            new index_1.PanelFormControlFiles({
                name: 'images',
                required: false,
                multiple: true,
                filesLabel: 'images in gallery',
                type: 'image'
            })
        ];
        this.log.info('ProjectComponent#' + (this.isNew ? 'create' : 'edit') + ' initialized.', this);
    };
    ProjectComponent.prototype.onSubmit = function (model) {
        var _this = this;
        this.saving = true;
        if (this.isNew) {
            this.log.log('Save NEW project. ', model);
            var sub = this.service.create(model)
                .subscribe(function (res) {
                _this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
                setTimeout(function () {
                    _this.project = res;
                    _this.log.log("Navigating to /projects/" + res.id);
                    _this.router.navigate(['/projects', res.id]);
                    _this.reset();
                }, 1000);
            }, function (err) {
                _this.log.log('Error when saving project: ', err);
                _this.saving = false;
                _this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
            });
            this._subscriptions.push(sub);
        }
        else {
            this.log.log('Save UPDATED project. ', model);
            var sub = this.service.update(this.project.id, model)
                .subscribe(function (res) {
                _this.log.log('response from update: ', res);
                _this.project = res;
                _this.reset();
                _this.toasterService.pop('success', 'Success!', res.title + ' has been saved.');
            }, function (err) {
                _this.log.log('Error when saving projet: ', err);
                _this.saving = false;
                _this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this project.  Sorry.  Try again later and/or alert the developer!');
            });
            this._subscriptions.push(sub);
        }
    };
    ProjectComponent.prototype.setup = function () {
        this._originalTitle = this._project.title;
        this.isNew = this.project.id === undefined;
    };
    ProjectComponent.prototype.reset = function (e) {
        var _this = this;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.log.info('ProjectComponent.reset()', this);
        this.saving = false;
        this.ready = false;
        if (this.ckEditors.length) {
            this._formCmp._ckEditors.forEach(function (editor) { return editor.instance.destroy(); });
        }
        setTimeout(function () {
            _this.ready = true;
            setTimeout(function () {
                _this.ckEditors = _this._formCmp._ckEditors;
            });
        });
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) {
            if (sub)
                sub.unsubscribe();
        });
    };
    __decorate([
        core_1.HostBinding('class.new'), 
        __metadata('design:type', Object)
    ], ProjectComponent.prototype, "isNewClass", null);
    __decorate([
        core_1.ViewChild(index_1.PanelFormComponent), 
        __metadata('design:type', index_1.PanelFormComponent)
    ], ProjectComponent.prototype, "_formCmp", void 0);
    ProjectComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './project.component.html',
            styleUrls: ['./project.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                index_1.PANEL2_DIRECTIVES
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.ProjectService, angular2_toaster_1.ToasterService, router_1.Router, index_1.CacheService, index_1.LoggerService])
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;

//# sourceMappingURL=project.component.js.map
