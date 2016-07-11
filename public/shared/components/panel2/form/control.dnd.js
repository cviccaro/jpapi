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
            return this.value.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControlDragnDrop.prototype.summary = function (panelExpanded) {
        var summary = panelExpanded ?
            { text: this.editText, icon: this.editIcon }
            : { text: this.value.length + ' selected', icon: false };
        return summary;
    };
    return PanelFormControlDragnDrop;
}(control_1.PanelFormControl));
exports.PanelFormControlDragnDrop = PanelFormControlDragnDrop;

//# sourceMappingURL=control.dnd.js.map
