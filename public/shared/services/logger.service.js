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
var LoggerService = (function () {
    function LoggerService() {
        this.self = this;
        this.enabled = true;
        this.noop = function () { };
    }
    Object.defineProperty(LoggerService.prototype, "debug", {
        get: function () {
            if (this.enabled)
                return console.debug.bind(console);
            return this.noop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoggerService.prototype, "error", {
        get: function () {
            if (this.enabled)
                return console.error.bind(console);
            return this.noop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoggerService.prototype, "log", {
        get: function () {
            if (this.enabled)
                return console.log.bind(console);
            return this.noop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoggerService.prototype, "info", {
        get: function () {
            if (this.enabled)
                return console.info.bind(console);
            return this.noop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoggerService.prototype, "warn", {
        get: function () {
            if (this.enabled)
                return console.warn.bind(console);
            return this.noop;
        },
        enumerable: true,
        configurable: true
    });
    LoggerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;

//# sourceMappingURL=logger.service.js.map
