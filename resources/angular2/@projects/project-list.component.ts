import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Project, ProjectService, ListComponent, ListConfig} from '../shared/index';

/**
 * This class represents the lazy loaded BlogsComponent.
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
export class ProjectListComponent implements OnInit {

    listData: any[] = [];
    listConfig: ListConfig;

	constructor(public projectService: ProjectService, public router: Router) {
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
            emptyText: 'Looks like no project items have been created yet.'
        };
        console.log('ProjectListComponent', this);
	}

	ngOnInit() {
        let list = this.projectService.getList();

        this.parseList(list);
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

    destroy(item) {
        console.log('destroy this item: ', item);
    }

    onPageChange(num: number) {
        this.listConfig.page.currentPage = num;
        this.fetch();
    }
}
