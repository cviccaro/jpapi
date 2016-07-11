"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var control_1 = require('./control');
var PanelFormControlFiles = (function (_super) {
    __extends(PanelFormControlFiles, _super);
    function PanelFormControlFiles(config) {
        _super.call(this, config);
        this.controlType = 'files';
        this.editIcon = 'panorama';
        this.multiple = config.multiple === undefined ? true : config.multiple;
        this.filesLabel = config.filesLabel || 'files';
        this.type = config.type || 'file';
        if (this.type === 'file' && this.editIcon === 'panorama') {
            this.editIcon = 'attachment';
        }
        console.warn('PanelFormControlFiles constructed', {
            this: this,
            config: config
        });
    }
    Object.defineProperty(PanelFormControlFiles.prototype, "empty", {
        get: function () {
            return this.value.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    PanelFormControlFiles.prototype.summary = function (panelExpanded) {
        var val = this.value;
        if (this.multiple) {
            var arr = val === '' ? [] : this.value;
            var map = arr.reduce(function (carry, item) {
                if (item['id'] !== undefined) {
                    carry.current++;
                }
                else {
                    carry.queue++;
                }
                return carry;
            }, { queue: 0, current: 0 });
            var text = map.current + " " + this.filesLabel + " | " + map.queue + " in queue";
            return { text: text, icon: this.editIcon };
        }
        else {
            if (val) {
                var text = '';
                if (this.type === 'image') {
                    text = val.filename + " | " + Math.round(val.size / 10) / 100 + "kb | " + val.width + " x " + val.height + " px";
                }
                else {
                    text = val.filename + " | " + Math.round(val.size / 10) / 100 + "kb";
                }
                return { text: text, icon: this.editIcon };
            }
            else {
                return { text: this.editText, icon: this.editIcon };
            }
        }
    };
    return PanelFormControlFiles;
}(control_1.PanelFormControl));
exports.PanelFormControlFiles = PanelFormControlFiles;

//# sourceMappingURL=control.files.js.map
