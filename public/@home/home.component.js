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
var HomeComponent = (function () {
    function HomeComponent() {
        this.model = {
            title: 'Bombasto',
            client_id: 2,
            body: '<p>Omfg.</p>',
            tags: [
                { id: 1, name: 'Sweet!' }
            ],
            image: {
                alias: "b08d09dfd101c869f8bf2b742f83af13.jpg",
                created_at: "2016-07-05 17:17:19",
                extension: "jpg",
                filename: "b08d09dfd101c869f8bf2b742f83af13.jpg",
                id: 60,
                last_modified: "0000-00-00 00:00:00",
                mimetype: "image/jpeg",
                path: "app\public\images\projects",
                size: 46886,
                updated_at: "2016-07-05 17:17:19",
                url: "http://jpapi.localhost/img/projects/b08d09dfd101c869f8bf2b742f83af13.jpg",
            },
            images: [
                { id: 1, url: 'http://jpapi.localhost/img/projects/b08d09dfd101c869f8bf2b742f83af13.jpg', name: "b08d09dfd101c869f8bf2b742f83af13.jpg", alias: "6bc0910593f7c0dc8a8e9a095b9abec4.jpg" }
            ],
            files: [
                {
                    id: 55,
                    extension: 'pdf',
                    filename: 'oculus-shipping-label.pdf',
                    idx: 0,
                    last_modified: 1467932544195,
                    mimetype: 'application/pdf',
                    size: 297775
                }
            ]
        };
    }
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, index_1.PANEL2_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=home.component.js.map
