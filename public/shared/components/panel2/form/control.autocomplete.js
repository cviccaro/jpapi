"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var control_1 = require('./control');
var PanelFormControlAutoComplete = (function (_super) {
    __extends(PanelFormControlAutoComplete, _super);
    function PanelFormControlAutoComplete(config) {
        _super.call(this, config);
        this.controlType = 'autocomplete';
        this.options = config.options || [];
    }
    Object.defineProperty(PanelFormControlAutoComplete.prototype, "empty", {
        get: function () {
            if (typeof this.value === 'undefined')
                return true;
            return this.value.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControlAutoComplete.prototype.summary = function (panelExpanded) {
        return { text: 'omg!', icon: this.editIcon };
    };
    return PanelFormControlAutoComplete;
}(control_1.PanelFormControl));
exports.PanelFormControlAutoComplete = PanelFormControlAutoComplete;

//# sourceMappingURL=control.autocomplete.js.map
