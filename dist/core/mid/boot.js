"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootGen = exports.DEFAULT_DIST_PATH = exports.DIS_DIR_NAME = exports.MidGeneratorStatus = void 0;
var base_error_1 = __importDefault(require("../error/base-error"));
var json_reader_1 = __importDefault(require("../../util/json-reader"));
var model_generator_1 = __importDefault(require("./gen/model-generator"));
var std_write_1 = require("../../util/std-write");
var error_code_generator_1 = __importDefault(require("./gen/error-code-generator"));
var generate_entity_to_dir_1 = __importDefault(require("./gen/wrp/generate-entity-to-dir"));
var data_source_option_generator_1 = __importDefault(require("./gen/data-source-option-generator"));
var ctl_generator_1 = __importDefault(require("./gen/operation/ctl-generator"));
var base_port_generator_1 = __importDefault(require("./gen/operation/base-port-generator"));
var api_generator_1 = __importDefault(require("./gen/operation/api-generator"));
var router_generator_1 = __importDefault(require("./gen/operation/router-generator"));
var get_entity_list_1 = __importDefault(require("./gen/get-entity-list"));
var env_1 = __importDefault(require("../../env"));
var MidGeneratorStatus;
(function (MidGeneratorStatus) {
    MidGeneratorStatus[MidGeneratorStatus["SUC"] = 0] = "SUC";
    MidGeneratorStatus[MidGeneratorStatus["BAD_PATH"] = 1] = "BAD_PATH";
    MidGeneratorStatus[MidGeneratorStatus["UNKNOWN_ERROR"] = 99] = "UNKNOWN_ERROR";
    MidGeneratorStatus[MidGeneratorStatus["APP_ERROR"] = 100] = "APP_ERROR";
})(MidGeneratorStatus = exports.MidGeneratorStatus || (exports.MidGeneratorStatus = {}));
;
exports.DIS_DIR_NAME = "x_mid_dist";
exports.DEFAULT_DIST_PATH = "./".concat(exports.DIS_DIR_NAME);
var DEFAULT_MIDG_OPTIONS = {
    output: exports.DEFAULT_DIST_PATH
};
var BootGen = function (path, options) {
    if (options === void 0) { options = DEFAULT_MIDG_OPTIONS; }
    return __awaiter(void 0, void 0, void 0, function () {
        var configBody, operationBody, OUT_DIR, APP_NAME, MODEL_SQL_OUTPATH, ERROR_CODE_OUTPATH, ENTITY_OUTPUT_DIR, DB_OPTION_OUTPUT_PATH, AUTH_CTL_OUTPATH, UNAUTH_CTL_OUTPATH, BASE_PORT_OUTPATH, API_OUTPATH, ROUTER_OUTPATH, _a, _b, _c, _d, _e, _f, ctlCode, error_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 19, , 20]);
                    return [4, (0, json_reader_1.default)(path.model)];
                case 1:
                    configBody = _g.sent();
                    return [4, (0, json_reader_1.default)(path.operation)];
                case 2:
                    operationBody = _g.sent();
                    OUT_DIR = options.output;
                    return [4, (0, std_write_1.stdMkdir)(OUT_DIR)];
                case 3:
                    _g.sent();
                    APP_NAME = configBody.AppName;
                    MODEL_SQL_OUTPATH = "".concat(OUT_DIR, "/").concat(APP_NAME, "-database.sql");
                    ERROR_CODE_OUTPATH = "".concat(OUT_DIR, "/server/error-code.ts");
                    ENTITY_OUTPUT_DIR = "".concat(OUT_DIR, "/server/entity");
                    DB_OPTION_OUTPUT_PATH = "".concat(OUT_DIR, "/server/data-source-option.ts");
                    AUTH_CTL_OUTPATH = "".concat(OUT_DIR, "/server/auth-controller.ts");
                    UNAUTH_CTL_OUTPATH = "".concat(OUT_DIR, "/server/unauth-controller.ts");
                    BASE_PORT_OUTPATH = "".concat(OUT_DIR, "/src/base-port.ts");
                    API_OUTPATH = "".concat(OUT_DIR, "/src/api.ts");
                    ROUTER_OUTPATH = "".concat(OUT_DIR, "/server/api-router/index.ts");
                    return [4, (0, std_write_1.stdMkdir)(ENTITY_OUTPUT_DIR)];
                case 4:
                    _g.sent();
                    if (!configBody.Model) return [3, 8];
                    _a = std_write_1.stdWriteFileCover;
                    _b = [MODEL_SQL_OUTPATH];
                    return [4, (0, model_generator_1.default)(configBody.Model)];
                case 5: return [4, _a.apply(void 0, _b.concat([_g.sent()]))];
                case 6:
                    _g.sent();
                    return [4, (0, generate_entity_to_dir_1.default)(configBody.Model, ENTITY_OUTPUT_DIR)];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8:
                    if (!configBody.ErrorCode) return [3, 11];
                    _c = std_write_1.stdWriteFileCover;
                    _d = [ERROR_CODE_OUTPATH];
                    return [4, (0, error_code_generator_1.default)(configBody.ErrorCode)];
                case 9: return [4, _c.apply(void 0, _d.concat([_g.sent()]))];
                case 10:
                    _g.sent();
                    _g.label = 11;
                case 11:
                    _e = std_write_1.stdWriteFileCover;
                    _f = [DB_OPTION_OUTPUT_PATH];
                    return [4, (0, data_source_option_generator_1.default)(configBody)];
                case 12: return [4, _e.apply(void 0, _f.concat([_g.sent()]))];
                case 13:
                    _g.sent();
                    ctlCode = (0, ctl_generator_1.default)(operationBody, (0, get_entity_list_1.default)(configBody));
                    return [4, (0, std_write_1.stdWriteFileCover)(AUTH_CTL_OUTPATH, ctlCode.Auth)];
                case 14:
                    _g.sent();
                    return [4, (0, std_write_1.stdWriteFileCover)(UNAUTH_CTL_OUTPATH, ctlCode.Unauth)];
                case 15:
                    _g.sent();
                    ;
                    return [4, (0, std_write_1.stdWriteFileCover)(BASE_PORT_OUTPATH, (0, base_port_generator_1.default)(operationBody.DevPort))];
                case 16:
                    _g.sent();
                    return [4, (0, std_write_1.stdWriteFileCover)(ROUTER_OUTPATH, (0, router_generator_1.default)(operationBody))];
                case 17:
                    _g.sent();
                    return [4, (0, std_write_1.stdWriteFileCover)(API_OUTPATH, (0, api_generator_1.default)(operationBody))];
                case 18:
                    _g.sent();
                    return [3, 20];
                case 19:
                    error_1 = _g.sent();
                    if (env_1.default === "DEV") {
                        throw error_1;
                    }
                    if (error_1 instanceof base_error_1.default) {
                        return [2, MidGeneratorStatus.APP_ERROR];
                    }
                    console.error(error_1);
                    return [2, MidGeneratorStatus.UNKNOWN_ERROR];
                case 20: return [2, MidGeneratorStatus.SUC];
            }
        });
    });
};
exports.BootGen = BootGen;
exports.default = exports.BootGen;
