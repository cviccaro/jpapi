import { Component, AfterViewInit } from '@angular/core';

import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';

import { JpaCache, JpClient, JpaContextMenu, CONTEXT_MENU_DIRECTIVES, JpaModal, ModalAction } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css'],
    directives: [ MATERIAL_DIRECTIVES, CONTEXT_MENU_DIRECTIVES ]
})
export class ClientsComponent implements AfterViewInit {
    public state: any;
    public clients: JpClient[];

    constructor(private cache: JpaCache, private menu: JpaContextMenu, private modal: JpaModal) {
        this.state = this.cache.get('clients');

        this.state.sortOptions = [
            { name: 'Updated At', value: 'updated_at' },
            { name: 'Created At', value: 'created_at' },
            { name: 'Name', value: 'name' },
            { name: 'Projects', value: 'projects' }
        ];
        this.state.perPageOptions = [5, 10, 15, 25, 50, 100];
        this.state.sort = {
            by: 'name',
            descending: false
        };
        this.clients = this.state.data;
    }

    ngAfterViewInit() {
        console.log('ClientsComponent View Initialized.', this);
    }

    add() {
        console.log('add a client');
        this.menu.close();
        this.modal.open({
            mode: 'form',
            inputs: [
                { name: 'name', required: true },
                { name: 'alias'},
                { name: 'featured', type: 'checkbox' },
                { name: 'image', type: 'file' },
            ],
            title: 'Add a client'
        }).subscribe((action: ModalAction) => {
            let form = action.config.inputs;

            console.log('We can now save our client with this data: ', {
                form: form
            });
        });
    }

    toggleFeatured(client: JpClient) {
        console.log('toggle featured', client);
    }

    fetch() { }
}
