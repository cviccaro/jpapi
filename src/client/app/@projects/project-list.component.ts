import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {Project, ProjectService, ListComponent, ListConfig, JpaModal, ModalAction, CacheService, LoggerService} from '../shared/index';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

/**
 * This class represents the lazy loaded ProjectListComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css'],
    directives: [
        ListComponent
	]
})
export class ProjectListComponent implements OnInit, OnDestroy {

    listData: any[] = [];
    listConfig: ListConfig;
    sub: Subscription;
    modalSub: Subscription;

    constructor(
        public projectService: ProjectService,
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
            },
            emptyText: 'Looks like no projects have been created yet.'
        };
	}

	ngOnInit() {
        this.parseList(this.cache.get('projectList'));
	}

    parseList(json) {
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

        this.projectService.all({
            current_page: page.currentPage,
            length: page.perPage,
            order_by: sort.by,
            descending: sort.descending,
        })
        .subscribe(json => this.parseList(json));
    }

    mapList(project: any) {
        return {
            id: project.id,
            title: project.title,
            subtitle: project.client.name,
            dates: {
                updated_at: project.updated_at,
                created_at: project.created_at
            }
        };
    }

    add() {
        this.router.navigate(['/projects', 'new']);
    }

    edit(project: Project) {
        this.router.navigate(['/projects', project.id]);
    }

    destroy(project: Project) {
        this.log.log('delete this item: ', project);
        if (this.modalSub) {
            this.modalSub.unsubscribe();
        }

        let title = project.title;

        this.modalSub = this.modal.open({message: 'Discard project?', okText: 'Discard'})
            .subscribe((action:ModalAction) => {
               if (action.type === 'ok') {
                   this.log.log('lets kill this project!', project);
                   this.projectService.destroy(project.id)
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
    }
}
