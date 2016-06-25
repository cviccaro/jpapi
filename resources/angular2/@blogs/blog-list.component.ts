import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {Blog, BlogService, ListComponent, ListConfig} from '../shared/index';

/**
 * This class represents the lazy loaded BlogsComponent.
 */
@Component({
    moduleId: module.id,
    // selector: 'jpa-blogs',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.css'],
    directives: [
        ListComponent
	]
})
export class BlogListComponent implements OnInit, OnDestroy {

    listData: any[] = [];
    listConfig: ListConfig;
    sub: any;

	constructor(public blogService: BlogService, private router: Router) {
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

	ngOnInit() {
        var json = this.blogService.getList();

        this.parseList(json);
	}

    mapList(blog: any) {
        return {
            id: blog.id,
            title: blog.title,
            subtitle: blog.category.name,
            dates: {
                updated_at: blog.updated_at,
                created_at: blog.created_at
            }
        };
    }

    parseList(json: any) {
        this.listData = json.data.map(this.mapList);

        this.listConfig.page = {
            from: json.from,
            to: json.to,
            total: json.total,
            lastPage: json.last_page,
            currentPage: json.current_page,
            perPage: json.per_page
        };
    }

    fetch(params: { page?: any, sort?: any } = {}) {
        let page = params.page || this.listConfig.page;
        let sort = params.sort || this.listConfig.sort;

        this.sub = this.blogService.all({
            current_page: page.currentPage,
            length: page.perPage,
            order_by: sort.by,
            descending: sort.descending,
        })
        .subscribe(json => this.parseList(json));
    }

    edit(blog: Blog) {
        console.log('ROUTE TO:', ['/blogs', blog.id]);
        this.router.navigate(['/blogs', blog.id]);
    }

    _delete(blog: Blog) {
        console.log('delete this item: ', blog);
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
    }
}
