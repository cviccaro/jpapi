import {Component, OnInit} from '@angular/core';

import {Work, WorkService, ListComponent, ListConfig} from '../shared/index';

/**
 * This class represents the lazy loaded BlogsComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.css'],
    providers: [WorkService],
    directives: [
        ListComponent
	]
})
export class WorkComponent implements OnInit {

    listData: any[] = [];
    listConfig: ListConfig;

	constructor(public workService: WorkService) {
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
        this.fetch();
	}

    fetch(params: { page?: any, sort?: any } = {}) {
        let page = params.page || this.listConfig.page;
        let sort = params.sort || this.listConfig.sort;

        this.workService.all({
            current_page: page.currentPage,
            length: page.perPage,
            order_by: sort.by,
            descending: sort.descending,
        })
        .subscribe(json => {
            this.listData = json.data.map(work => {
                return {
                    id: work.id,
                    title: work.title,
                    subtitle: work.client.name,
                    dates: {
                        updated_at: work.updated_at,
                        created_at: work.created_at
                    }
                };
            });

            this.listConfig.page = {
                from: json.from,
                to: json.to,
                total: json.total,
                lastPage: json.last_page,
                currentPage: json.current_page,
                perPage: json.per_page
            };
        });
    }

    edit(item) {
        console.log('edit this item: ', item);
    }

    _delete(item) {
        console.log('delete this item: ', item);
    }
}
