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
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
var angular2_material_1 = require('../shared/libs/angular2-material');
var angular2_toaster_1 = require('angular2-toaster');
var index_1 = require('../shared/index');
var WorkComponent = (function () {
    function WorkComponent(route, service, clientService, toasterService, router) {
        this.route = route;
        this.service = service;
        this.clientService = clientService;
        this.toasterService = toasterService;
        this.router = router;
        this.work = new index_1.Work();
        this.hasBaseDropZoneOver = false;
        this.submitted = false;
        this.isNew = false;
        this.ready = false;
        this._once = {};
    }
    WorkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientService.options().subscribe(function (res) {
            _this.clients = res;
        });
        if (this.route.snapshot.params['id'] === 'new') {
            this.isNew = true;
            this.ready = true;
        }
        else {
            this.service.find(+this.route.snapshot.params['id']).subscribe(function (res) {
                _this.work = res;
                console.debug('setting work model to ', res);
                _this.ready = true;
            });
        }
        console.debug('WorkComponent#Edit initialized.', this);
    };
    WorkComponent.prototype.onSubmit = function () {
        this.save();
    };
    WorkComponent.prototype.save = function () {
        var _this = this;
        this.submitted = true;
        if (this.isNew) {
            console.log('Save NEW work. ', this.work);
            this.service.create(this.work)
                .subscribe(function (res) {
                _this.toasterService.pop('success', 'Success!', _this.work.title + ' has been created.  Redirecting to its page.');
                setTimeout(function () {
                    _this.isNew = false;
                    _this.work = res;
                    _this.router.navigate(['/work', res.id]);
                }, 6000);
            });
        }
        else {
            console.log('Save UPDATED work. ', this.work);
            this.service.update(this.work.id, this.work)
                .subscribe(function (res) {
                console.log('response from update: ', res);
                _this.work = res;
                _this.toasterService.pop('success', 'Success!', _this.work.title + ' has been saved.');
            });
        }
    };
    WorkComponent.prototype.ceil = function (a) {
        return Math.ceil(a);
    };
    WorkComponent.prototype.imageFieldChanged = function (e) {
    };
    WorkComponent.prototype.readFile = function (file) {
        var filename = file.name;
        return Rx_1.Observable.create(function (observer) {
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                var base64 = btoa(readerEvt.target['result']);
                observer.next({
                    name: filename,
                    base64: base64
                });
            };
            reader.readAsBinaryString(file);
        });
    };
    WorkComponent.prototype.once = function (prop) {
        if (this._once[prop]) {
            return this._once[prop];
        }
        var val = prop.split('.').reduce(function (carry, next) { return carry[next]; }, this);
        this._once[prop] = val;
        return val;
    };
    WorkComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    WorkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './work.component.html',
            styleUrls: ['./work.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, index_1.JpaMdSelectComponent, index_1.JpaPanel, index_1.JpaPanelGroup, index_1.JpaPanelContent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.WorkService, index_1.ClientService, angular2_toaster_1.ToasterService, router_1.Router])
    ], WorkComponent);
    return WorkComponent;
}());
exports.WorkComponent = WorkComponent;

//# sourceMappingURL=work.component.js.map
