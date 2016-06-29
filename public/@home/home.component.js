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
var forms_1 = require('@angular/forms');
var index_1 = require('../shared/index');
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        console.log('HomeComponent view initialized.', this);
    };
    HomeComponent.prototype.handleChange = function (e) {
        console.log('HOME --- handleChange', e);
    };
    HomeComponent.prototype.fileAdded = function (e) {
        console.log('HOME --- fileAdded', e);
    };
    HomeComponent.prototype.imageAdded = function (e) {
        console.log('HOME --- IMAGE ADDED TO GRID ', e);
    };
    HomeComponent.prototype.imageLoaded = function (e) {
        console.log('HOME --- IMAGE LOADED ON GRID', e);
    };
    HomeComponent.prototype.submit = function () {
        console.log('this.model = ', this.model);
        console.log(this._uploadCmp.uploader.queue);
        this._uploadCmp.uploader.uploadAll()
            .subscribe(function (e) {
            console.log('upload all response: ', e);
        });
    };
    __decorate([
        core_1.ViewChild(index_1.ImageUploadComponent), 
        __metadata('design:type', index_1.ImageUploadComponent)
    ], HomeComponent.prototype, "_uploadCmp", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                index_1.ImageUploadComponent,
                forms_1.NgForm
            ],
            providers: [index_1.FileUploader]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=home.component.js.map
