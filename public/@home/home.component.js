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
var index_1 = require('@angular/forms/index');
var sidenav_1 = require('@angular2-material/sidenav');
var toolbar_1 = require('@angular2-material/toolbar');
var button_1 = require('@angular2-material/button');
var checkbox_1 = require('@angular2-material/checkbox');
var radio_1 = require('@angular2-material/radio');
var progress_circle_1 = require('@angular2-material/progress-circle');
var progress_bar_1 = require('@angular2-material/progress-bar');
var card_1 = require('@angular2-material/card');
var input_1 = require('@angular2-material/input');
var list_1 = require('@angular2-material/list');
var icon_1 = require('@angular2-material/icon');
var tabs_1 = require('@angular2-material/tabs');
var HomeComponent = (function () {
    function HomeComponent() {
        var _this = this;
        this.progress = 0;
        setInterval(function () {
            _this.progress = (_this.progress + Math.floor(Math.random() * 4) + 1) % 100;
        }, 200);
    }
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
            providers: [radio_1.MdRadioDispatcher, icon_1.MdIconRegistry],
            directives: [
                index_1.REACTIVE_FORM_DIRECTIVES,
                sidenav_1.MD_SIDENAV_DIRECTIVES,
                card_1.MD_CARD_DIRECTIVES,
                toolbar_1.MD_TOOLBAR_DIRECTIVES,
                button_1.MD_BUTTON_DIRECTIVES,
                checkbox_1.MD_CHECKBOX_DIRECTIVES,
                radio_1.MD_RADIO_DIRECTIVES,
                progress_circle_1.MD_PROGRESS_CIRCLE_DIRECTIVES,
                input_1.MD_INPUT_DIRECTIVES,
                list_1.MD_LIST_DIRECTIVES,
                progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES,
                icon_1.MD_ICON_DIRECTIVES,
                tabs_1.MD_TABS_DIRECTIVES
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=home.component.js.map
