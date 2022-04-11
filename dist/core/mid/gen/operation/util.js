"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSentenceToToken = exports.PreHandlingStringWithVarName = exports.VarnameReg = exports.SpecificVarname = exports.MethodGenerator = exports.OperationGenerator = exports.OperationReturnValue = void 0;
var base_error_1 = __importDefault(require("../../../error/base-error"));
var error_code_1 = require("../../../error/error-code");
var splitPairSafely = function (stringfiedPair) {
    var pairs = stringfiedPair.split("=").map(function (v) { return v.trim(); });
    if (pairs.length !== 2) {
        throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.COMPILE_ERROR, " compiling error: pair wrong, should be <p_name> = <val> ");
    }
    return pairs;
};
var splitAndTrim = function (s, sign) { return s.split(sign).map(function (v) { return v.trim(); }); };
;
exports.OperationReturnValue = {
    "Find": function (compiled) { return compiled; },
    "FindOne": function (compiled) { return compiled; },
    "Insert": "true",
    "Delete": "true"
};
exports.OperationGenerator = {
    "Find": function (base, params) {
        var whereNested = "";
        var orderNested = "";
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var pair = params_1[_i];
            var condi = splitPairSafely(pair);
            if (condi[0][0] === "*") {
                orderNested += "".concat(condi[0].slice(1), ": ").concat(condi[1], ", ");
            }
            else {
                whereNested += "".concat(condi[0], ": ").concat(condi[1], ", ");
            }
        }
        return "await dataSource.manager.find( ".concat(base, ", { where: { ").concat(whereNested, " }, order: { ").concat(orderNested, " }  } );");
    },
    "FindOne": function (base, params) {
        var whereNested = "";
        for (var _i = 0, params_2 = params; _i < params_2.length; _i++) {
            var pair = params_2[_i];
            var condi = splitPairSafely(pair);
            whereNested += "".concat(condi[0], ": ").concat(condi[1], ", ");
        }
        return "await dataSource.manager.findOne( ".concat(base, ", { where: { ").concat(whereNested, " } } );");
    },
    "Insert": function (base, params) {
        var TEMP_VAR_NAME = "__inserting";
        var columnSequence = "const ".concat(TEMP_VAR_NAME, " = new ").concat(base, " ();\n");
        for (var _i = 0, params_3 = params; _i < params_3.length; _i++) {
            var pair = params_3[_i];
            var given = splitPairSafely(pair);
            columnSequence += "".concat(TEMP_VAR_NAME, ".").concat(given[0], " = ").concat(given[1], ";\n");
        }
        columnSequence += "await dataSource.manager.insert( ".concat(base, ", ").concat(TEMP_VAR_NAME, " );\n");
        return " { \n ".concat(columnSequence, " \n } \n ");
    },
    "Delete": function (base, params) {
        var whereExposed = "";
        params.every(function (pair, idx) {
            var given = splitPairSafely(pair);
            var whereMethodName = idx === 0 ? "where" : "andWhere";
            whereExposed += "\n.".concat(whereMethodName, "(\"").concat(given[0], "=:").concat(given[0], "\", {").concat(given[0], ": ").concat(given[1], "})");
        });
        return "\n        await dataSource\n        .createQueryBuilder()\n        .delete()\n        .from(".concat(base, ")\n        ").concat(whereExposed, "\n        .execute();\n        ");
    }
};
exports.MethodGenerator = {
    "GenID": function (params) {
        var pre = params[0] || "";
        return " GenID( ".concat(pre, " );");
    },
    "Map": function (params) {
        var arrName = params[0];
        var fmtAttr = params.slice(1).join(", ");
        return " ".concat(arrName, ".map( val => { const { ").concat(fmtAttr, " } = val; return { ").concat(fmtAttr, " }; } ); ");
    }
};
exports.SpecificVarname = {
    "$Return": "ctx.body",
    "$Params": "ctx.json",
    "$Param": "ctx.json",
    "$UserID": "ctx.userID"
};
exports.VarnameReg = /(\$\w+)/g;
var PreHandlingStringWithVarName = function (sentence) {
    return sentence.trim().replace(exports.VarnameReg, function (v) {
        if (v in exports.SpecificVarname) {
            return exports.SpecificVarname[v];
        }
        return v.slice(1);
    });
};
exports.PreHandlingStringWithVarName = PreHandlingStringWithVarName;
var compileSentenceToToken = function (sentence) {
    var result = {
        varName: null,
        isMethod: false
    };
    var handleMethodOrOperation = function (s) {
        try {
            var params = splitAndTrim(s, "|");
            if (params[0][0] === "^") {
                result.isMethod = true;
                result.methodMeta = {
                    methodName: params[0].slice(1),
                    params: params.slice(1),
                };
            }
            else if (params[0][0] === "&") {
                var _a = splitAndTrim(params[0], "."), rawBaseName = _a[0], operationName = _a[1];
                result.isMethod = false;
                result.operationMeta = {
                    operaionName: operationName,
                    params: params.slice(1),
                    base: rawBaseName.slice(1)
                };
            }
            else {
                throw Error();
            }
            ;
        }
        catch (error) {
            throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.COMPILE_ERROR, "method and operation sentence error: should start with ^/& \n or check out the variable given: should use => " + JSON.stringify(error) + " \n error sentence: " + s);
        }
    };
    var afterGive = splitAndTrim(sentence, "=>");
    if (afterGive.length === 1) {
        result.varName = null;
        handleMethodOrOperation(afterGive[0]);
    }
    else if (afterGive.length === 2) {
        result.varName = afterGive[0];
        handleMethodOrOperation(afterGive[1]);
    }
    else {
        throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.COMPILE_ERROR, "invalid s: ".concat(sentence));
    }
    return result;
};
exports.compileSentenceToToken = compileSentenceToToken;
