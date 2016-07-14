import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { Blog, BlogService, ListComponent, ListConfig, JpaModal, ModalAction, CacheService, LoggerService } from '../shared/index';

/**
 * This class represents the lazy loaded BlogsComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.css'],
    directives: [
        ListComponent
	]
})
export class BlogListComponent implements OnInit, OnDestroy {

    listData: any[] = [];
    listConfig: ListConfig;
    sub: Subscription;
    modalSub: Subscription;
    destroySub: Subscription;

	constructor(
        public blogService: BlogService,
        private router: Router,
        private modal: JpaModal,
        public toaster: ToasterService,
        private cache: CacheService,
        private log: LoggerService
    ) {
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
        this.parseList(this.cache.get('blogList'));
	}

    mapList(blog: any) {
        return {
            id: blog.id,
            title: blog.title,
            subtitle: blog.tags.length ? blog.tags[0].name : '',
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

    add() {
        this.router.navigate(['/blogs', 'new']);
    }

    edit(blog: Blog) {
        this.router.navigate(['/blogs', blog.id]);
    }

    destroy(blog: Blog) {
        this.log.log('delete this item: ', blog);

        if (this.modalSub) {
            this.modalSub.unsubscribe();
        }

        let title = blog.title;

        this.modalSub = this.modal.open({message: 'Discard blog?', okText: 'Discard'})
            .subscribe((action:ModalAction) => {
               if (action.type === 'ok') {
                   this.destroySub = this.blogService.destroy(blog.id)
                       .subscribe(res => {
                           this.toaster.pop('success', 'Success!', title + ' has been obliterated.');
                           setTimeout(() => { this.fetch() },0);
                       })
               }

               return;
            });
    }

    onPageChange(num: number) {
        this.listConfig.page.currentPage = num;
        this.fetch();
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
        if (this.modalSub) this.modalSub.unsubscribe();
        if (this.destroySub) this.destroySub.unsubscribe();
    }
}
