"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var control_1 = require('./control');
var PanelFormControlTextfield = (function (_super) {
    __extends(PanelFormControlTextfield, _super);
    function PanelFormControlTextfield(config) {
        _super.call(this, config);
        this.controlType = 'text';
        this.type = config.type || '';
    }
    Object.defineProperty(PanelFormControlTextfield.prototype, "empty", {
        get: function () {
            return this.value === '';
        },
        enumerable: true,
        configurable: true
    });
    return PanelFormControlTextfield;
}(control_1.PanelFormControl));
exports.PanelFormControlTextfield = PanelFormControlTextfield;

//# sourceMappingURL=control.text.js.map
