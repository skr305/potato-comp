"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boot = function (model) {
    var Cover = false;
    if (model.Cover) {
        Cover = model.Cover;
    }
    var baseName = model.BaseName;
    var baseUser = model.BaseUser;
    var basePwd = model.BasePwd;
    return "\nexport const Cover = ".concat(Cover, ";\nexport const BaseName = \"").concat(baseName, "\";\nexport const BaseUser = \"").concat(baseUser, "\";\nexport const BasePwd = \"").concat(basePwd, "\";\n    ");
};
exports.default = boot;
