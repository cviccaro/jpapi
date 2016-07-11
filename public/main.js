"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var angular2_jwt_1 = require('angular2-jwt');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var index_1 = require('./shared/index');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    http_1.HTTP_PROVIDERS,
    angular2_jwt_1.AUTH_PROVIDERS,
    app_routes_1.APP_ROUTER_PROVIDERS,
    index_1.APP_SERVICES,
    ng2_dnd_1.DND_PROVIDERS,
    angular2_jwt_1.JwtHelper
]);

//# sourceMappingURL=main.js.map
