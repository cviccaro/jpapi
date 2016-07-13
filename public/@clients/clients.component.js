"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_toaster_1 = require('angular2-toaster');
var angular2_material_1 = require('../shared/libs/angular2-material');
var index_1 = require('../shared/index');
var ClientsComponent = (function () {
    function ClientsComponent(service, cache, modal, toaster, menu, log) {
        this.service = service;
        this.cache = cache;
        this.modal = modal;
        this.toaster = toaster;
        this.menu = menu;
        this.log = log;
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
    ClientsComponent.prototype.ngAfterViewInit = function () {
        this.log.log('ClientsComponent View Initialized.', this);
    };
    ClientsComponent.prototype.add = function () {
        var _this = this;
        this.modal.open({
            mode: 'form',
            inputs: [
                { name: 'name', required: true },
                { name: 'alias' },
                { name: 'featured', type: 'checkbox' },
                { name: 'image', type: 'file' }
            ],
            title: 'Add a client'
        }).subscribe(function (action) {
            if (action.type === 'submit') {
                var form = action.config.inputs;
                _this.log.log('We can now save our client with this data: ', {
                    form: form
                });
                var sub = _this.service.create(form)
                    .subscribe(function (res) {
                    _this.toaster.pop('success', 'Success!', res.name + ' has been created.');
                    setTimeout(function () { _this.fetch(); }, 0);
                });
                _this.subs.push(sub);
            }
        });
    };
    ClientsComponent.prototype.edit = function (client) {
        var _this = this;
        this.menu.close();
        var modalConfig = {
            mode: 'form',
            inputs: [
                { name: 'name', required: true, value: client.name },
                { name: 'alias', value: client.alias },
                { name: 'featured', type: 'checkbox', value: client.featured },
                { name: 'image_remove', type: 'toggle', label: 'Slide to Delete Image' },
                { name: 'image', type: 'file', label: 'Replace Image', conditions: [
                        {
                            target: 'image_remove',
                            condition: function (source, target) {
                                return target.value;
                            },
                            action: 'hidden'
                        }
                    ] },
            ],
            formClass: 'update' + (client.image_id !== null ? ' has-image' : ''),
            okText: 'Save',
            title: 'Edit client ' + client.name
        };
        if (client.image_id === null) {
            modalConfig.inputs[4]['label'] = 'Add an image';
            modalConfig.inputs.splice(3, 1);
        }
        var sub = this.modal.open(modalConfig).subscribe(function (action) {
            if (action.type === 'submit') {
                var form = action.config.inputs;
                _this.log.log('We can now save our client with this data: ', {
                    form: form
                });
                var _sub = _this.service.update(client.id, form)
                    .subscribe(function (res) {
                    _this.toaster.pop('success', 'Success!', res.name + ' has been edited.');
                    setTimeout(function () { _this.fetch(); }, 0);
                });
                _this.subs.push(_sub);
            }
        });
        this.subs.push(sub);
    };
    ClientsComponent.prototype.remove = function (client) {
        var _this = this;
        this.menu.close();
        var name = client.name;
        var sub = this.modal.open({ message: 'Discard client?', okText: 'Discard' })
            .subscribe(function (action) {
            if (action.type === 'ok') {
                var _sub = _this.service.destroy(client.id)
                    .subscribe(function (res) {
                    _this.toaster.pop('success', 'Success!', name + ' has been obliterated.');
                    setTimeout(function () { _this.fetch(); }, 0);
                });
                _this.subs.push(_sub);
            }
        });
        this.subs.push(sub);
    };
    ClientsComponent.prototype.fetch = function () {
        var _this = this;
        this.service.all().subscribe(function (res) {
            _this.clients = res.data;
        });
    };
    ClientsComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) {
            if (sub)
                sub.unsubscribe();
        });
    };
    ClientsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-clients',
            templateUrl: './clients.component.html',
            styleUrls: ['./clients.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, index_1.CONTEXT_MENU_DIRECTIVES, index_1.TooltipDirective]
        }), 
        __metadata('design:paramtypes', [index_1.ClientService, index_1.CacheService, index_1.JpaModal, angular2_toaster_1.ToasterService, index_1.JpaContextMenu, index_1.LoggerService])
    ], ClientsComponent);
    return ClientsComponent;
}());
exports.ClientsComponent = ClientsComponent;

//# sourceMappingURL=clients.component.js.map
