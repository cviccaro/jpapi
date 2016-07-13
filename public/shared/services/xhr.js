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
var XhrService = (function () {
    function XhrService() {
        this.requests = [];
        this.count = 0;
        this.start = new core_1.EventEmitter();
        this.done = new core_1.EventEmitter();
    }
    XhrService.prototype.started = function (config) {
        this.count++;
        this.start.emit(config);
    };
    XhrService.prototype.finished = function (config) {
        if (--this.count === 0) {
            this.done.emit(config);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], XhrService.prototype, "start", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], XhrService.prototype, "done", void 0);
    XhrService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], XhrService);
    return XhrService;
}());
exports.XhrService = XhrService;

//# sourceMappingURL=xhr.js.map
