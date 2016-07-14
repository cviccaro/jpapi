import { Component, OnDestroy } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';
import {
    ClientService,
    CacheService,
    JpClient,
    CONTEXT_MENU_DIRECTIVES,
    JpaContextMenu,
    JpaModal,
    ModalAction,
    TooltipDirective,
    LoggerService,
    ModalConfig,
    RegistersSubscribers
} from '../shared/index';

import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'jpa-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css'],
    directives: [ MATERIAL_DIRECTIVES, CONTEXT_MENU_DIRECTIVES, TooltipDirective ]
})
export class ClientsComponent implements OnDestroy, RegistersSubscribers {
    state: any;
    clients: JpClient[];
    _subscriptions: Subscription[] = [];

    constructor(
        public service: ClientService,
        public cache: CacheService,
        public modal: JpaModal,
        public toaster: ToasterService,
        public menu: JpaContextMenu,
        public log: LoggerService
    ) {
        this.state = this.cache.get('clients');

        this.clients = this.state.data;
        this.state.per_pageOptions = [5, 10, 15, 25, 50, 100];
        this.state.sort = {
            by: 'name',
            descending: false
        };
        this.state.sortOptions = [
            { name: 'Updated At', value: 'updated_at' },
            { name: 'Created At', value: 'created_at' },
            { name: 'Name', value: 'name' },
            { name: 'Projects', value: 'projects' }
        ];
    }

    /**
     * Open a model to create a new JP Client
     */
    add(): void {
        let sub = this.modal.open({
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

                this.log.log('We can now save our client with this data: ', {
                    form: form
                });
                let sub = this.service.create(form)
                    .subscribe(res => {
                        this.toaster.pop('success', 'Success!', res.name + ' has been created.');
                        setTimeout(() => { this.fetch(); },0);
                    });

                this.registerSubscriber(sub);
            }
        });

        this.registerSubscriber(sub);
    }

    /**
     * Open a model to edit a JP Client
     * @param {JpClient} client
     */
    edit(client: JpClient): void {
        this.menu.close();
        let modalConfig: ModalConfig = {
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

        console.log('ClientsComponent edit', modalConfig);

        let sub = this.modal.open(modalConfig).subscribe((action: ModalAction) => {
            if (action.type === 'submit') {
                let form = action.config.inputs;

                this.log.log('We can now save our client with this data: ', {
                    form: form
                });
                let _sub = this.service.update(client.id, form)
                    .subscribe(res => {
                        this.toaster.pop('success', 'Success!', res.name + ' has been edited.');
                        setTimeout(() => { this.fetch(); },0);
                    });

                this._subscriptions.push(_sub);
            }
        });

        this.registerSubscriber(sub);
    }

    /**
     * Destroy a JP Client
     * @param {JpClient} client
     */
    remove(client: JpClient): void {
        this.menu.close();
        let name = client.name;
        let sub = this.modal.open({message: 'Discard client?', okText: 'Discard'})
            .subscribe((action: ModalAction) => {
                if (action.type === 'ok') {
                    let _sub = this.service.destroy(client.id)
                        .subscribe(res => {
                            this.toaster.pop('success', 'Success!', name + ' has been obliterated.');
                            setTimeout(() => { this.fetch(); },0);
                        });

                    this.registerSubscriber(_sub);
                }
            });

        this.registerSubscriber(sub);
    }

    /**
     * Fetch from service
     */
    fetch(): void {
        let sub = this.service.all().subscribe(res => {
            this.clients = res.data;
        });

        this.registerSubscriber(sub);
    }

    /**
     * Implemented as part of RegisterSubscribers
     * @param {Subscription} sub
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
    }
}
