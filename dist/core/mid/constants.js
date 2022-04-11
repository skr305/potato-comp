"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_TYPES_MAPS = exports.MODEL_OUTPOSE_MAPS = exports.LONG_INT_OUTPOSE = exports.INT_OUTPOSE = exports.STRING_OUTPOSE = exports.LONG_STRING_OUTPOSE = exports.MODEL_INT_NAME = exports.MODEL_LONG_INT_NAME = exports.MODEL_STRING_NAME = exports.MODEL_LONG_STRING_NAME = exports.OPERATION_BASEURL_KEY = exports.MODEL_DATABASE_COVER = exports.MODEL_DATABASE_KEY = exports.ERROR_CODE_MEAN_OUTPOSE = exports.OPERATION_OUTPOSE = exports.MODEL_OUTPOSE = void 0;
exports.MODEL_OUTPOSE = "Model";
exports.OPERATION_OUTPOSE = "Operation";
exports.ERROR_CODE_MEAN_OUTPOSE = "ErrorCodeMean";
exports.MODEL_DATABASE_KEY = "$Database";
exports.MODEL_DATABASE_COVER = "$Cover";
exports.OPERATION_BASEURL_KEY = "$BaseURL";
exports.MODEL_LONG_STRING_NAME = "longstring";
exports.MODEL_STRING_NAME = "string";
exports.MODEL_LONG_INT_NAME = "longint";
exports.MODEL_INT_NAME = "int";
exports.LONG_STRING_OUTPOSE = {
    dbType: "text",
    outposeName: exports.MODEL_LONG_STRING_NAME
};
var STRING_VARCAHR_LENGTH = 300;
exports.STRING_OUTPOSE = {
    dbType: "varchar(".concat(STRING_VARCAHR_LENGTH, ")"),
    outposeName: exports.MODEL_STRING_NAME
};
var INT_OUTPOSE_LENGTH = 20;
exports.INT_OUTPOSE = {
    dbType: "int(".concat(INT_OUTPOSE_LENGTH, ")"),
    outposeName: exports.MODEL_INT_NAME
};
var LONG_INT_OUTPOSE_LENGTH = 40;
exports.LONG_INT_OUTPOSE = {
    dbType: "int(".concat(LONG_INT_OUTPOSE_LENGTH, ")"),
    outposeName: exports.MODEL_LONG_INT_NAME
};
exports.MODEL_OUTPOSE_MAPS = (_a = {},
    _a[exports.MODEL_INT_NAME] = exports.INT_OUTPOSE,
    _a[exports.MODEL_STRING_NAME] = exports.STRING_OUTPOSE,
    _a[exports.MODEL_LONG_INT_NAME] = exports.LONG_INT_OUTPOSE,
    _a[exports.MODEL_LONG_STRING_NAME] = exports.LONG_STRING_OUTPOSE,
    _a);
exports.MODEL_TYPES_MAPS = (_b = {},
    _b[exports.MODEL_INT_NAME] = "number",
    _b[exports.MODEL_STRING_NAME] = "string",
    _b[exports.MODEL_LONG_INT_NAME] = "number",
    _b[exports.MODEL_LONG_STRING_NAME] = "string",
    _b);
