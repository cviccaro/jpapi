"use strict";
var PanelFormControl = (function () {
    function PanelFormControl(config) {
        this.required = false;
        if (!config.label) {
            config.label = config.name.substr(0, 1).toUpperCase() + config.name.substr(1, config.name.length - 1);
            config.placeholder = config.label;
        }
        config.editText = config.editText || 'Edit ' + config.label;
        config.emptyText = config.emptyText || 'Add ' + config.label;
        if (config.editIcon !== false) {
            config.editIcon = config.editIcon || 'help_outline';
        }
        Object.assign(this, config);
    }
    Object.defineProperty(PanelFormControl.prototype, "empty", {
        get: function () {
            return this.value === undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelFormControl.prototype, "editableText", {
        get: function () {
            if (this.empty)
                return this.emptyText;
            return this.editText;
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControl.prototype.summary = function (panelExpanded) {
        if (panelExpanded || this.empty)
            return { text: this.editableText, icon: this.editIcon };
        return { text: this.value, icon: false };
    };
    PanelFormControl.prototype.evaluateConditions = function (inputs) {
        var _this = this;
        if (this.conditions) {
            this.conditions.forEach(function (condition) {
                var target = false;
                inputs.forEach(function (input) {
                    if (input.name === condition.target)
                        target = input;
                });
                if (target) {
                    var result = condition.condition.apply(_this, [_this, target]);
                    switch (condition.action) {
                        case 'hidden':
                            _this.hidden = result;
                            break;
                        case 'required':
                            _this.required = result;
                            break;
                    }
                }
                else {
                    console.warn("No target field \"" + condition.target + "\" was found while checking condition for source field " + _this.name);
                }
            });
        }
    };
    return PanelFormControl;
}());
exports.PanelFormControl = PanelFormControl;

//# sourceMappingURL=control.js.map
