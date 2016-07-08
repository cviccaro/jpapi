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
var angular2_material_1 = require('../shared/libs/angular2-material');
var index_1 = require('../shared/index');
var ClientsComponent = (function () {
    function ClientsComponent(cache, menu, modal) {
        this.cache = cache;
        this.menu = menu;
        this.modal = modal;
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
        console.log('ClientsComponent View Initialized.', this);
    };
    ClientsComponent.prototype.add = function () {
        console.log('add a client');
        this.menu.close();
        this.modal.open({
            mode: 'form',
            inputs: [
                { name: 'name', required: true },
                { name: 'alias' },
                { name: 'featured', type: 'checkbox' },
                { name: 'image', type: 'file' },
            ],
            title: 'Add a client'
        }).subscribe(function (action) {
            var form = action.config.inputs;
            console.log('We can now save our client with this data: ', {
                form: form
            });
        });
    };
    ClientsComponent.prototype.toggleFeatured = function (client) {
        console.log('toggle featured', client);
    };
    ClientsComponent.prototype.fetch = function () { };
    ClientsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-clients',
            templateUrl: './clients.component.html',
            styleUrls: ['./clients.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, index_1.CONTEXT_MENU_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [index_1.JpaCache, index_1.JpaContextMenu, index_1.JpaModal])
    ], ClientsComponent);
    return ClientsComponent;
}());
exports.ClientsComponent = ClientsComponent;

//# sourceMappingURL=clients.component.js.map
