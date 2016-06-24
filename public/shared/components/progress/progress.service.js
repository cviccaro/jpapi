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
var Rx_1 = require('rxjs/Rx');
var ProgressService = (function () {
    function ProgressService() {
        var _this = this;
        this.count = 0;
        console.log('ProgressService constructed.', this);
        this.progress$ = Rx_1.Observable.create(function (observer) {
            _this.observer = observer;
        }).share();
    }
    ProgressService.prototype.update = function (event) {
        console.log('progressService update: ', event);
        this.progress = event.loaded;
        this.observer.next(this.progress);
        console.log(this.progress);
        this.count++;
    };
    ProgressService.prototype.complete = function (response) {
        console.log('progressService complete: ', {
            response: response,
            this: this
        });
    };
    ProgressService.prototype.error = function (response) {
        console.log('progressService error: ', {
            response: response,
            this: this
        });
    };
    ProgressService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ProgressService);
    return ProgressService;
}());
exports.ProgressService = ProgressService;

//# sourceMappingURL=progress.service.js.map
