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
var BlogComponent = (function () {
    function BlogComponent(route, service, cache, toasterService, router) {
        this.route = route;
        this.service = service;
        this.cache = cache;
        this.toasterService = toasterService;
        this.router = router;
        this.isNew = false;
        this.ready = false;
        this.saving = false;
        this._blog = new index_1.Blog();
    }
    Object.defineProperty(BlogComponent.prototype, "blog", {
        get: function () { return this._blog; },
        set: function (v) {
            this._blog = v;
            this.setup();
        },
        enumerable: true,
        configurable: true
    });
    BlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tags = this.cache.get('tags');
        this.divisions = this.cache.get('divisions');
        var id = this.route.snapshot.params['id'];
        if (id === 'new') {
            this.ready = true;
            this.isNew = true;
        }
        else {
            this.service.find(+id).subscribe(function (res) {
                _this.blog = res;
                console.debug('setting blog model to ', res);
                _this.ready = true;
            });
        }
        this.controls = [
            new index_1.PanelFormControlTextfield({
                name: 'title',
                required: true,
                order: 3
            }),
            new index_1.PanelFormControlDragnDrop({
                name: 'tags',
                required: true,
                options: this.tags
            }),
            new index_1.PanelFormControlDragnDrop({
                name: 'divisions',
                required: true,
                options: this.divisions
            }),
            new index_1.PanelFormControlTextarea({
                name: 'body',
                required: true,
                ckeditor: true
            }),
            new index_1.PanelFormControlTextarea({
                name: 'summary',
                required: false,
                ckeditor: true
            }),
            new index_1.PanelFormControlTextfield({
                name: 'author',
                required: true
            }),
            new index_1.PanelFormControlFiles({
                name: 'image',
                label: 'Cover Image',
                required: true,
                multiple: false,
                type: 'image'
            })
        ];
        console.info('BlogComponent#' + (this.isNew ? 'create' : 'edit') + ' initialized.', this);
    };
    BlogComponent.prototype.onSubmit = function (model) {
        var _this = this;
        this.saving = true;
        if (this.isNew) {
            console.log('Save NEW blog. ', model);
            this.service.create(model)
                .subscribe(function (res) {
                _this.toasterService.pop('success', 'Success!', res.title + ' has been created.  Redirecting to its page.');
                setTimeout(function () {
                    _this.blog = res;
                    console.log("Navigating to /blogs/" + res.id);
                    _this.router.navigate(['/blogs', res.id]);
                    _this.reset();
                }, 2000);
            }, function (err) {
                console.log('Error when saving blog: ', err);
                _this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
            });
        }
        else {
            console.log('Save UPDATED blog. ', model);
            this.service.update(this.blog.id, model)
                .subscribe(function (res) {
                console.log('response from update: ', res);
                _this.blog = res;
                _this.reset();
                _this.toasterService.pop('success', 'Success!', res.title + ' has been saved.');
            }, function (err) {
                console.log('Error when saving blog: ', err);
                _this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
            });
        }
    };
    BlogComponent.prototype.setup = function () {
        this._originalTitle = this._blog.title;
        this.isNew = this.blog.id === undefined;
        console.info('BlogComponent.setup()', this);
    };
    BlogComponent.prototype.reset = function (e) {
        var _this = this;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.info('BlogComponent.reset()', this);
        this.ready = false;
        setTimeout(function () { _this.ready = true; }, 0);
    };
    BlogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                index_1.PANEL2_DIRECTIVES
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.BlogService, index_1.JpaCache, angular2_toaster_1.ToasterService, router_1.Router])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;

//# sourceMappingURL=blog.component.js.map
