"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boot = function (port) {
    return "\nconst BASE_PORT = ".concat(port, ";\nexport default BASE_PORT;\n    ");
};
exports.default = boot;
