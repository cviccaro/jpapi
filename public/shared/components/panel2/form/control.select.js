"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var control_1 = require('./control');
var PanelFormControlSelect = (function (_super) {
    __extends(PanelFormControlSelect, _super);
    function PanelFormControlSelect(config) {
        _super.call(this, config);
        this.controlType = 'select';
        this.focused = false;
        this.options = config.options || [];
    }
    Object.defineProperty(PanelFormControlSelect.prototype, "empty", {
        get: function () {
            return (typeof this.value === "number") ? (this.value === undefined || this.value === null) : this.value['length'] === 0;
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControlSelect.prototype.summary = function (panelExpanded) {
        var _this = this;
        if (panelExpanded || this.empty) {
            return { text: this.editableText, icon: this.editIcon };
        }
        else {
            return { text: this.options.find(function (option) { return option.value == _this.value; }).label, icon: false };
        }
    };
    return PanelFormControlSelect;
}(control_1.PanelFormControl));
exports.PanelFormControlSelect = PanelFormControlSelect;

//# sourceMappingURL=control.select.js.map
