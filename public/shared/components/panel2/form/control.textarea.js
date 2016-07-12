"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var control_1 = require('./control');
var PanelFormControlTextarea = (function (_super) {
    __extends(PanelFormControlTextarea, _super);
    function PanelFormControlTextarea(config) {
        _super.call(this, config);
        this.controlType = 'textarea';
        this.ckeditor = config.ckeditor || false;
        this.ckeditorConfig = config.ckeditorConfig || {};
    }
    Object.defineProperty(PanelFormControlTextarea.prototype, "empty", {
        get: function () {
            if (typeof this.value === 'undefined')
                return true;
            return this.value === '';
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControlTextarea.prototype.summary = function (panelExpanded) {
        if (panelExpanded || this.empty) {
            return { text: this.editableText, icon: this.editIcon };
        }
        else {
            return { text: this.value.length + ' characters', icon: false };
        }
    };
    return PanelFormControlTextarea;
}(control_1.PanelFormControl));
exports.PanelFormControlTextarea = PanelFormControlTextarea;

//# sourceMappingURL=control.textarea.js.map
