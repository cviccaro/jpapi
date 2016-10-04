import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import {
    Project,
    ProjectService,
    ListConfig,
    JpaModal,
    ModalAction,
    CacheService,
    LoggerService,
    ListLineItem,
    PagerJSONData,
    RegistersSubscribers,
    StorageService
} from '../shared/index';

/**
 * This class represents the lazy loaded ProjectListComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy, RegistersSubscribers {
    listConfig: ListConfig;
    listData: any[] = [];

    _modalSub: Subscription;
    _subscriptions: Subscription[] = [];

    constructor(
        public projectService: ProjectService,
        public router: Router,
        public modal: JpaModal,
        public toaster: ToasterService,
        public cache: CacheService,
        public log: LoggerService,
        public storage: StorageService
    ) {
        let sort: any = null;
        let sortDesc: any = null;

        if (this.storage.supported) {
            sort = this.storage.getItem('projects_sort');
            sortDesc = this.storage.getItem('projects_sort_direction') !== 'ASC';
        }

        this.listConfig = {
            sortOptions: [
                { name: 'Updated At', value: 'updated_at' },
                { name: 'Created At', value: 'created_at' },
                { name: 'Title', value: 'title' },
                { name: 'Category', value: 'category' }
            ],
            per_pageOptions: [5, 10, 15, 25, 50, 100],
            sort: {
                by: sort === null ? 'updated_at' : sort,
                descending: sortDesc === null ? true : sortDesc
            },
            page: {
                current_page: 1,
                from: 0,
                to: 0,
                total: 0,
                last_page: 0,
                per_page: 15
            },
            emptyText: 'Looks like no projects have been created yet.'
        };
	}

    /**
     * Initialize the directive/component after Angular initializes the data-bound input properties.
     */
	ngOnInit() {
        this.parseList(this.cache.get('projectList'));
	}

    /**
     * Navigate to add project page
     */
    add() {
        this.router.navigate(['/admin/projects', 'new']);
    }

    /**
     * Destroy a project
     * @param Project
     */
    destroy(project: Project) {
        this.log.log('delete this item: ', project);
        if (this._modalSub) {
            this._modalSub.unsubscribe();
        }

        let title = project.title;

        this._modalSub = this.modal.open({message: 'Discard project?', okText: 'Discard'})
            .subscribe((action:ModalAction) => {
               if (action.type === 'ok') {
                   this.log.log('lets kill this project!', project);
                   this.projectService.destroy(project.id)
                       .subscribe(res => {
                           this.toaster.pop('success', 'Success!', title + ' has been obliterated.');
                           setTimeout(() => { this.fetch(); },0);
                       });
               }

               return;
            });
    }

    /**
     * Navigate to project edit page
     * @param Project
     */
    edit(project: Project): void {
        this.router.navigate(['/admin/projects', project.id]);
    }

    /**
     * Fetch projects from service
     * @param ListConfig
     */
    fetch(params: ListConfig = {}): void {
        let page = params.page || this.listConfig.page;
        let sort = params.sort || this.listConfig.sort;

        if ( this.storage.supported ) {
            this.storage.setItem('projects_sort', this.listConfig.sort.by);

            let desc = <any>this.listConfig.sort.descending === 'true' ? 'DESC' : 'ASC';

            this.storage.setItem('projects_sort_direction', desc);
        }

        this.projectService.all({
            current_page: page.current_page,
            length: page.per_page,
            order_by: sort.by,
            descending: sort.descending,
        })
        .subscribe(json => this.parseList(json));
    }

    /**
     * Map the project data into a ListLineItem
     * @param  Project
     * @return ListLineItem
     */
    mapList(project: Project): ListLineItem {
        return {
            id: project.id,
            line1: project.title,
            line2: project.client.name,
            line3: project.divisions.length ? project.divisions[0].name : '',
            thumbnail: project.image,
            dates: {
                updated_at: project.updated_at,
                created_at: project.created_at
            }
        };
    }

    /**
     * Parse the JSON as PagerJSONData
     * @param PagerJSONData
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
     * Handle a page change
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
    ngOnDestroy() {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
        if (this._modalSub) this._modalSub.unsubscribe();
    }
}
