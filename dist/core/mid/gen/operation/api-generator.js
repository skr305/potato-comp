"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boot = function (root) {
    var result = "";
    ["Auth", "Unauth"].map(function (fp) {
        if (!root.Api[fp]) {
            return;
        }
        Object.keys(root.Api[fp]).map(function (cp) {
            var p = root.Api[fp][cp].Params;
            var r = root.Api[fp][cp].Response;
            if (p) {
                result += "\nexport type ".concat(cp, "Params = ").concat(p, ";                ");
            }
            if (r) {
                result += "\nexport type ".concat(cp, "Response = ").concat(r, ";                ");
            }
        });
    });
    return result;
};
exports.default = boot;
