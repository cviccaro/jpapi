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
var forms_1 = require('@angular/forms');
var angular2_material_1 = require('../shared/libs/angular2-material');
var angular2_toaster_1 = require('angular2-toaster');
var index_1 = require('../shared/index');
var BlogComponent = (function () {
    function BlogComponent(route, service, divisionService, toasterService, tagService, router) {
        this.route = route;
        this.service = service;
        this.divisionService = divisionService;
        this.toasterService = toasterService;
        this.tagService = tagService;
        this.router = router;
        this.ready = false;
        this.submitted = false;
        this._isNew = false;
        this._blog = new index_1.Blog();
        this._blogImage = undefined;
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
        this.tags = this.tagService.cached();
        this.divisions = this.divisionService.cached();
        var id = this.route.snapshot.params['id'];
        if (id === 'new') {
            this.ready = true;
            this._isNew = true;
        }
        else {
            this.service.find(+id).subscribe(function (res) {
                _this.blog = res;
                console.debug('setting blog model to ', res);
                _this.ready = true;
            });
        }
        console.info('BlogComponent#' + (this._isNew ? 'create' : 'edit') + ' initialized.', this);
    };
    BlogComponent.prototype.ngAfterViewInit = function () {
        console.info('BlogComponent#' + (this._isNew ? 'create' : 'edit') + ' View Initialized.', this);
    };
    BlogComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this._isNew) {
            console.log('Save NEW blog. ', this.blog);
            this.service.create(this.blog)
                .subscribe(function (res) {
                _this.toasterService.pop('success', 'Success!', _this.blog.title + ' has been created.  Redirecting to its page.');
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
            console.log('Save UPDATED blog. ', this.blog);
            this.service.update(this.blog.id, this.blog)
                .subscribe(function (res) {
                console.log('response from update: ', res);
                _this.blog = res;
                _this.reset();
                _this.toasterService.pop('success', 'Success!', _this.blog.title + ' has been saved.');
            }, function (err) {
                console.log('Error when saving blog: ', err);
                _this.toasterService.pop('error', 'Uh oh.', 'Something went wrong when saving this blog.  Sorry.  Try again later and/or alert the developer!');
            });
        }
    };
    BlogComponent.prototype.setup = function () {
        this._blogImage = this._blog.image;
        this._blog.image = null;
        this._originalTitle = this._blog.title;
        this._isNew = this.blog.id === undefined;
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
    BlogComponent.prototype.report = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(this.blog);
    };
    BlogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                index_1.JpaMdSelectComponent,
                index_1.JpaPanel,
                index_1.JpaPanelGroup,
                index_1.JpaPanelContent,
                forms_1.NgForm
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.BlogService, index_1.DivisionService, angular2_toaster_1.ToasterService, index_1.TagService, router_1.Router])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;

//# sourceMappingURL=blog.component.js.map
