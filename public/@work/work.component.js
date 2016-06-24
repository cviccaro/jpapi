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
var icon_1 = require('@angular2-material/icon');
var ng2_file_upload_1 = require('ng2-file-upload');
var angular2_toaster_1 = require('angular2-toaster');
var index_1 = require('../shared/index');
var Rx_1 = require('rxjs/Rx');
var WorkComponent = (function () {
    function WorkComponent(route, service, clientService, toasterService, router) {
        this.route = route;
        this.service = service;
        this.clientService = clientService;
        this.toasterService = toasterService;
        this.router = router;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'wtf' });
        this.hasBaseDropZoneOver = false;
        this.isNew = false;
    }
    WorkComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log({
            snapshot: this.route.snapshot,
            params: this.route.snapshot.params,
            id: this.route.snapshot.params['id']
        });
        this.clientService.options().subscribe(function (res) {
            _this.clients = res;
        });
        this.isNew = this.route.snapshot.params['id'] === 'new';
        if (this.isNew) {
            console.log('NEW: WorkComponent initialized.', this);
            this.work = {
                title: '',
                body: '',
                image: '',
                client: {
                    id: ''
                }
            };
        }
        else {
            var id = +this.route.snapshot.params['id'];
            this.service.find(id).subscribe(function (res) {
                _this.work = res;
            });
            console.log('EDIT: WorkComponent initialized.', this);
        }
    };
    WorkComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.uploader.queue.length) {
            window['_files'] = this.uploader.queue;
            console.log('Working through gallery queue with ' + this.uploader.queue.length + ' files', {
                queue: this.uploader.queue
            });
            if (this.work.gallery_new === undefined)
                this.work.gallery_new = [];
            var i_1 = 0;
            var length_1 = this.uploader.queue.length;
            this.uploader.queue.forEach(function (item) {
                item._isLast = ++i_1 === length_1;
                _this.readFile(item._file)
                    .subscribe(function (file) {
                    _this.work.gallery_new.push(file);
                    _this.uploader.removeFromQueue(item);
                    if (item._isLast) {
                        _this.save();
                    }
                });
            });
            return;
        }
        this.save();
    };
    WorkComponent.prototype.save = function () {
        var _this = this;
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
        var _this = this;
        var file = e.target.files[0];
        var filename = file.name;
        console.log('imageFieldChanged to ' + filename);
        var reader = new FileReader();
        reader.onload = function (readerEvt) {
            var base64 = btoa(readerEvt.target['result']);
            _this.work.image_new = {
                name: filename,
                base64: base64
            };
        };
        reader.readAsBinaryString(file);
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
    WorkComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    WorkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './work.component.html',
            styleUrls: ['./work.component.css'],
            directives: [ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES, icon_1.MD_ICON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.WorkService, index_1.ClientService, angular2_toaster_1.ToasterService, router_1.Router])
    ], WorkComponent);
    return WorkComponent;
}());
exports.WorkComponent = WorkComponent;

//# sourceMappingURL=work.component.js.map
