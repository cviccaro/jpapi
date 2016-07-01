"use strict";
var button_1 = require('@angular2-material/button');
var card_1 = require('@angular2-material/card');
var checkbox_1 = require('@angular2-material/checkbox');
var grid_list_1 = require('@angular2-material/grid-list');
var icon_1 = require('@angular2-material/icon');
var input_1 = require('@angular2-material/input');
var list_1 = require('@angular2-material/list');
var progress_bar_1 = require('@angular2-material/progress-bar');
var progress_circle_1 = require('@angular2-material/progress-circle');
var radio_1 = require('@angular2-material/radio');
var slide_toggle_1 = require('@angular2-material/slide-toggle');
var sidenav_1 = require('@angular2-material/sidenav');
var tabs_1 = require('@angular2-material/tabs');
var toolbar_1 = require('@angular2-material/toolbar');
exports.MATERIAL_DIRECTIVES = [
    button_1.MD_BUTTON_DIRECTIVES,
    card_1.MD_CARD_DIRECTIVES,
    checkbox_1.MD_CHECKBOX_DIRECTIVES,
    grid_list_1.MD_GRID_LIST_DIRECTIVES,
    icon_1.MD_ICON_DIRECTIVES,
    input_1.MD_INPUT_DIRECTIVES,
    list_1.MD_LIST_DIRECTIVES,
    progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES,
    progress_circle_1.MD_PROGRESS_CIRCLE_DIRECTIVES,
    radio_1.MD_RADIO_DIRECTIVES,
    slide_toggle_1.MD_SLIDE_TOGGLE_DIRECTIVES,
    sidenav_1.MD_SIDENAV_DIRECTIVES,
    tabs_1.MD_TABS_DIRECTIVES,
    toolbar_1.MD_TOOLBAR_DIRECTIVES
];
exports.MATERIAL_PROVIDERS = [
    icon_1.MdIconRegistry,
    radio_1.MdRadioDispatcher
];

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
var angular2_moment_1 = require('angular2-moment');
var angular2_material_1 = require('../../libs/angular2-material');
var ListComponent = (function () {
    function ListComponent() {
        this.listUpdate = new core_1.EventEmitter();
        this.listItemEdit = new core_1.EventEmitter();
        this.listItemDelete = new core_1.EventEmitter();
        this.listItemAdd = new core_1.EventEmitter();
    }
    ListComponent.prototype.ngOnInit = function () {
        console.log('ListComponent initialized.', this);
    };
    ListComponent.prototype.fetch = function () {
        this.listUpdate.emit({
            config: this.listConfig,
            data: this.listData
        });
    };
    ListComponent.prototype.add = function () {
        this.listItemAdd.emit('');
    };
    ListComponent.prototype.edit = function (item, $event) {
        this.listItemEdit.emit(item);
    };
    ListComponent.prototype.delete = function (item, $event) {
        this.listItemDelete.emit(item);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListComponent.prototype, "listTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ListComponent.prototype, "listData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listItemEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listItemDelete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListComponent.prototype, "listItemAdd", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'jpa-list',
            moduleId: module.id,
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES
            ],
            pipes: [angular2_moment_1.TimeAgoPipe, angular2_moment_1.CalendarPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;

"use strict";
;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./list.component'));

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
var index_1 = require('./index');
var ProgressBrowserXhr = (function (_super) {
    __extends(ProgressBrowserXhr, _super);
    function ProgressBrowserXhr(service) {
        _super.call(this);
        this.service = service;
        this.build();
        console.log('ProgressBrowserXhr constructed.', this);
    }
    ProgressBrowserXhr.prototype.build = function () {
        var _this = this;
        console.log('ProgressBrowserXhr build called ', this);
        var xhr = _super.prototype.build.call(this);
        xhr.onprogress = function (event) {
            console.log('xhr.onprogress', event);
            _this.service.update(event);
        };
        xhr.onreadystatechange = function () {
            console.log('xhr.onreadystatechange', {
                readyState: xhr.readyState,
                status: xhr.status,
                response: xhr.response
            });
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.service.complete(xhr.response);
                }
                else {
                    _this.service.error(xhr.response);
                }
            }
        };
    };
    ProgressBrowserXhr = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.ProgressService])
    ], ProgressBrowserXhr);
    return ProgressBrowserXhr;
}(http_1.BrowserXhr));
exports.ProgressBrowserXhr = ProgressBrowserXhr;

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

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./progress.browserxhr'));
__export(require('./progress.service'));

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var error_1 = require('@angular2-material/core/errors/error');
var Observable_1 = require('rxjs/Observable');
var input_1 = require('@angular2-material/input');
var noop = function () { };
exports.JPA_MD_SELECT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return JpaMdSelectComponent; }),
    multi: true
});
var nextUniqueId = 0;
var JpaMdSelectPlaceholderConflictError = (function (_super) {
    __extends(JpaMdSelectPlaceholderConflictError, _super);
    function JpaMdSelectPlaceholderConflictError() {
        _super.call(this, 'Placeholder attribute and child element were both specified.');
    }
    return JpaMdSelectPlaceholderConflictError;
}(error_1.MdError));
exports.JpaMdSelectPlaceholderConflictError = JpaMdSelectPlaceholderConflictError;
var JpaMdSelectDuplicatedHintError = (function (_super) {
    __extends(JpaMdSelectDuplicatedHintError, _super);
    function JpaMdSelectDuplicatedHintError(align) {
        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
    }
    return JpaMdSelectDuplicatedHintError;
}(error_1.MdError));
exports.JpaMdSelectDuplicatedHintError = JpaMdSelectDuplicatedHintError;
var JpaMdSelectComponent = (function () {
    function JpaMdSelectComponent() {
        this._focused = false;
        this._value = '';
        this._onTouchedCallback = noop;
        this._onChangeCallback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.log('JpaMdSelect#onChangeCallback:', args);
        };
        this.align = 'start';
        this.dividerColor = 'primary';
        this.floatingPlaceholder = true;
        this.hintLabel = '';
        this.autoFocus = false;
        this.disabled = false;
        this.id = "jpa-md-" + nextUniqueId++;
        this.list = null;
        this.placeholder = null;
        this.required = false;
        this.step = null;
        this.tabIndex = null;
        this.name = null;
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(JpaMdSelectComponent.prototype, "focused", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "empty", {
        get: function () { return this._value == null || this._value === ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "characterCount", {
        get: function () {
            return this.empty ? 0 : ('' + this._value).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "inputId", {
        get: function () { return this.id + "-select"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaMdSelectComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.log('JpaMdSelect#set value(): ', { this: this, value: v });
            this._value = v;
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(JpaMdSelectComponent.prototype, "_align", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    JpaMdSelectComponent.prototype.focus = function () {
        this._selectElement.nativeElement.focus();
    };
    JpaMdSelectComponent.prototype.handleFocus = function (event) {
        this._focused = true;
        this._focusEmitter.emit(event);
    };
    JpaMdSelectComponent.prototype.handleBlur = function (event) {
        this._focused = false;
        this._onTouchedCallback();
        this._blurEmitter.emit(event);
    };
    JpaMdSelectComponent.prototype.handleChange = function (event) {
        this.value = event.target.value;
        this._onTouchedCallback();
    };
    JpaMdSelectComponent.prototype.hasPlaceholder = function () {
        return !!this.placeholder || this._placeholderChild != null;
    };
    JpaMdSelectComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    JpaMdSelectComponent.prototype.registerOnChange = function (fn) {
        console.log('JpaMdSelect#registerOnChange', fn);
        this._onChangeCallback = fn;
    };
    JpaMdSelectComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    JpaMdSelectComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.value = this._selectElement.nativeElement.value;
        this._validateConstraints();
        this._hintChildren.changes.subscribe(function () {
            _this._validateConstraints();
        });
        console.log('MdSelectComponent#afterContentInit', this);
    };
    JpaMdSelectComponent.prototype.ngOnChanges = function (changes) {
        this._validateConstraints();
    };
    JpaMdSelectComponent.prototype._validateConstraints = function () {
        var _this = this;
        if (this.placeholder != '' && this.placeholder != null && this._placeholderChild != null) {
            throw new JpaMdSelectPlaceholderConflictError();
        }
        if (this._hintChildren) {
            var startHint_1 = null;
            var endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new JpaMdSelectDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new JpaMdSelectDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input('aria-labelledby'), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "ariaLabelledBy", void 0);
    __decorate([
        core_1.Input('aria-disabled'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "ariaDisabled", void 0);
    __decorate([
        core_1.Input('aria-required'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "ariaRequired", void 0);
    __decorate([
        core_1.Input('aria-invalid'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "ariaInvalid", void 0);
    __decorate([
        core_1.ContentChild(input_1.MdPlaceholder), 
        __metadata('design:type', input_1.MdPlaceholder)
    ], JpaMdSelectComponent.prototype, "_placeholderChild", void 0);
    __decorate([
        core_1.ContentChildren(input_1.MdHint), 
        __metadata('design:type', core_1.QueryList)
    ], JpaMdSelectComponent.prototype, "_hintChildren", void 0);
    __decorate([
        core_1.ContentChildren(forms_1.NgSelectOption), 
        __metadata('design:type', core_1.QueryList)
    ], JpaMdSelectComponent.prototype, "_optionChildren", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "align", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "dividerColor", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "floatingPlaceholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "hintLabel", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "list", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaMdSelectComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaMdSelectComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaMdSelectComponent.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaMdSelectComponent.prototype, "name", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaMdSelectComponent.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaMdSelectComponent.prototype, "onFocus", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "value", null);
    __decorate([
        core_1.HostBinding('attr.align'), 
        __metadata('design:type', Object)
    ], JpaMdSelectComponent.prototype, "_align", null);
    __decorate([
        core_1.ViewChild('select'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaMdSelectComponent.prototype, "_selectElement", void 0);
    JpaMdSelectComponent = __decorate([
        core_1.Component({
            selector: 'jpa-md-select',
            moduleId: module.id,
            templateUrl: './md-select.component.html',
            styleUrls: ['./md-select.component.css'],
            providers: [forms_1.SelectControlValueAccessor, exports.JPA_MD_SELECT_CONTROL_VALUE_ACCESSOR],
            directives: [common_1.NgIf, forms_1.NgModel],
            host: { '(click)': 'focus()' }
        }), 
        __metadata('design:paramtypes', [])
    ], JpaMdSelectComponent);
    return JpaMdSelectComponent;
}());
exports.JpaMdSelectComponent = JpaMdSelectComponent;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./md-select.component'));

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
var JpaPanelContent = (function () {
    function JpaPanelContent(el) {
        this.el = el;
        this._hasImage = false;
        this.imageExtension = '';
        this.file = null;
        this.image = null;
        this.align = 'right';
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
        if (this.image) {
            this._hasImage = true;
            this.imageExtension = 'image/' + this.image.split('.').pop();
        }
        console.log('PanelContent (' + this.align + ') Content Initialized: ', { this: this });
    };
    JpaPanelContent.prototype.ngAfterViewInit = function () {
    };
    JpaPanelContent.prototype.onToggle = function (expanded) {
    };
    JpaPanelContent.prototype.ngOnChanges = function (changes) {
        console.log('PanelContent (' + this.align + ') changed: ', { changes: changes });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', File)
    ], JpaPanelContent.prototype, "file", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanelContent.prototype, "image", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanelContent.prototype, "align", void 0);
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
    JpaPanelContent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-content',
            templateUrl: './panel-content.component.html',
            styleUrls: ['./panel-content.component.css'],
            directives: [grid_list_1.MdGridList]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], JpaPanelContent);
    return JpaPanelContent;
}());
exports.JpaPanelContent = JpaPanelContent;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./panel-content.component'));

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
var icon_1 = require('@angular2-material/icon');
var PanelSummaryImage = (function () {
    function PanelSummaryImage() {
        this.loaded = false;
    }
    PanelSummaryImage.prototype.ngOnInit = function () {
        this.url = this.image;
    };
    PanelSummaryImage.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('PanelSummaryImage AfterViewInit. ', this);
        var img = this._preview.nativeElement;
        img.addEventListener('load', function (e) {
            _this.loaded = true;
            _this.imageHeight = img.naturalHeight;
            _this.imageWidth = img.naturalWidth;
            var parts = img.currentSrc.split('/');
            _this.imageName = parts[parts.length - 1];
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryImage.prototype, "image", void 0);
    __decorate([
        core_1.ViewChild('preview'), 
        __metadata('design:type', core_1.ElementRef)
    ], PanelSummaryImage.prototype, "_preview", void 0);
    PanelSummaryImage = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-summary-image',
            templateUrl: './summary-image.component.html',
            styleUrls: ['./summary-image.component.css'],
            directives: [icon_1.MD_ICON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelSummaryImage);
    return PanelSummaryImage;
}());
exports.PanelSummaryImage = PanelSummaryImage;

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
var common_1 = require('@angular/common');
var angular2_material_1 = require('../../../../shared/libs/angular2-material');
var summary_image_component_1 = require('../summary-image/summary-image.component');
var PanelSummaryComponent = (function () {
    function PanelSummaryComponent() {
        this.imageLoaded = false;
        this._currentImageSize = null;
        this._currentImageName = false;
        this._summary = '';
        this.expanded = false;
        this.empty = true;
        this.valueChanged = false;
    }
    Object.defineProperty(PanelSummaryComponent.prototype, "currentImageSize", {
        get: function () {
            return this._currentImageSize;
        },
        set: function (v) {
            this._currentImageSize = v;
        },
        enumerable: true,
        configurable: true
    });
    PanelSummaryComponent.prototype.ngAfterViewInit = function () {
        this.summary = this.value;
    };
    PanelSummaryComponent.prototype.report = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(this);
    };
    PanelSummaryComponent.prototype.setOptions = function (options) {
        if (options.length) {
            this._selectOptions = options.map(function (item) {
                return {
                    value: item['_element']['nativeElement']['value'],
                    label: item['_element']['nativeElement'].innerHTML
                };
            });
        }
    };
    Object.defineProperty(PanelSummaryComponent.prototype, "summary", {
        get: function () {
            return this._summary;
        },
        set: function (v) {
            this._summary = v;
        },
        enumerable: true,
        configurable: true
    });
    PanelSummaryComponent.prototype.ngOnChanges = function (changes) {
        for (var prop in changes) {
            var previousValue = changes[prop].previousValue;
            var currentValue = changes[prop].currentValue;
            var isFirstChange = changes[prop].isFirstChange;
            console.log('PanelSummary.' + prop + ' changed: ', { from: previousValue, to: currentValue, isFirstChange: isFirstChange });
            switch (prop) {
                case 'value':
                    this.setSummaryOf(currentValue);
                    break;
            }
        }
    };
    PanelSummaryComponent.prototype.setSummaryOf = function (value) {
        switch (this.type) {
            case 'select':
                var filtered = this._selectOptions.filter(function (opt) {
                    return opt['value'] == value;
                });
                if (filtered.length) {
                    this.summary = filtered[0]['label'];
                }
                break;
            default:
                this.summary = value;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelSummaryComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelSummaryComponent.prototype, "empty", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelSummaryComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryComponent.prototype, "gallery", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelSummaryComponent.prototype, "currentImage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelSummaryComponent.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelSummaryComponent.prototype, "editText", void 0);
    __decorate([
        core_1.ViewChild('imagePreview'), 
        __metadata('design:type', core_1.ElementRef)
    ], PanelSummaryComponent.prototype, "_imagePreview", void 0);
    PanelSummaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-summary',
            templateUrl: './panel-summary.component.html',
            styleUrls: ['./panel-summary.component.css'],
            directives: [angular2_material_1.MATERIAL_DIRECTIVES, summary_image_component_1.PanelSummaryImage],
            viewProviders: [common_1.NgSwitch, common_1.NgSwitchCase, common_1.NgSwitchDefault]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelSummaryComponent);
    return PanelSummaryComponent;
}());
exports.PanelSummaryComponent = PanelSummaryComponent;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./panel-summary.component'));

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
var icon_1 = require('@angular2-material/icon');
var GridImage = (function () {
    function GridImage() {
        this.hovering = false;
        this.clickedRemove = new core_1.EventEmitter();
        this.imageLoaded = new core_1.EventEmitter();
    }
    GridImage.prototype.onMouseEnter = function (e) {
        this.hovering = true;
    };
    GridImage.prototype.onMouseLeave = function (e) {
        this.hovering = false;
    };
    GridImage.prototype.ngOnInit = function () {
        var _this = this;
        this._imageEl.nativeElement.addEventListener('load', function (e) {
            _this.imageLoaded.emit({ event: e, config: _this.imageConfig });
        });
    };
    GridImage.prototype.remove = function () {
        this.clickedRemove.emit({ config: this.imageConfig, index: this.index });
    };
    __decorate([
        core_1.ViewChild('image'), 
        __metadata('design:type', core_1.ElementRef)
    ], GridImage.prototype, "_imageEl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "imageConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GridImage.prototype, "index", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "clickedRemove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GridImage.prototype, "imageLoaded", void 0);
    __decorate([
        core_1.HostListener('mouseenter', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], GridImage.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], GridImage.prototype, "onMouseLeave", null);
    GridImage = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-grid-image',
            templateUrl: './grid-image.html',
            styleUrls: ['./grid-image.css'],
            directives: [
                icon_1.MdIcon
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], GridImage);
    return GridImage;
}());
exports.GridImage = GridImage;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./grid-image'));

"use strict";
var FileLikeObject = (function () {
    function FileLikeObject() {
    }
    return FileLikeObject;
}());
exports.FileLikeObject = FileLikeObject;

"use strict";
var FileItem = (function () {
    function FileItem() {
        this.alias = 'file';
        this.url = '/';
        this.method = 'POST';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
    }
    return FileItem;
}());
exports.FileItem = FileItem;

"use strict";
var ImageItem = (function () {
    function ImageItem(file) {
        this.index = void 0;
        this.progress = 0;
        this.isUploading = false;
        this.isUploaded = false;
        this._file = file;
        this.name = file.name;
        this.type = file.type;
        this.size = file.size;
        this.last_modified = file.lastModifiedDate;
        if (file['webkitRelativePath']) {
            this.webkitRelativePath = file['webkitRelativePath'];
        }
        console.info('ImageItem constructed ...', this);
    }
    ImageItem.prototype.map = function (mapFn) {
        var _this = this;
        var keys = Object.keys(this);
        keys.forEach(function (key) {
            switch (key) {
                case 'progress':
                case 'isUploading':
                case 'isUploaded':
                case '_xhr':
                    break;
                default:
                    var value = _this[key];
                    mapFn.apply(_this, [key, value]);
            }
        });
    };
    return ImageItem;
}());
exports.ImageItem = ImageItem;

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
var nextUniqueId = 0;
var FileUploader = (function () {
    function FileUploader() {
        this.queue = [];
        this.isUploading = false;
        this.progress = 0;
        console.log('Wow Im a file uploader');
    }
    Object.defineProperty(FileUploader.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    FileUploader.prototype.setUrl = function (url) {
        console.log('ImageUploader set URL to ' + url);
        this._url = url;
    };
    Object.defineProperty(FileUploader.prototype, "authToken", {
        get: function () {
            return this._authToken;
        },
        enumerable: true,
        configurable: true
    });
    FileUploader.prototype.setAuthToken = function (token) {
        console.warn('ImageUploader set authtoken to ' + token);
        this._authToken = token;
    };
    FileUploader.prototype.addToQueue = function (items) {
        console.debug('Uploader.addToQueue() # ', items);
        var list = [];
        var count = this.queue.length;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var file = items_1[_i];
            this.queue.push(file);
        }
        if (this.queue.length !== count) {
            this.progress = this._getTotalProgress();
        }
        console.debug('ImageUploader added ' + (this.queue.length - count) + ' images.');
    };
    FileUploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploader.prototype.uploadAll = function () {
        var _this = this;
        var items = this.queue;
        console.log('ImageUploader.uploadAll() #', items);
        if (!items.length) {
            return Rx_1.Observable.of(false).delay(5000).do(function (val) { return val; });
        }
        return Rx_1.Observable.create(function (observer) {
            var items = _this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
            items.forEach(function (item) {
                _this.prepareItem(item);
                _this.uploadItem(item);
            });
        });
    };
    FileUploader.prototype.uploadItem = function (image) {
        console.log('ImageUploader.uploadItem()  # ', image);
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this._upload(image);
    };
    FileUploader.prototype.prepareItem = function (item) {
        item.index = item.index || nextUniqueId++;
    };
    FileUploader.prototype.isFile = function (value) {
        return (File && value instanceof File);
    };
    FileUploader.prototype.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
        return false;
    };
    FileUploader.prototype._upload = function (image) {
        var _this = this;
        console.log('ImageUploader._upload() #', image);
        var xhr = image._xhr = new XMLHttpRequest();
        var form = new FormData();
        image.map(function (key, val) {
            console.log('appending to form ', { key: key, val: val });
            form.append(key, val);
        });
        console.log('going to upload this here image: ', {
            image: image,
            form: form,
            xhr: xhr
        });
        image.isUploading = true;
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            var total = _this._getTotalProgress(progress);
            _this.progress = total;
            console.log('progress!!!!!!', { event: event, progress: progress, total: total, xhr: xhr });
        };
        xhr.onerror = function (e) { console.log('xhr on error', { e: e, xhr: xhr }); };
        xhr.onload = function (e) { console.log('xhr on load ', { e: e, xhr: xhr }); };
        xhr.onabort = function (e) { console.log('xhr on abort', { e: e, xhr: xhr }); };
        xhr.open('POST', this.url, true);
        if (this.authToken) {
            console.log('Setting Request Header "Authorization" to ', 'Bearer ' + this.authToken);
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.authToken);
        }
        xhr.send(form);
        console.log('just sent xhr!', xhr);
    };
    FileUploader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FileUploader);
    return FileUploader;
}());
exports.FileUploader = FileUploader;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./file-like-object'));
__export(require('./file-item'));
__export(require('./image-item'));
__export(require('./uploader'));

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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var angular2_jwt_1 = require('angular2-jwt');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var AuthService = (function () {
    function AuthService(http, authHttp, helper) {
        this.http = http;
        this.authHttp = authHttp;
        this.helper = helper;
        this._authorized = false;
        this.hasStorage = !(localStorage === undefined);
        this.token = '';
        this._authTokenSource = new ReplaySubject_1.ReplaySubject(1);
        this.authToken$ = this._authTokenSource.asObservable();
        this._authorizedSource = new ReplaySubject_1.ReplaySubject(1);
        this.whenAuthorized = this._authorizedSource.asObservable();
        this.ngOnInit();
    }
    Object.defineProperty(AuthService.prototype, "authorized", {
        get: function () { return this._authorized; },
        set: function (v) {
            this._authorized = v;
            this._authorizedSource.next(v);
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.ngOnInit = function () {
        var _this = this;
        if (this.hasStorage) {
            ['token', 'expires'].forEach(function (key) {
                var val = localStorage.getItem("id_" + key);
                if (val)
                    _this[key] = val;
            });
        }
        else {
            console.warn('authService#local storage is not supported.');
        }
        if (this.token != '') {
            console.log('authService#Found authorization token in localStorage.  Checking expiration date...');
            if (this.expires !== undefined && this.timeLeft(this.expires) > 0) {
                this.authorized = true;
                console.log('authService#PASS: Authorization token is still valid for ' + this.timeLeft(this.expires) + ' seconds.');
            }
            else {
                console.log('authService#FAIL: Authorization token expired on ', this.expires);
                this.refresh()
                    .subscribe(function (res) {
                    console.log('refresh response to subscription receiver', res);
                });
            }
        }
        else {
            console.log('authService#no token found in storage.');
        }
        console.log('authService#init END', this);
    };
    AuthService.prototype.timeLeft = function (expires) {
        return expires - (new Date().getTime() / 1000);
    };
    AuthService.prototype.setToken = function (token) {
        if (this.hasStorage)
            localStorage.setItem('id_token', token);
        this.token = token;
        this.informObservers(token);
        return this;
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService.prototype.informObservers = function (token) {
        if (token === undefined)
            token = this.token;
        this._authTokenSource.next(token);
    };
    AuthService.prototype.setExpires = function (expires) {
        if (this.hasStorage)
            localStorage.setItem('id_expires', expires);
        this.expires = expires;
        return this;
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        console.log('authService#login: ', email, password);
        return Rx_1.Observable.create(function (observer) {
            _this.http.post('authenticate', { email: email, password: password })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.setToken(res.token);
                _this.setExpires(res.expires);
                _this.authorized = true;
                observer.next(res);
            }, function (error) { return observer.error(_this.parseError(error)); });
        });
    };
    AuthService.prototype.refresh = function () {
        var _this = this;
        console.log('authService#refresh');
        return Rx_1.Observable.create(function (observer) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + _this.token });
            _this.http.get('authenticate/refresh', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                console.log('authService#refresh Success', res);
                _this.setToken(res.token);
                _this.setExpires(res.expires);
                _this.authorized = true;
                observer.next(res);
            }, function (error) {
                console.log('error in jwt refresh ', error);
                observer.error(error);
            });
        });
    };
    AuthService.prototype.reset = function () {
        this.authorized = false;
        this.token = '';
        if (this.hasStorage)
            localStorage.removeItem('id_token');
        this.expires = undefined;
        if (this.hasStorage)
            localStorage.removeItem('id_expires');
    };
    AuthService.prototype.parseError = function (error) {
        var title = 'Error';
        var message = "Something went wrong and I'm not sure what.  Try again later.";
        if (error.status === 500) {
            title = 'Server Error';
            message = 'An error occured on the server.  Come back later and try again.';
        }
        else {
            try {
                var json = JSON.parse(error._body);
                message = json.errorText || json.error;
                if (json.error === 'invalid_credentials')
                    title = 'Login failed';
            }
            catch (e) {
                console.log('authService#parseError couldnt parse the json: ', {
                    error: error,
                    reason: e
                });
            }
        }
        return { title: title, message: message };
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, angular2_jwt_1.JwtHelper])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

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
var forms_1 = require('@angular/forms');
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var grid_list_1 = require('@angular2-material/grid-list');
var progress_bar_1 = require('@angular2-material/progress-bar');
var icon_1 = require('@angular2-material/icon');
var Rx_1 = require('rxjs/Rx');
var grid_image_1 = require('./grid-image/grid-image');
var index_1 = require('./uploader/index');
var auth_service_1 = require('../../services/auth.service');
var noop = function () { };
var nextUniqueId = 0;
exports.IMAGE_UPLOAD_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return ImageUploadComponent; }),
    multi: true
});
var ImageUploadComponent = (function () {
    function ImageUploadComponent(authService) {
        this.isDragOver = false;
        this.isLoading = false;
        this._count = 0;
        this._empty = false;
        this._added = 0;
        this._imagesLoaded = 0;
        this._value = [];
        this._nextWeight = 0;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.multiple = false;
        this.images = [];
        this.gutterSize = "8px";
        this.cols = 4;
        this.rowHeight = '16:9';
        this.name = null;
        this.required = false;
        this.id = "jpa-panel-" + nextUniqueId++;
        this.step = null;
        this.tabIndex = null;
        this.fileAdded = new core_1.EventEmitter();
        this.imageLoaded = new core_1.EventEmitter();
        this.imageAdded = new core_1.EventEmitter();
        this.imageRemoved = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(ImageUploadComponent.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ImageUploadComponent.prototype.handleFocus = function (event) {
        console.log('ImageUploadComponent#handleFocus', event);
    };
    ImageUploadComponent.prototype.handleBlur = function (event) {
        console.log('ImageUploadComponent#handleBlur', event);
    };
    ImageUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.images === undefined) {
            this.images = [];
        }
        this.isLoading = this._empty = !!this.images.length;
        this._count = this.images.length;
        this.images.forEach(function (image) {
            if (image.weight >= _this._nextWeight) {
                _this._nextWeight = image.weight + 5;
            }
        });
    };
    ImageUploadComponent.prototype.ngAfterViewInit = function () {
        if (this._gridImages) {
            this._gridImages.changes.subscribe(function (changes) {
                console.log('Changes to grid images: ', changes);
            });
        }
        console.info('ImageUploadComponent#AfterViewInit ---', this);
    };
    ImageUploadComponent.prototype.ngOnChanges = function (changes) {
    };
    ImageUploadComponent.prototype.onDragOver = function (e) {
        var transfer = this._getTransfer(e);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._stopEvent(e);
        this.isDragOver = true;
    };
    ImageUploadComponent.prototype.onDragLeave = function (e) {
        this._stopEvent(e);
        this.isDragOver = false;
    };
    ImageUploadComponent.prototype.onFileDrop = function (e) {
        var _this = this;
        var files = e.target.files || e.dataTransfer.files;
        this._stopEvent(e);
        this.isDragOver = false;
        this.fileAdded.emit(files);
        this.isLoading = true;
        var count = this.value.length;
        var _loop_1 = function(i) {
            var file = files[i];
            var value = this_1.value;
            value.push(file);
            this_1.value = value;
            var image = new index_1.ImageItem(file);
            var reader = new FileReader();
            var k = i;
            this_1.isLoading = true;
            reader.addEventListener('load', function (e) {
                file._weight = _this._nextWeight;
                _this._nextWeight = _this._nextWeight + 5;
                var newImage = {
                    id: 'upload_' + i,
                    name: file.name,
                    image_url: reader.result,
                    isNew: true,
                    _file: file,
                    weight: file._weight
                };
                _this.addImageToGrid(newImage);
            });
            setTimeout(function () { reader.readAsDataURL(file); });
        };
        var this_1 = this;
        for (var i = 0; i < files.length; i++) {
            _loop_1(i);
        }
        console.log('ImageUploadComponent#FileDrop', {
            e: e,
            this: this
        });
    };
    ImageUploadComponent.prototype.addImageToGrid = function (image) {
        console.log('Loaded new image: ', image);
        this.images.push(image);
        this.imageAdded.emit(image);
    };
    Object.defineProperty(ImageUploadComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            console.debug('ImageUploadComponent# set value(): ', {
                v: v,
                _value: this._value
            });
            if (v.length !== this._added) {
                this._added++;
                this._value = v;
                console.warn('emitting change', v);
                this.change.emit(v);
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ImageUploadComponent.prototype.writeValue = function (value) {
        this._value = value || [];
        console.debug('ImageUpload#writeValue: ', { value: this._value });
    };
    ImageUploadComponent.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    ImageUploadComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    ImageUploadComponent.prototype._stopEvent = function (e) {
        event.preventDefault();
        event.stopPropagation();
    };
    ImageUploadComponent.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    ImageUploadComponent.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    ImageUploadComponent.prototype.handleImageLoaded = function (e) {
        e._hasNew = false;
        if (e.config.isNew) {
            console.debug('ImageUpload.handleImageLoaded NEW', {
                e: e,
                value: this.value
            });
            this.isLoading = false;
            e._hasNew = true;
        }
        else {
            var id = e.config.id;
            if (++this._imagesLoaded === this.images.length) {
                this.isLoading = false;
            }
        }
        this.imageLoaded.emit(e);
    };
    ImageUploadComponent.prototype.handleClickedRemove = function (e) {
        console.debug('ImageUpload.handleClickedRemove', {
            e: e,
            value: this.value
        });
        this.images.splice(e.index, 1);
        if (this.value && this.value.length) {
            console.log('Searching through value to remove', this.value);
            var idx = this.value.indexOf(e.config._file);
            console.log('indexOf result', { idx: idx });
            if (idx !== -1) {
                this.value = this._value.splice(idx, 1);
            }
        }
        this.imageRemoved.emit(e);
    };
    __decorate([
        core_1.ViewChildren(grid_image_1.GridImage), 
        __metadata('design:type', core_1.QueryList)
    ], ImageUploadComponent.prototype, "_gridImages", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], ImageUploadComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ImageUploadComponent.prototype, "images", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "gutterSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageUploadComponent.prototype, "cols", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], ImageUploadComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageUploadComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageUploadComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageUploadComponent.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ImageUploadComponent.prototype, "fileAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "imageLoaded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "imageAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "imageRemoved", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Rx_1.Observable)
    ], ImageUploadComponent.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Rx_1.Observable)
    ], ImageUploadComponent.prototype, "onFocus", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageUploadComponent.prototype, "value", null);
    ImageUploadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-image-upload',
            templateUrl: './image-upload.component.html',
            styleUrls: ['./image-upload.component.css'],
            directives: [
                grid_list_1.MD_GRID_LIST_DIRECTIVES,
                progress_bar_1.MD_PROGRESS_BAR_DIRECTIVES,
                icon_1.MD_ICON_DIRECTIVES,
                forms_1.NgModel,
                grid_image_1.GridImage
            ],
            providers: [exports.IMAGE_UPLOAD_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], ImageUploadComponent);
    return ImageUploadComponent;
}());
exports.ImageUploadComponent = ImageUploadComponent;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./grid-image/index'));
__export(require('./image-upload.component'));
__export(require('./uploader/index'));

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var field_value_1 = require('@angular2-material/core/annotations/field-value');
var error_1 = require('@angular2-material/core/errors/error');
var Observable_1 = require('rxjs/Observable');
var input_1 = require('@angular2-material/input');
var angular2_material_1 = require('../../libs/angular2-material');
var index_1 = require('./content/index');
var index_2 = require('./summary/index');
var index_3 = require('../image-upload/index');
exports.JPA_PANEL_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return JpaPanel; }),
    multi: true
});
var noop = function () { };
var JPA_PANEL_VALID_INPUT_TYPE = [
    'text',
    'select',
    'textarea',
    'image',
    'images'
];
var JPA_PANEL_UNDERLINE_HIDDEN = [
    'textarea',
    'image',
    'images'
];
var nextUniqueId = 0;
var JpaPanelUnsupportedTypeError = (function (_super) {
    __extends(JpaPanelUnsupportedTypeError, _super);
    function JpaPanelUnsupportedTypeError(type) {
        _super.call(this, "Input type \"" + type + "\" isn't supported by jpa-panel.");
    }
    return JpaPanelUnsupportedTypeError;
}(error_1.MdError));
exports.JpaPanelUnsupportedTypeError = JpaPanelUnsupportedTypeError;
var JpaPanelDuplicatedHintError = (function (_super) {
    __extends(JpaPanelDuplicatedHintError, _super);
    function JpaPanelDuplicatedHintError(align) {
        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
    }
    return JpaPanelDuplicatedHintError;
}(error_1.MdError));
exports.JpaPanelDuplicatedHintError = JpaPanelDuplicatedHintError;
var JpaPanel = (function () {
    function JpaPanel() {
        this._focused = false;
        this._expanded = false;
        this._value = '';
        this._empty = false;
        this._underlineHidden = false;
        this._isTextfield = false;
        this._isTextarea = false;
        this._isImage = false;
        this._isGallery = false;
        this._isSelect = false;
        this._hasContent = false;
        this._hasContentRight = false;
        this._hasContentBottom = false;
        this._hasContentLeft = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.dividerColor = 'primary';
        this.hintLabel = '';
        this.autoFocus = false;
        this.disabled = false;
        this.id = "jpa-panel-" + nextUniqueId++;
        this.max = null;
        this.maxLength = null;
        this.min = null;
        this.minLength = null;
        this.placeholder = null;
        this.readOnly = false;
        this.required = false;
        this.spellCheck = false;
        this.step = null;
        this.tabIndex = null;
        this.name = null;
        this.type = 'text';
        this.label = null;
        this.currentImage = null;
        this.gallery = [];
        this.fullWidth = false;
        this._blurEmitter = new core_1.EventEmitter();
        this._focusEmitter = new core_1.EventEmitter();
        this._expandedEmitter = new core_1.EventEmitter();
        this.imageFieldChanged = new core_1.EventEmitter();
        this._initialValue = null;
        this._valueChanged = false;
        this._imageLoaded = false;
        this._currentImageSize = null;
    }
    JpaPanel.prototype.ngOnInit = function () {
        switch (this.type) {
            case 'text':
                this._isTextfield = true;
                break;
            case 'select':
                this._isSelect = true;
                break;
            case 'textarea':
                this._isTextarea = true;
                break;
            case 'image':
                this._isImage = true;
                break;
            case 'images':
                this._isGallery = true;
                this._empty = true;
                this._hasContentBottom = true;
                this.fullWidth = true;
                break;
        }
    };
    Object.defineProperty(JpaPanel.prototype, "focused", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "empty", {
        get: function () { return this._value == null || this._value === ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "characterCount", {
        get: function () {
            return this.empty ? 0 : ('' + this._value).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "inputId", {
        get: function () { return this.id + "-panel"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "focusedClass", {
        get: function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "expandedClass", {
        get: function () { return this._expanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "changedClass", {
        get: function () { return this._valueChanged; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "onExpand", {
        get: function () {
            return this._expandedEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "expanded", {
        get: function () { return this._expanded; },
        set: function (v) { this._expanded = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "value", {
        get: function () {
            if (this.type === 'image') {
                return '';
            }
            return this._value;
        },
        set: function (v) {
            v = this._convertValueForInputType(v);
            console.debug('JpaPanel' + this.type + '.' + this.name + '# set value(): ', v);
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
            this._empty = this.isEmpty(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    JpaPanel.prototype.isEmpty = function (v) {
        return v === undefined || v === null || (Array.isArray(v) && v.length === 0) || Object.keys(v).length === 0;
    };
    Object.defineProperty(JpaPanel.prototype, "currentImageSize", {
        get: function () {
            return this._currentImageSize;
        },
        set: function (v) {
            this._currentImageSize = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpaPanel.prototype, "nativeElement", {
        get: function () {
            switch (this.type) {
                case 'select': return this._selectElement.nativeElement;
                case 'textarea': return this._textareaElement.nativeElement;
                default:
                    if (this._inputElement) {
                        return this._inputElement.nativeElement;
                    }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    JpaPanel.prototype.focus = function () {
        if (this.nativeElement) {
            this.nativeElement.focus();
        }
    };
    JpaPanel.prototype.handleFocus = function (event) {
        if (this.expanded) {
            this._focused = true;
            this._focusEmitter.emit(event);
        }
        else {
        }
    };
    JpaPanel.prototype.handleBlur = function (event) {
        if (this.expanded) {
            this._focused = false;
            this._onTouchedCallback();
            this._blurEmitter.emit(event);
        }
        else {
        }
    };
    JpaPanel.prototype.handleChange = function (event) {
        console.debug('JpaPanel.' + this.type + ' ' + this.name + '#handleChange: ', event, this);
        switch (this.type) {
            case 'images':
                this.value = event;
                break;
            case 'select':
                this.value = event.target.value;
                break;
            case 'textarea':
                this.value = event.target.value;
                break;
            case 'image':
                this.value = event.target.files[0];
                this.imageFieldChanged.emit(event);
                break;
            default:
                this.value = event.target.value;
                break;
        }
        this._valueChanged = true;
        this._onTouchedCallback();
    };
    JpaPanel.prototype.writeValue = function (value) {
        console.debug('JpaPanel.' + this.type + ' ' + this.name + '#writeValue(' + this.type + ')', value);
        this._value = value;
        if (!this._initialValue)
            this._initialValue = value;
    };
    JpaPanel.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    JpaPanel.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    JpaPanel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._validateConstraints();
        this._hintChildren.changes.subscribe(function () {
            _this._validateConstraints();
        });
        if (JPA_PANEL_UNDERLINE_HIDDEN.indexOf(this.type) !== -1) {
            this._underlineHidden = true;
        }
        this._hasContent = !!this._contentChildren.length;
        if (this._hasContent) {
            this._contentChildren.forEach(function (panel) {
                console.log('CONTENT CHILDREN PANEL CONTENT OMGGGGGGGGGGG ', panel);
                switch (panel.align) {
                    case 'right':
                        _this._hasContentRight = true;
                        break;
                    case 'left':
                        _this._hasContentLeft = true;
                        break;
                    case 'bottom':
                        _this._hasContentBottom = true;
                        break;
                }
            });
        }
        if (this._summaryChild) {
            switch (this.type) {
                case 'select':
                    this._summaryChild.setOptions(this._optionChildren);
                    break;
            }
        }
        console.debug('JpaPanel.' + this.type + ' ' + this.name + '#AfterContentInit', this);
    };
    JpaPanel.prototype.ngAfterViewInit = function () {
        switch (this.type) {
            case 'image':
                this.value = this.nativeElement.value;
                break;
            default:
                if (this.nativeElement) {
                    this.value = this.nativeElement.value;
                }
                break;
        }
        console.debug('JpaPanel.' + this.type + ' ' + this.name + '#ngAfterViewInit', this);
    };
    JpaPanel.prototype.ngOnChanges = function (changes) {
        console.log('PANEL changed something: ', changes);
        for (var prop in changes) {
            var previousValue = changes[prop].previousValue;
            var currentValue = changes[prop].currentValue;
            var isFirstChange = changes[prop].isFirstChange;
            console.log('PanelComponent.' + prop + ' changed: ', { from: previousValue, to: currentValue, isFirstChange: isFirstChange });
        }
        this._validateConstraints();
    };
    JpaPanel.prototype._convertValueForInputType = function (v) {
        switch (this.type) {
            case 'number': return parseFloat(v);
            default: return v;
        }
    };
    JpaPanel.prototype._validateConstraints = function () {
        var _this = this;
        if (JPA_PANEL_VALID_INPUT_TYPE.indexOf(this.type) === -1) {
            throw new JpaPanelUnsupportedTypeError(this.type);
        }
        if (this._hintChildren) {
            var startHint_1 = null;
            var endHint_1 = null;
            this._hintChildren.forEach(function (hint) {
                if (hint.align == 'start') {
                    if (startHint_1 || _this.hintLabel) {
                        throw new JpaPanelDuplicatedHintError('start');
                    }
                    startHint_1 = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint_1) {
                        throw new JpaPanelDuplicatedHintError('end');
                    }
                    endHint_1 = hint;
                }
            });
        }
    };
    JpaPanel.prototype.toggle = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this._expanded = !this._expanded;
        this.onToggle();
    };
    JpaPanel.prototype.onToggle = function () {
        var _this = this;
        this._expandedEmitter.emit(this._expanded);
        if (this._hasContent) {
            this._contentChildren.forEach(function (panelContent) {
                panelContent.onToggle(_this._expanded);
            });
        }
    };
    JpaPanel.prototype.fileAdded = function (e) {
        console.log('PanelComponent -- ImageUpload -- fileAdded', e);
    };
    JpaPanel.prototype.imageAdded = function (e) {
        console.log('PanelComponent -- ImageUpload -- imageAdded', e);
    };
    JpaPanel.prototype.imageLoaded = function (e) {
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input('aria-labelledby'), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "ariaLabelledBy", void 0);
    __decorate([
        core_1.Input('aria-disabled'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "ariaDisabled", void 0);
    __decorate([
        core_1.Input('aria-required'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "ariaRequired", void 0);
    __decorate([
        core_1.Input('aria-invalid'),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "ariaInvalid", void 0);
    __decorate([
        core_1.ContentChildren(input_1.MdHint), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanel.prototype, "_hintChildren", void 0);
    __decorate([
        core_1.ContentChildren(forms_1.NgSelectOption), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanel.prototype, "_optionChildren", void 0);
    __decorate([
        core_1.ContentChildren(index_1.JpaPanelContent), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanel.prototype, "_contentChildren", void 0);
    __decorate([
        core_1.ViewChild(index_2.PanelSummaryComponent), 
        __metadata('design:type', index_2.PanelSummaryComponent)
    ], JpaPanel.prototype, "_summaryChild", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_inputElement", void 0);
    __decorate([
        core_1.ViewChild('select'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_selectElement", void 0);
    __decorate([
        core_1.ViewChild('textarea'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_textareaElement", void 0);
    __decorate([
        core_1.ViewChild('imagePreview'), 
        __metadata('design:type', core_1.ElementRef)
    ], JpaPanel.prototype, "_imagePreview", void 0);
    __decorate([
        core_1.HostBinding('class.focused'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "focusedClass", null);
    __decorate([
        core_1.HostBinding('class.expanded'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "expandedClass", null);
    __decorate([
        core_1.HostBinding('class.changed'), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "changedClass", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "dividerColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "hintLabel", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "autoFocus", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        field_value_1.BooleanFieldValue(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "spellCheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], JpaPanel.prototype, "tabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "currentImage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], JpaPanel.prototype, "gallery", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], JpaPanel.prototype, "fullWidth", void 0);
    __decorate([
        core_1.Output('blur'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaPanel.prototype, "onBlur", null);
    __decorate([
        core_1.Output('focus'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaPanel.prototype, "onFocus", null);
    __decorate([
        core_1.Output('expand'), 
        __metadata('design:type', Observable_1.Observable)
    ], JpaPanel.prototype, "onExpand", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "imageFieldChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JpaPanel.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JpaPanel.prototype, "editText", void 0);
    JpaPanel = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel',
            templateUrl: './panel.component.html',
            styleUrls: ['./panel.component.css'],
            directives: [
                angular2_material_1.MATERIAL_DIRECTIVES,
                common_1.NgIf,
                forms_1.NgModel,
                forms_1.NgSelectOption,
                index_1.JpaPanelContent,
                index_3.ImageUploadComponent,
                index_2.PanelSummaryComponent,
            ],
            providers: [exports.JPA_PANEL_VALUE_ACCESSOR, index_3.FileUploader],
            pipes: [common_1.SlicePipe],
            host: {
                '(click)': 'focus()'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], JpaPanel);
    return JpaPanel;
}());
exports.JpaPanel = JpaPanel;

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
var index_1 = require('../index');
var JpaPanelGroup = (function () {
    function JpaPanelGroup() {
        this.childExpanded = false;
    }
    Object.defineProperty(JpaPanelGroup.prototype, "expandedClass", {
        get: function () { return this.childExpanded; },
        enumerable: true,
        configurable: true
    });
    JpaPanelGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._panelChildren.forEach(function (panel) {
            panel.onExpand.subscribe(function (e) {
                _this.childExpanded = e;
            });
        });
    };
    JpaPanelGroup.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        core_1.HostBinding('class.child-expanded'), 
        __metadata('design:type', Object)
    ], JpaPanelGroup.prototype, "expandedClass", null);
    __decorate([
        core_1.ContentChildren(index_1.JpaPanel), 
        __metadata('design:type', core_1.QueryList)
    ], JpaPanelGroup.prototype, "_panelChildren", void 0);
    JpaPanelGroup = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-panel-group',
            template: '<ng-content></ng-content>',
            styleUrls: ['./panel-group.component.css'],
            directives: [index_1.JpaPanel]
        }), 
        __metadata('design:paramtypes', [])
    ], JpaPanelGroup);
    return JpaPanelGroup;
}());
exports.JpaPanelGroup = JpaPanelGroup;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./panel-group.component'));

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./panel.component'));
__export(require('./content/panel-content.component'));
__export(require('./group/index'));
__export(require('./summary/panel-summary.component'));
__export(require('./summary-image/summary-image.component'));

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./list/index'));
__export(require('./progress/index'));
__export(require('./md-select/index'));
__export(require('./panel/index'));
__export(require('./image-upload/index'));

"use strict";

"use strict";
var Blog = (function () {
    function Blog() {
        this.id = -1;
        this.animateIn = true;
        this.title = '';
        this.image = '';
        this.text = '';
        this.body = '';
        this.created_at = '';
        this.tag = '';
        this.author = '';
        this.identifier = '';
    }
    return Blog;
}());
exports.Blog = Blog;

"use strict";
var JpClient = (function () {
    function JpClient() {
        this.id = null;
        this.featured = false;
    }
    return JpClient;
}());
exports.JpClient = JpClient;

"use strict";
var FormSubmission = (function () {
    function FormSubmission(first_name, last_name, company, email, phone, contact_time, comments) {
        if (first_name === void 0) { first_name = ''; }
        if (last_name === void 0) { last_name = ''; }
        if (company === void 0) { company = ''; }
        if (email === void 0) { email = ''; }
        if (phone === void 0) { phone = ''; }
        if (contact_time === void 0) { contact_time = ''; }
        if (comments === void 0) { comments = ''; }
    }
    return FormSubmission;
}());
exports.FormSubmission = FormSubmission;

"use strict";

"use strict";
var client_1 = require('./client');
var Work = (function () {
    function Work() {
        this.id = undefined;
        this.title = '';
        this.body = '';
        this.image = undefined;
        this.image_new = undefined;
        this.client = new client_1.JpClient();
        this.created_at = undefined;
        this.updated_at = undefined;
        this.gallery = [];
        this.gallery_new = [];
    }
    return Work;
}());
exports.Work = Work;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./blog'));
__export(require('./client'));
__export(require('./form-submission'));
__export(require('./work'));

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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var BlogService = (function () {
    function BlogService(http) {
        this.http = http;
        this.http = http;
    }
    BlogService.prototype.all = function (params) {
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        return this.http.get('/blogs/paged', { search: query })
            .map(function (res) { return res.json(); });
    };
    BlogService.prototype.setList = function (res) {
        this.list = res;
        return this;
    };
    BlogService.prototype.getList = function () {
        return this.list;
    };
    BlogService.prototype.find = function (id, cached) {
        if (cached && this.byId[id] !== undefined) {
            return this.byId[id];
        }
        return this.http.get('/blog/' + id)
            .map(function (res) { return res.json(); });
    };
    BlogService.prototype.cache = function (blog) {
        this.byId[blog.id] = blog;
        return this;
    };
    BlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;

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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var ClientService = (function () {
    function ClientService(http) {
        this.http = http;
        this.http = http;
    }
    ClientService.prototype.options = function () {
        return this.http.get('/options/clients')
            .map(function (res) { return res.json(); });
    };
    ClientService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;

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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var auth_service_1 = require('./auth.service');
var angular2_jwt_1 = require('angular2-jwt');
var WorkService = (function () {
    function WorkService(http, authHttp, authService) {
        this.http = http;
        this.authHttp = authHttp;
        this.http = http;
        this.authToken = authService.getToken();
    }
    WorkService.prototype.all = function (params) {
        if (params === void 0) { params = {}; }
        var query = new http_1.URLSearchParams();
        for (var key in params) {
            var param = params[key];
            query.set(key, param);
        }
        return this.http.get('/work/paged', { search: query })
            .map(function (res) { return res.json(); });
    };
    WorkService.prototype.setList = function (res) {
        this.list = res;
        return this;
    };
    WorkService.prototype.getList = function () {
        return this.list;
    };
    WorkService.prototype.find = function (id, cached) {
        if (cached && this.byId[id] !== undefined) {
            return this.byId[id];
        }
        return this.http.get('/work/' + id)
            .map(function (res) { return res.json(); });
    };
    WorkService.prototype.cache = function (work) {
        this.byId[work.id] = work;
        return this;
    };
    WorkService.prototype.update = function (id, attributes) {
        var url = window.location.protocol + '//' + window.location.hostname + '/work/update/' + id;
        var form = new FormData();
        var _form = {};
        Object.keys(attributes).forEach(function (key) {
            var val = attributes[key];
            switch (key) {
                case 'gallery':
                    val.forEach(function (item, i) {
                        form.append(key + "[" + i + "][id]", item.id);
                        form.append(key + "[" + i + "][weight]", item.weight);
                        _form[(key + "[" + i + "][id]")] = item.id;
                        _form[(key + "[" + i + "][weight]")] = item.weight;
                    });
                    break;
                case 'client':
                    form.append(key, val.id);
                    _form[key] = val.id;
                    break;
                case 'image_new':
                    form.append(key + '[]', val);
                    _form[key] = val;
                    break;
                case 'gallery_new':
                    val.forEach(function (file) {
                        form.append(key + '[]', file);
                        _form[key + '[]'] = file;
                    });
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        console.log('appending to form ', { key: key, val: val });
                        form.append(key, val);
                        _form[key] = val;
                    }
                    else {
                        console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
                    }
            }
        });
        console.debug('WorkService is sending POST request to ' + url + ' with form ', _form);
        return this.http.post(url, form)
            .map(function (res) { return res.json(); });
    };
    WorkService.prototype.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
        return false;
    };
    WorkService.prototype.create = function (attributes) {
        var url = window.location.protocol + '//' + window.location.hostname + '/work';
        var form = new FormData();
        var _form = {};
        Object.keys(attributes).forEach(function (key) {
            var val = attributes[key];
            switch (key) {
                case 'gallery':
                    val.forEach(function (item, i) {
                        form.append(key + "[" + i + "][id]", item.id);
                        form.append(key + "[" + i + "][weight]", item.weight);
                        _form[(key + "[" + i + "][id]")] = item.id;
                        _form[(key + "[" + i + "][weight]")] = item.weight;
                    });
                    break;
                case 'client':
                    form.append(key, val.id);
                    _form[key] = val.id;
                    break;
                case 'image_new':
                    form.append(key + '[]', val);
                    _form[key] = val;
                    break;
                case 'gallery_new':
                    val.forEach(function (file) {
                        form.append(key + '[]', file);
                        _form[key + '[]'] = file;
                    });
                    break;
                default:
                    if (val !== undefined && val !== null) {
                        form.append(key, val);
                        _form[key] = val;
                    }
                    else {
                        console.log('skipping appending ' + key + ' to form because its undefined/null: ', val);
                    }
            }
        });
        console.log("Created a form to upload to work update", _form);
        return this.http.post(url, form)
            .map(function (res) { return res.json(); });
    };
    WorkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.AuthService])
    ], WorkService);
    return WorkService;
}());
exports.WorkService = WorkService;

"use strict";
var auth_service_1 = require('./auth.service');
var blog_service_1 = require('./blog.service');
var client_service_1 = require('./client.service');
var work_service_1 = require('./work.service');
exports.APP_SERVICES = [auth_service_1.AuthService, blog_service_1.BlogService, work_service_1.WorkService, client_service_1.ClientService];

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./auth.service'));
__export(require('./blog.service'));
__export(require('./client.service'));
__export(require('./work.service'));
__export(require('./constants'));

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
var index_1 = require('../services/index');
var AuthGuard = (function () {
    function AuthGuard(service, router) {
        this.service = service;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        console.log('authGuard#canActivate called');
        if (this.service.authorized)
            return true;
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.AuthService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;

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
var index_1 = require('../services/index');
var Rx_1 = require('rxjs/Rx');
var BlogGuard = (function () {
    function BlogGuard(blogService, route) {
        this.blogService = blogService;
        this.route = route;
    }
    BlogGuard.prototype.ngOnInit = function () {
    };
    BlogGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this.route.params.subscribe(function (params) {
                console.log('sweet ass params: ', params);
                var id = +params['id'];
                _this.sub = _this.blogService.find(id).subscribe(function (res) {
                    _this.blogService.cache(res);
                    observer.complete(true);
                });
            });
        });
    };
    BlogGuard.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BlogGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.BlogService, router_1.ActivatedRoute])
    ], BlogGuard);
    return BlogGuard;
}());
exports.BlogGuard = BlogGuard;

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
var index_1 = require('../services/index');
var Rx_1 = require('rxjs/Rx');
var BlogsGuard = (function () {
    function BlogsGuard(blogService) {
        this.blogService = blogService;
    }
    BlogsGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this.sub = _this.blogService.all({
                current_page: 1,
                length: 15,
                order_by: 'updated_at',
                descending: true
            }).subscribe(function (res) {
                _this.blogService.setList(res);
                observer.complete(true);
            });
        });
    };
    BlogsGuard.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BlogsGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.BlogService])
    ], BlogsGuard);
    return BlogsGuard;
}());
exports.BlogsGuard = BlogsGuard;

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
var auth_service_1 = require('../services/auth.service');
var LoginGuard = (function () {
    function LoginGuard(service, router) {
        this.service = service;
        this.router = router;
    }
    LoginGuard.prototype.canActivate = function (next, state) {
        if (this.service.authorized) {
            this.router.navigate(next);
            return false;
        }
        return true;
    };
    LoginGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginGuard);
    return LoginGuard;
}());
exports.LoginGuard = LoginGuard;

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
var index_1 = require('../services/index');
var Rx_1 = require('rxjs/Rx');
var WorkListGuard = (function () {
    function WorkListGuard(workService) {
        this.workService = workService;
    }
    WorkListGuard.prototype.canActivate = function () {
        var _this = this;
        return Rx_1.Observable.create(function (observer) {
            _this.sub = _this.workService.all({
                current_page: 1,
                length: 15,
                order_by: 'updated_at',
                descending: true
            }).subscribe(function (res) {
                _this.workService.setList(res);
                observer.complete(true);
            });
        });
    };
    WorkListGuard.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    WorkListGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.WorkService])
    ], WorkListGuard);
    return WorkListGuard;
}());
exports.WorkListGuard = WorkListGuard;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./auth.guard'));
__export(require('./blog.guard'));
__export(require('./blogs.guard'));
__export(require('./login.guard'));
__export(require('./work-list.guard'));

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var index_1 = require('./index');
var AuthRequestOptions = (function (_super) {
    __extends(AuthRequestOptions, _super);
    function AuthRequestOptions(service) {
        _super.call(this);
        this.service = service;
        console.log('AuthRequestOptions constructed.', this, service);
        setTimeout(function () {
            console.log(service);
        }, 500);
    }
    AuthRequestOptions.prototype.ngOnInit = function () {
        console.log('initialized');
    };
    AuthRequestOptions = __decorate([
        __param(0, core_1.Inject("AuthService")), 
        __metadata('design:paramtypes', [index_1.AuthService])
    ], AuthRequestOptions);
    return AuthRequestOptions;
}(http_1.BaseRequestOptions));
exports.AuthRequestOptions = AuthRequestOptions;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./components/index'));
__export(require('./models/index'));
__export(require('./middleware/index'));
__export(require('./services/index'));
__export(require('./AuthRequestOptions'));

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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var angular2_toaster_1 = require('angular2-toaster');
var angular2_material_1 = require('./shared/libs/angular2-material');
var index_1 = require('./shared/index');
var AppComponent = (function () {
    function AppComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.loggedIn = false;
        this.toasterConfig = new angular2_toaster_1.ToasterConfig({
            showCloseButton: true
        });
        this.loggedIn = this.authService.authorized;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.authService.whenAuthorized.subscribe(function (authorized) { return _this.loggedIn = authorized; });
    };
    AppComponent.prototype.navigateTo = function (link) {
        console.log('navigate to: ', link);
        this.router.navigate(link);
    };
    AppComponent.prototype.logout = function () {
        this.authService.reset();
        this.router.navigate(['/login']);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'jpa-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            viewProviders: [http_1.HTTP_PROVIDERS],
            providers: [angular2_material_1.MATERIAL_PROVIDERS, angular2_toaster_1.ToasterService],
            directives: [
                router_1.ROUTER_DIRECTIVES,
                angular2_material_1.MATERIAL_DIRECTIVES,
                angular2_toaster_1.ToasterContainerComponent
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

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
var forms_1 = require('@angular/forms');
var angular2_material_1 = require('../shared/libs/angular2-material');
var angular2_toaster_1 = require('angular2-toaster');
var index_1 = require('../shared/index');
var LoginComponent = (function () {
    function LoginComponent(router, service, toaster) {
        this.router = router;
        this.service = service;
        this.toaster = toaster;
        this.submitted = false;
        this.working = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        console.log('LoginComponent initialized.', this);
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.working = true;
        this.submitted = true;
        this.service.login(this.email, this.password)
            .subscribe(function (res) { return _this.success(res); }, function (error) { return _this.fail(error); });
    };
    LoginComponent.prototype.success = function (res) {
        var _this = this;
        console.log('Authservice returned successfully: ', res);
        this.working = false;
        this.toaster.pop('success', 'Success!', 'Logging you in now.');
        setTimeout(function () { return _this.router.navigate(['']); }, 500);
    };
    LoginComponent.prototype.fail = function (error) {
        this.working = false;
        this.toaster.pop('error', error.title, error.message);
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            directives: [forms_1.FORM_DIRECTIVES, angular2_material_1.MATERIAL_DIRECTIVES],
            providers: [forms_1.FORM_PROVIDERS, angular2_material_1.MATERIAL_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthService, angular2_toaster_1.ToasterService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.LoginRoutes = [
    {
        path: 'login',
        component: index_1.LoginComponent,
        index: true,
        canActivate: [index_2.LoginGuard]
    }
];

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./login.component'));
__export(require('./login.routes'));

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

"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.HomeRoutes = [
    {
        path: '',
        component: index_1.HomeComponent,
        index: true,
        canActivate: [index_2.AuthGuard]
    },
];

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./home.component'));
__export(require('./home.routes'));

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
var BlogIndexComponent = (function () {
    function BlogIndexComponent() {
    }
    BlogIndexComponent = __decorate([
        core_1.Component({
            template: '<router-outlet></router-outlet>',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], BlogIndexComponent);
    return BlogIndexComponent;
}());
exports.BlogIndexComponent = BlogIndexComponent;

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
var index_1 = require('../shared/index');
var BlogListComponent = (function () {
    function BlogListComponent(blogService, router) {
        this.blogService = blogService;
        this.router = router;
        this.listData = [];
        this.listConfig = {
            sortOptions: [
                { name: 'Updated At', value: 'updated_at' },
                { name: 'Created At', value: 'created_at' },
                { name: 'Title', value: 'title' },
                { name: 'Category', value: 'category' }
            ],
            perPageOptions: [5, 10, 15, 25, 50, 100],
            sort: {
                by: 'updated_at',
                descending: true
            },
            page: {
                currentPage: 1,
                from: 0,
                to: 0,
                total: 0,
                lastPage: 0,
                perPage: 15
            }
        };
    }
    BlogListComponent.prototype.ngOnInit = function () {
        var json = this.blogService.getList();
        this.parseList(json);
    };
    BlogListComponent.prototype.mapList = function (blog) {
        return {
            id: blog.id,
            title: blog.title,
            subtitle: blog.category.name,
            dates: {
                updated_at: blog.updated_at,
                created_at: blog.created_at
            }
        };
    };
    BlogListComponent.prototype.parseList = function (json) {
        this.listData = json.data.map(this.mapList);
        this.listConfig.page = {
            from: json.from,
            to: json.to,
            total: json.total,
            lastPage: json.last_page,
            currentPage: json.current_page,
            perPage: json.per_page
        };
    };
    BlogListComponent.prototype.fetch = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var page = params.page || this.listConfig.page;
        var sort = params.sort || this.listConfig.sort;
        this.sub = this.blogService.all({
            current_page: page.currentPage,
            length: page.perPage,
            order_by: sort.by,
            descending: sort.descending,
        })
            .subscribe(function (json) { return _this.parseList(json); });
    };
    BlogListComponent.prototype.edit = function (blog) {
        console.log('ROUTE TO:', ['/blogs', blog.id]);
        this.router.navigate(['/blogs', blog.id]);
    };
    BlogListComponent.prototype._delete = function (blog) {
        console.log('delete this item: ', blog);
    };
    BlogListComponent.prototype.ngOnDestroy = function () {
        if (this.sub)
            this.sub.unsubscribe();
    };
    BlogListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './blog-list.component.html',
            styleUrls: ['./blog-list.component.css'],
            directives: [
                index_1.ListComponent
            ]
        }), 
        __metadata('design:paramtypes', [index_1.BlogService, router_1.Router])
    ], BlogListComponent);
    return BlogListComponent;
}());
exports.BlogListComponent = BlogListComponent;

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
var index_1 = require('../shared/index');
var BlogComponent = (function () {
    function BlogComponent(route, blogService) {
        this.route = route;
        this.blogService = blogService;
    }
    BlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.route.snapshot.params['id'];
        this.blogService.find(id).subscribe(function (res) {
            _this.blog = res;
        });
        console.log('BlogComponent initialized.', this);
    };
    BlogComponent = __decorate([
        core_1.Component({
            template: '<h1>BlogCOmponent</h1>',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.BlogService])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;

"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.BlogsRoutes = [
    {
        path: '',
        redirectTo: '/blogs',
        terminal: true
    },
    {
        path: 'blogs',
        component: index_1.BlogIndexComponent,
        children: [
            { path: ':id', component: index_1.BlogComponent },
            { path: '', component: index_1.BlogListComponent, canActivate: [index_2.BlogsGuard] }
        ],
        canActivate: [index_2.AuthGuard]
    },
];

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./blog-index.component'));
__export(require('./blog-list.component'));
__export(require('./blog.component'));
__export(require('./blogs.routes'));

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
var WorkIndexComponent = (function () {
    function WorkIndexComponent() {
    }
    WorkIndexComponent = __decorate([
        core_1.Component({
            template: '<router-outlet></router-outlet>',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], WorkIndexComponent);
    return WorkIndexComponent;
}());
exports.WorkIndexComponent = WorkIndexComponent;

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
var index_1 = require('../shared/index');
var WorkListComponent = (function () {
    function WorkListComponent(workService, router) {
        this.workService = workService;
        this.router = router;
        this.listData = [];
        this.listConfig = {
            sortOptions: [
                { name: 'Updated At', value: 'updated_at' },
                { name: 'Created At', value: 'created_at' },
                { name: 'Title', value: 'title' },
                { name: 'Category', value: 'category' }
            ],
            perPageOptions: [5, 10, 15, 25, 50, 100],
            sort: {
                by: 'updated_at',
                descending: true
            },
            page: {
                currentPage: 1,
                from: 0,
                to: 0,
                total: 0,
                lastPage: 0,
                perPage: 15
            },
            emptyText: 'Looks like no work items have been created yet.'
        };
        console.log('WorkListComponent', this);
    }
    WorkListComponent.prototype.ngOnInit = function () {
        var list = this.workService.getList();
        this.parseList(list);
    };
    WorkListComponent.prototype.parseList = function (json) {
        this.listData = json.data.map(this.mapList);
        this.listConfig.page = {
            from: json.from,
            to: json.to,
            total: json.total,
            lastPage: json.last_page,
            currentPage: json.current_page,
            perPage: json.per_page
        };
    };
    WorkListComponent.prototype.fetch = function (params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var page = params.page || this.listConfig.page;
        var sort = params.sort || this.listConfig.sort;
        this.workService.all({
            current_page: page.currentPage,
            length: page.perPage,
            order_by: sort.by,
            descending: sort.descending,
        })
            .subscribe(function (json) { return _this.parseList(json); });
    };
    WorkListComponent.prototype.mapList = function (work) {
        return {
            id: work.id,
            title: work.title,
            subtitle: work.client.name,
            dates: {
                updated_at: work.updated_at,
                created_at: work.created_at
            }
        };
    };
    WorkListComponent.prototype.edit = function (work) {
        console.log('ROUTE TO:', ['/work', work.id]);
        this.router.navigate(['/work', work.id]);
    };
    WorkListComponent.prototype._delete = function (item) {
        console.log('delete this item: ', item);
    };
    WorkListComponent.prototype.add = function () {
        this.router.navigate(['/work', 'new']);
    };
    WorkListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'jpa-work-list',
            templateUrl: './work-list.component.html',
            styleUrls: ['./work-list.component.css'],
            directives: [
                index_1.ListComponent
            ]
        }), 
        __metadata('design:paramtypes', [index_1.WorkService, router_1.Router])
    ], WorkListComponent);
    return WorkListComponent;
}());
exports.WorkListComponent = WorkListComponent;

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
                }, 4000);
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

"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.WorkRoutes = [
    {
        path: '',
        redirectTo: '/work',
        terminal: true
    },
    {
        path: 'work',
        component: index_1.WorkIndexComponent,
        children: [
            { path: ':id', component: index_1.WorkComponent },
            { path: '', component: index_1.WorkListComponent, canActivate: [index_2.WorkListGuard] }
        ],
        canActivate: [index_2.AuthGuard]
    },
];

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./work-index.component'));
__export(require('./work-list.component'));
__export(require('./work.component'));
__export(require('./work.routes'));

"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./@login/index');
var index_2 = require('./@home/index');
var index_3 = require('./@blogs/index');
var index_4 = require('./@work/index');
var index_5 = require('./shared/index');
var routes = index_1.LoginRoutes.concat(index_2.HomeRoutes, index_3.BlogsRoutes, index_4.WorkRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
    index_5.AuthGuard,
    index_5.LoginGuard,
    index_5.BlogsGuard,
    index_5.BlogGuard,
    index_5.WorkListGuard
];

"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var angular2_jwt_1 = require('angular2-jwt');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var index_1 = require('./shared/index');
var appPromise = platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    http_1.HTTP_PROVIDERS,
    angular2_jwt_1.AUTH_PROVIDERS,
    app_routes_1.APP_ROUTER_PROVIDERS,
    index_1.APP_SERVICES,
    angular2_jwt_1.JwtHelper
]);



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
var ErrorComponent = (function () {
    function ErrorComponent() {
    }
    ErrorComponent.prototype.ngOnInit = function () {
        if (this.ajaxResponse !== undefined) {
            console.log('show an ajax error: ', this.ajaxResponse);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ErrorComponent.prototype, "ajaxResponse", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ErrorComponent.prototype, "message", void 0);
    ErrorComponent = __decorate([
        core_1.Component({
            selector: 'jpa-error',
            moduleId: module.id,
            templateUrl: './error.component.html',
            styleUrls: ['./error.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ErrorComponent);
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./summary-image.component'));

//# sourceMappingURL=app.js.map
