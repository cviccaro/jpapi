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
var index_1 = require('../shared/index');
var BlogsComponent = (function () {
    function BlogsComponent(blogService) {
        this.blogService = blogService;
        this.listData = [];
        this.listConfig = {
            sortOptions: [
                { name: 'Updated At', value: 'updated_at' },
                { name: 'Created At', value: 'created_at' },
                { name: 'Title', value: 'title' },
                { name: 'Category', value: 'category' }
            ],
            perPageOptions: [5, 10, 15, 25, 50, 100],
            sort: {
                by: 'updated_at',
                descending: true
            },
            page: {
                currentPage: 1,
                from: 0,
                to: 0,
                total: 0,
                lastPage: 0,
                perPage: 15
            }
        };
    }
    BlogsComponent.prototype.ngOnInit = function () {
        var res = this.blogService.getCachedResponse();
        this.listData = res.data.map(this.mapList);
        this.listConfig.page = {
            currentPage: res.current_page,
            from: res.from,
            to: res.to,
            total: res.total,
            lastPage: res.last_page,
            perPage: res.per_page
        };
    };
    BlogsComponent.prototype.mapList = function (blog) {
        return {
            id: blog.id,
            title: blog.title,
            subtitle: blog.category.name,
            dates: {
                updated_at: blog.updated_at,
                created_at: blog.created_at
            }
        };
    };
    BlogsComponent.prototype.fetch = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var page = params.page || this.listConfig.page;
        var sort = params.sort || this.listConfig.sort;
        this.sub = this.blogService.all({
            current_page: page.currentPage,
            length: page.perPage,
            order_by: sort.by,
            descending: sort.descending,
        })
            .subscribe(function (json) {
            _this.listData = json.data.map(_this.mapList);
            _this.listConfig.page = {
                from: json.from,
                to: json.to,
                total: json.total,
                lastPage: json.last_page,
                currentPage: json.current_page,
                perPage: json.per_page
            };
        });
    };
    BlogsComponent.prototype.edit = function (item) {
        console.log('edit this item: ', item);
    };
    BlogsComponent.prototype._delete = function (item) {
        console.log('delete this item: ', item);
    };
    BlogsComponent.prototype.ngOnDestroy = function () {
        if (this.sub)
            this.sub.unsubscribe();
    };
    BlogsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-blogs',
            templateUrl: './blogs.component.html',
            styleUrls: ['./blogs.component.css'],
            directives: [
                index_1.ListComponent
            ]
        }), 
        __metadata('design:paramtypes', [index_1.BlogService])
    ], BlogsComponent);
    return BlogsComponent;
}());
exports.BlogsComponent = BlogsComponent;

//# sourceMappingURL=blogs.component.js.map
