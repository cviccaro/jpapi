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
var backdrop_1 = require('./backdrop');
var modal_1 = require('./modal');
var provider_1 = require('./provider');
var ModalContainerComponent = (function () {
    function ModalContainerComponent(el, service, ref) {
        this.el = el;
        this.service = service;
        this.ref = ref;
        this.opened = false;
    }
    Object.defineProperty(ModalContainerComponent.prototype, "classList", {
        get: function () {
            var cl = 'jpa-modal-wrapper';
            if (this.config) {
                cl += ' ' + this.config.mode;
            }
            return cl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalContainerComponent.prototype, "hiddenAttr", {
        get: function () { return this.opened ? null : true; },
        enumerable: true,
        configurable: true
    });
    ModalContainerComponent.prototype.ngOnInit = function () {
        this.registerSubscribers();
        console.log('ModalContainerComponent initialized.', this);
    };
    ModalContainerComponent.prototype.ngAfterViewInit = function () {
        console.log('ModalContainerComponent View Initialized', this);
    };
    ModalContainerComponent.prototype.registerSubscribers = function () {
        var _this = this;
        this.openModalSubscriber = this.service.openModal.subscribe(function (config) {
            console.log('open modal!', config);
            _this.config = config;
            _this.opened = true;
        });
        this.actionSubscriber = this.modal.onAction.subscribe(function (e) {
            console.log('modal button clicked', e);
            _this.opened = false;
            _this.service.buttonClicked.next(e);
        });
    };
    ModalContainerComponent.prototype.ngOnDestroy = function () {
        if (this.openModalSubscriber)
            this.openModalSubscriber.unsubscribe();
        if (this.okModalSubscriber)
            this.okModalSubscriber.unsubscribe();
    };
    __decorate([
        core_1.HostBinding('attr.hidden'), 
        __metadata('design:type', Object)
    ], ModalContainerComponent.prototype, "hiddenAttr", null);
    __decorate([
        core_1.ViewChild('backdrop'), 
        __metadata('design:type', backdrop_1.ModalBackdropComponent)
    ], ModalContainerComponent.prototype, "backdrop", void 0);
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', modal_1.ModalComponent)
    ], ModalContainerComponent.prototype, "modal", void 0);
    ModalContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-modal-container',
            template: '<jpa-modal #modal [config]="config" [class]="classList"></jpa-modal><jpa-modal-backdrop #backdrop></jpa-modal-backdrop>',
            styleUrls: ['./container.css'],
            directives: [backdrop_1.ModalBackdropComponent, modal_1.ModalComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, provider_1.JpaModal, core_1.ChangeDetectorRef])
    ], ModalContainerComponent);
    return ModalContainerComponent;
}());
exports.ModalContainerComponent = ModalContainerComponent;

//# sourceMappingURL=container.js.map
