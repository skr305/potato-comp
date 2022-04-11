"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var drawOutposeSentence = function (key, outposeType, isLast, notNull) {
    if (isLast === void 0) { isLast = false; }
    if (notNull === void 0) { notNull = true; }
    return " \n    ".concat(key, " ").concat(constants_1.MODEL_OUTPOSE_MAPS[outposeType].dbType, " ").concat(notNull ? "not null" : "", " ").concat(isLast ? "" : ",", "\n     ");
};
var drawPrimayKeySentence = function (primarys, needComma) {
    if (needComma === void 0) { needComma = false; }
    var NESTED = "";
    primarys.forEach(function (key, idx) {
        NESTED += idx === primarys.length - 1 ? "".concat(key, " ") : " ".concat(key, ", ");
    });
    return "\n    primary key ( ".concat(NESTED, " ) ").concat(needComma ? "," : "", "\n    ");
};
var modelGenerator = function (config) {
    var BASE_NAME = config[constants_1.MODEL_DATABASE_KEY];
    var GENED = "\n".concat((config === null || config === void 0 ? void 0 : config.$Cover) ? "drop database if exists `".concat(BASE_NAME, "`;") : "", "\ncreate database `").concat(BASE_NAME, "`;\nuse `").concat(BASE_NAME, "`;\n    ");
    var tables = config.tables;
    if (!tables) {
        return GENED;
    }
    Object.keys(tables).map(function (tn) {
        var NESTED = "";
        if (tn != constants_1.MODEL_DATABASE_KEY) {
            var meta_1 = tables[tn];
            var primaryID_1 = [];
            var sections_1 = Object.keys(meta_1);
            sections_1.map(function (secKey, idx) {
                var secInfo = meta_1[secKey];
                if (secInfo.isID !== undefined) {
                    if (secInfo.isID) {
                        primaryID_1.push(secKey);
                    }
                    var isLast = idx === sections_1.length - 1 && !primaryID_1.length;
                    NESTED += drawOutposeSentence(secKey, secInfo.type, isLast);
                }
                else {
                    var isLast = idx === sections_1.length - 1 && !primaryID_1.length;
                    NESTED += drawOutposeSentence(secKey, meta_1[secKey], isLast);
                }
            });
            NESTED += drawPrimayKeySentence(primaryID_1);
        }
        GENED += "\ncreate table `".concat(tn, "` (\n    ").concat(NESTED, "\n);\n        ");
    });
    return GENED;
};
exports.default = modelGenerator;
