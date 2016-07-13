"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var logger_service_1 = require('../../services/logger.service');
var GenericFormField = (function () {
    function GenericFormField() {
        this.type = 'text';
        this.required = false;
        this.hidden = false;
    }
    return GenericFormField;
}());
exports.GenericFormField = GenericFormField;
var ModalFormField = (function (_super) {
    __extends(ModalFormField, _super);
    function ModalFormField(column) {
        _super.call(this);
        this.log = new logger_service_1.LoggerService();
        if (!column.label) {
            column.label = column.name.substr(0, 1).toUpperCase() + column.name.substr(1, column.name.length - 1);
            column.placeholder = column.label;
        }
        Object.assign(this, column);
    }
    ModalFormField.prototype.evaluateConditions = function (inputs) {
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
                    _this.log.warn("No target field \"" + condition.target + "\" was found while checking condition for source field " + _this.name);
                }
            });
        }
    };
    return ModalFormField;
}(GenericFormField));
exports.ModalFormField = ModalFormField;

//# sourceMappingURL=modal.interface.js.map
