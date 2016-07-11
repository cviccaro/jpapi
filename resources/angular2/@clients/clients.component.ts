import { Component, AfterViewInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import { JpaCache, JpClient, JpaContextMenu, CONTEXT_MENU_DIRECTIVES, JpaModal, ModalAction, ClientService, TooltipDirective } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css'],
    directives: [ MATERIAL_DIRECTIVES, CONTEXT_MENU_DIRECTIVES, TooltipDirective ]
})
export class ClientsComponent implements AfterViewInit {
    public state: any;
    public clients: JpClient[];

    constructor(
        private service: ClientService,
        private cache: JpaCache,
        private modal: JpaModal,
        private toaster: ToasterService,
        private menu: JpaContextMenu
    ) {
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
        this.modal.open({
            mode: 'form',
            inputs: [
                { name: 'name', required: true },
                { name: 'alias'},
                { name: 'featured', type: 'checkbox' },
                { name: 'image', type: 'file' }
            ],
            title: 'Add a client'
        }).subscribe((action: ModalAction) => {
            if (action.type === 'submit') {
                let form = action.config.inputs;

                console.log('We can now save our client with this data: ', {
                    form: form
                });
                this.service.create(form)
                    .subscribe(res => {
                        this.toaster.pop('success', 'Success!', res.name + ' has been created.');
                        setTimeout(() => { this.fetch() },0);
                    })
            }
        });
    }

    edit(client: JpClient) {
        this.menu.close();
        let modalConfig = {
            mode: 'form',
            inputs: [
                { name: 'name', required: true, value: client.name },
                { name: 'alias', value: client.alias },
                { name: 'featured', type: 'checkbox', value: client.featured },
                { name: 'image_remove', type: 'toggle', label: 'Slide to Delete Image'},
                { name: 'image', type: 'file', label: 'Replace Image', conditions: [
                    {
                        target: 'image_remove',
                        condition: (source, target) => {
                            return target.value;
                        },
                        action: 'hidden'
                    }
                ]},
            ],
            formClass: 'update' + (client.image_id !== null ? ' has-image' : ''),
            okText: 'Save',
            title: 'Edit client ' + client.name
        };

        if (client.image_id === null) {
            modalConfig.inputs[4]['label'] = 'Add an image';
            modalConfig.inputs.splice(3, 1);
        }

        this.modal.open(modalConfig).subscribe((action: ModalAction) => {
            if (action.type === 'submit') {
                let form = action.config.inputs;

                console.log('We can now save our client with this data: ', {
                    form: form
                });
                this.service.update(client.id, form)
                    .subscribe(res => {
                        this.toaster.pop('success', 'Success!', res.name + ' has been edited.');
                        setTimeout(() => { this.fetch() },0);
                    })
            }
        });
    }

    remove(client: JpClient) {
        this.menu.close();
        let name = client.name;
        this.modal.open({message: 'Discard client?', okText: 'Discard'})
            .subscribe((action: ModalAction) => {
                if (action.type === 'ok') {
                    this.service.destroy(client.id)
                        .subscribe(res => {
                            this.toaster.pop('success', 'Success!', name + ' has been obliterated.');
                            setTimeout(() => { this.fetch() },0);
                        })
                }
            })
    }

    fetch() {
        this.service.all().subscribe(res => {
            this.clients = res.data;
        });
    }
}
