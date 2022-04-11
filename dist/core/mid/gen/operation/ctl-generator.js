"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_error_1 = __importDefault(require("../../../error/base-error"));
var error_code_1 = require("../../../error/error-code");
var util_1 = require("./util");
var compileSingleProgram = function (spr) {
    var afterVarReplace = (0, util_1.PreHandlingStringWithVarName)(spr);
    if (afterVarReplace[0] !== "#") {
        return afterVarReplace;
    }
    var token = (0, util_1.compileSentenceToToken)(afterVarReplace.slice(1));
    var coreHandling = "";
    if (token.isMethod) {
        if (token.methodMeta) {
            var meta = token.methodMeta;
            var methodBody = util_1.MethodGenerator[meta.methodName];
            try {
                coreHandling = methodBody(meta.params);
            }
            catch (error) {
                throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.COMPILE_ERROR, "compiling ".concat(meta.methodName, " , method name no exist or method compiling error"));
            }
        }
        else {
            throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.COMPILE_ERROR, "compiling method, method meta losing");
        }
    }
    else {
        if (token.operationMeta) {
            var meta = token.operationMeta;
            var operationBody = util_1.OperationGenerator[meta.operaionName];
            try {
                coreHandling = operationBody(meta.base, meta.params);
            }
            catch (error) {
                throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.COMPILE_ERROR, "compiling operation ".concat(meta.base, ": ").concat(meta.operaionName, " , oper name no exist or oper compiling error"));
            }
        }
        else {
            throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.COMPILE_ERROR, "compiling operation, operation meta losing");
        }
    }
    if (token.varName !== null) {
        return "let ".concat(token.varName, " = ").concat(coreHandling);
    }
    return coreHandling;
};
var compileProgram = function (prs) {
    var result = "";
    prs.map(function (pr) {
        result += "".concat(compileSingleProgram(pr), "\n");
    });
    return result;
};
var boot = function (root, entityList) {
    var result = {
        "Auth": "",
        "Unauth": ""
    };
    ["Auth", "Unauth"].map(function (fp) {
        var currentBindRouter = root.Api[fp] || {};
        var nested = "";
        Object.keys(currentBindRouter).map(function (cp) {
            var pr = currentBindRouter[cp].Program;
            nested += "\npublic static async ".concat(cp, " ( ctx: AppContext, next: Next ) {\n    ").concat(pr ? compileProgram(pr) : "", "\n    await next();\n};\n            ");
        });
        result[fp] = "\n".concat(entityList.map(function (en) {
            return "\nimport ".concat(en, " from './entity/").concat(en, ".entity'; ");
        }).join(""), "\nimport dataSource from './data-source';\nimport AppContext from './app-context';\nimport { Next } from 'koa';\nimport GenID from './gen-id';\nexport default class ").concat(fp, "Controller {\n    ").concat(nested, "\n};\n        ");
    });
    return result;
};
exports.default = boot;
