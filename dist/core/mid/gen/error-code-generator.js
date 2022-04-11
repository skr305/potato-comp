"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawErrorMapToEnum = function (errorMap, appName) {
    if (appName === void 0) { appName = "App"; }
    var nested = "";
    Object.keys(errorMap).map(function (errorMean, idx, arr) {
        nested += "".concat(errorMean, " = ").concat(errorMap[errorMean]);
        if (idx !== arr.length - 1) {
            nested += ",\n";
        }
        else {
            nested += "\n";
        }
    });
    return "\nexport enum ServerErrorCode {\n    ".concat(nested, "\n};\n    ");
};
var drawErrorCodeMap = function (errorMap, appName) {
    if (appName === void 0) { appName = "App"; }
    return "\nexport const ServerErroCodeMap = ".concat(JSON.stringify(errorMap), ";\n\n    ");
};
var boot = function (errorMap, appName) {
    if (appName === void 0) { appName = "App"; }
    var DEFAULT_UNKNOWN_ERROR_TAG = "Unknown";
    if (DEFAULT_UNKNOWN_ERROR_TAG in errorMap) {
        errorMap[DEFAULT_UNKNOWN_ERROR_TAG] = 999;
    }
    var result = "\n".concat(drawErrorMapToEnum(errorMap, appName), "\n").concat(drawErrorCodeMap(errorMap, appName), "    \n    ");
    return result;
};
exports.default = boot;
