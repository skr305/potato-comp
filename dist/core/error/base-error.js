"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseError = (function () {
    function BaseError(errorCode, message) {
        if (message === void 0) { message = ""; }
        this.message = "";
        console.error("app-error emit:", "code:".concat(errorCode), "message: ".concat(message));
        this.errorCode = errorCode;
        this.message = message;
    }
    ;
    return BaseError;
}());
;
exports.default = BaseError;
