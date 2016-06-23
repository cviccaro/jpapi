"use strict";
var FormSubmission = (function () {
    function FormSubmission(first_name, last_name, company, email, phone, contact_time, comments) {
        if (first_name === void 0) { first_name = ''; }
        if (last_name === void 0) { last_name = ''; }
        if (company === void 0) { company = ''; }
        if (email === void 0) { email = ''; }
        if (phone === void 0) { phone = ''; }
        if (contact_time === void 0) { contact_time = ''; }
        if (comments === void 0) { comments = ''; }
    }
    return FormSubmission;
}());
exports.FormSubmission = FormSubmission;

//# sourceMappingURL=form-submission.js.map
