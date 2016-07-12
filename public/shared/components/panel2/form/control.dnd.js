"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var control_1 = require('./control');
var PanelFormControlDragnDrop = (function (_super) {
    __extends(PanelFormControlDragnDrop, _super);
    function PanelFormControlDragnDrop(config) {
        _super.call(this, config);
        this.controlType = 'dnd';
        this.options = config.options || [];
    }
    Object.defineProperty(PanelFormControlDragnDrop.prototype, "empty", {
        get: function () {
            if (typeof this.value === 'undefined')
                return true;
            return this.value.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControlDragnDrop.prototype.summary = function (panelExpanded) {
        if (panelExpanded) {
            return { text: this.editableText, icon: this.editIcon };
        }
        if (this.value.length > 5) {
            return { text: this.value.length + ' selected', icon: false };
        }
        else {
            var val = this.value.slice(0);
            var text = val.shift().name;
            if (val.length) {
                text = val.reduce(function (carry, item) { return carry += ', ' + item.name; }, text);
            }
            return { text: text, icon: false };
        }
    };
    return PanelFormControlDragnDrop;
}(control_1.PanelFormControl));
exports.PanelFormControlDragnDrop = PanelFormControlDragnDrop;

//# sourceMappingURL=control.dnd.js.map
