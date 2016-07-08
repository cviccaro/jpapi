"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericFormColumn = (function () {
    function GenericFormColumn() {
        this.type = 'text';
        this.required = false;
    }
    return GenericFormColumn;
}());
exports.GenericFormColumn = GenericFormColumn;
var ModalFormColumn = (function (_super) {
    __extends(ModalFormColumn, _super);
    function ModalFormColumn(column) {
        _super.call(this);
        if (!column.label) {
            column.label = column.name.substr(0, 1).toUpperCase() + column.name.substr(1, column.name.length - 1);
            column.placeholder = column.label;
        }
        Object.assign(this, column);
    }
    return ModalFormColumn;
}(GenericFormColumn));
exports.ModalFormColumn = ModalFormColumn;

//# sourceMappingURL=modal.interface.js.map
