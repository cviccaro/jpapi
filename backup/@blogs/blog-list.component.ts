import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import {
    Blog,
    BlogService,
    ListComponent,
    ListConfig,
    JpaModal,
    ModalAction,
    CacheService,
    LoggerService,
    PagerJSONData,
    ListLineItem,
    RegistersSubscribers
} from '../shared/index';

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
export class BlogListComponent implements OnInit, OnDestroy, RegistersSubscribers {
    listData: any[] = [];
    listConfig: ListConfig;

    _modalSub: Subscription;
    _subscriptions: Subscription[] = [];

    constructor(
        public blogService: BlogService,
        public router: Router,
        public modal: JpaModal,
        public toaster: ToasterService,
        public cache: CacheService,
        public log: LoggerService
    ) {
        this.listConfig = {
            sortOptions: [
                { name: 'Updated At', value: 'updated_at' },
                { name: 'Created At', value: 'created_at' },
                { name: 'Title', value: 'title' },
                { name: 'Category', value: 'category' }
            ],
            per_pageOptions: [5, 10, 15, 25, 50, 100],
            sort: {
                by: 'updated_at',
                descending: true
            },
            page: {
                current_page: 1,
                from: 0,
                to: 0,
                total: 0,
                last_page: 0,
                per_page: 15
            }
        };
    }

    /**
     * Initialize the directive/component after Angular initializes the data-bound input properties.
     */
    ngOnInit(): void {
        this.parseList(this.cache.get('blogList'));
    }

    /**
     * Navigate to add blog page
     */
    add(): void {
        this.router.navigate(['/blogs', 'new']);
    }

    /**
     * Destroy a blog
     * @param blog
     */
    destroy(blog: Blog): void {
        this.log.log('delete this item: ', blog);

        if (this._modalSub) {
            this._modalSub.unsubscribe();
        }

        let title = blog.title;

        this._modalSub = this.modal.open({ message: 'Discard blog?', okText: 'Discard' })
            .subscribe((action: ModalAction) => {
                if (action.type === 'ok') {
                    let sub = this.blogService.destroy(blog.id)
                        .subscribe(res => {
                            this.toaster.pop('success', 'Success!', title + ' has been obliterated.');
                            setTimeout(() => { this.fetch(); }, 0);
                        });

                    this.registerSubscriber(sub);
                }

                return;
            });
    }

    /**
     * Navigate to edit blog page
     */
    edit(blog: Blog): void {
        this.router.navigate(['/blogs', blog.id]);
    }

    /**
     * Fetch blogs from service
     * @param ListConfig
     */
    fetch(params: ListConfig = {}): void {
        let page = params.page || this.listConfig.page;
        let sort = params.sort || this.listConfig.sort;

        let sub = this.blogService.all({
            current_page: page.current_page,
            length: page.per_page,
            order_by: sort.by,
            descending: sort.descending,
        })
        .subscribe(json => this.parseList(json));

        this.registerSubscriber(sub);
    }

    /**
     * Map the blog data into a ListLineItem
     * @param  Blog
     * @return ListLineItem
     */
    mapList(blog: Blog): ListLineItem {
        return {
            id: blog.id,
            line1: blog.title,
            line2: blog.tags.length ? blog.tags[0].name : '',
            line3: blog.divisions.length ? blog.divisions[0].name : '',
            thumbnail: blog.image,
            dates: {
                updated_at: blog.updated_at,
                created_at: blog.created_at
            }
        };
    }

    /**
     * Parse the JSON as PagerJSONData
     * @param {PagerJSONData} json [description]
     */
    parseList(json: PagerJSONData): void {
        this.listData = json.data.map(this.mapList);

        this.listConfig.page = {
            from: json.from,
            to: json.to,
            total: json.total,
            last_page: json.last_page,
            current_page: json.current_page,
            per_page: json.per_page
        };
    }

    /**
     * Handle pager page change
     * @param number
     */
    onPageChange(num: number): void {
        this.listConfig.page.current_page = num;
        this.fetch();
    }

    /**
     * Register a subscription to be unsubscribed
     * @param Subscription
     */
    registerSubscriber(sub: Subscription): void {
        this._subscriptions.push(sub);
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
        if (this._modalSub) this._modalSub.unsubscribe();
    }
}
