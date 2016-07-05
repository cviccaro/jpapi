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
var grid_list_1 = require('@angular2-material/grid-list');
var angular2_material_1 = require('../../../../shared/libs/angular2-material');
var index_1 = require('../../../index');
var chip_component_1 = require('../../chip/chip.component');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var JpaPanelContent = (function () {
    function JpaPanelContent(el) {
        this.el = el;
        this._hasImage = false;
        this._imageUrl = '';
        this.loading = false;
        this.hasOptions = false;
        this.file = null;
        this.image = null;
        this.align = 'right';
        this.label = '';
        this.options = [];
    }
    Object.defineProperty(JpaPanelContent.prototype, "ifLeftClass", {
        get: function () { return this.align === 'left'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanelContent.prototype, "ifRightClass", {
        get: function () { return this.align === 'right'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanelContent.prototype, "ifBottomClass", {
        get: function () { return this.align === 'bottom'; },
        enumerable: true,
        configurable: true
    });
    JpaPanelContent.prototype.ngAfterContentInit = function () {
        this._hasImage = !!this.image;
        this.hasOptions = !!this.options.length;
        if (this._hasImage) {
            this._imageUrl = this.image.url;
            this.loading = true;
        }
        console.info('PanelContent (' + this.align + ') Content Initialized: ', { this: this });
    };
    JpaPanelContent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.imageEl = this._imageEl.nativeElement;
        this.imageEl.addEventListener('load', function () { return _this.onImgLoad(); });
        console.info('PanelContent (' + this.align + ') View Initialized: ', { this: this });
    };
    JpaPanelContent.prototype.onToggle = function (expanded) {
    };
    JpaPanelContent.prototype.addToMultiSelect = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('AddToMultiSelect', this);
    };
    JpaPanelContent.prototype.onImgLoad = function () {
        this.loading = false;
        this.imageWidth = this.imageEl.naturalWidth;
        this.imageHeight = this.imageEl.naturalHeight;
        this.imageEl.removeEventListener('load', this.onImgLoad);
    };
    JpaPanelContent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        for (var prop in changes) {
            var previousValue = changes[prop].previousValue;
            var currentValue = changes[prop].currentValue;
            var isFirstChange = changes[prop].isFirstChange();
            switch (prop) {
                case 'image':
                    if (currentValue) {
                        this._imageUrl = this.image.url;
                        this._hasImage = true;
                    }
                    else {
                        this._imageUrl = '';
                        this._hasImage = false;
                    }
                    break;
                case 'file':
                    if (currentValue) {
                        var file = currentValue;
                        this.image = new index_1.ImageUpload(file);
                        this.loading = true;
                        this.image.load()
                            .subscribe(function (dataUrl) {
                            _this._imageUrl = dataUrl;
                            _this._hasImage = true;
                        });
                    }
                    else {
                        this._imageUrl = '';
                        this._hasImage = false;
                    }
                    break;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', File)
    ], JpaPanelContent.prototype, "file", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaPanelContent.prototype, "image", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanelContent.prototype, "align", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanelContent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], JpaPanelContent.prototype, "options", void 0);
    __decorate([
        core_1.HostBinding('class.left'), 
        __metadata('design:type', Object)
    ], JpaPanelContent.prototype, "ifLeftClass", null);
    __decorate([
        core_1.HostBinding('class.right'), 
        __metadata('design:type', Object)
    ], JpaPanelContent.prototype, "ifRightClass", null);
    __decorate([
        core_1.HostBinding('class.bottom'), 
        __metadata('design:type', Object)
    ], JpaPanelContent.prototype, "ifBottomClass", null);
    __decorate([
        core_1.ContentChild(grid_list_1.MdGridList), 
        __metadata('design:type', grid_list_1.MdGridList)
    ], JpaPanelContent.prototype, "_gridList", void 0);
    __decorate([
        core_1.ViewChild('img'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanelContent.prototype, "_imageEl", void 0);
    JpaPanelContent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-content',
            templateUrl: './panel-content.component.html',
            styleUrls: ['./panel-content.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES, chip_component_1.ChipComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], JpaPanelContent);
    return JpaPanelContent;
}());
exports.JpaPanelContent = JpaPanelContent;

//# sourceMappingURL=panel-content.component.js.map
