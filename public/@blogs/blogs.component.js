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
var icon_1 = require('@angular2-material/icon');
var button_1 = require('@angular2-material/button');
var input_1 = require('@angular2-material/input');
var list_1 = require('@angular2-material/list');
var toolbar_1 = require('@angular2-material/toolbar');
var index_1 = require('../shared/index');
var BlogsComponent = (function () {
    function BlogsComponent(blogService) {
        this.blogService = blogService;
        this.perPage = 15;
        this.descending = true;
        this.sort = 'created_at';
        this.blogs = [];
        this.from = 0;
        this.to = 0;
        this.total = 0;
        this.lastPage = 0;
        this.currentPage = 0;
        this.blogService = blogService;
    }
    BlogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.blogService.all()
            .subscribe(function (blogs) {
            console.log('got blogs: ', blogs);
            _this.blogs = blogs.data;
            _this.from = blogs.from;
            _this.to = blogs.to;
            _this.total = blogs.total;
            _this.lastPage = blogs.last_page;
            _this.currentPage = blogs.current_page;
            _this.perPage = blogs.per_page;
        });
    };
    BlogsComponent.prototype.changePerPage = function () {
        console.log('changePerPage!', arguments);
    };
    BlogsComponent.prototype.order = function () {
        console.log('order!', arguments, this);
    };
    BlogsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-blogs',
            templateUrl: 'blogs.component.html',
            styleUrls: ['blogs.component.css'],
            providers: [icon_1.MdIconRegistry, index_1.BlogService],
            directives: [
                button_1.MD_BUTTON_DIRECTIVES,
                icon_1.MD_ICON_DIRECTIVES,
                input_1.MD_INPUT_DIRECTIVES,
                toolbar_1.MD_TOOLBAR_DIRECTIVES,
                list_1.MD_LIST_DIRECTIVES,
            ]
        }), 
        __metadata('design:paramtypes', [index_1.BlogService])
    ], BlogsComponent);
    return BlogsComponent;
}());
exports.BlogsComponent = BlogsComponent;

//# sourceMappingURL=blogs.component.js.map
