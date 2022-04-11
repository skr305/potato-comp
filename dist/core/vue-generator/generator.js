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
exports.OUT_PATH = exports.Status = void 0;
var base_error_1 = __importDefault(require("../error/base-error"));
var std_write_1 = require("../../util/std-write");
var json_reader_1 = __importDefault(require("../../util/json-reader"));
var parse_1 = require("./parse");
var Status;
(function (Status) {
    Status[Status["CONTINUE"] = 0] = "CONTINUE";
    Status[Status["SUCCESS"] = 1] = "SUCCESS";
    Status[Status["UNKNOWN_ERROR"] = 99] = "UNKNOWN_ERROR";
    Status[Status["APP_ERROR"] = 100] = "APP_ERROR";
})(Status = exports.Status || (exports.Status = {}));
exports.OUT_PATH = "./x_mid_dist/vue_source";
function vueGen(path) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData, _a, username, date, operate, VUE_FILE_PATH, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4, (0, json_reader_1.default)(path)];
                case 1:
                    jsonData = _b.sent();
                    _a = jsonData.config, username = _a.username, date = _a.date, operate = _a.operate;
                    return [4, (0, std_write_1.stdMkdir)(exports.OUT_PATH)];
                case 2:
                    _b.sent();
                    VUE_FILE_PATH = "".concat(exports.OUT_PATH, "/").concat(username, "-").concat(date.toString(), "-").concat(operate, ".vue");
                    if (!jsonData.VNode) return [3, 4];
                    return [4, (0, std_write_1.stdWriteFileCover)(VUE_FILE_PATH, (0, parse_1.parseTemplate)(jsonData.VNode))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3, 6];
                case 5:
                    error_1 = _b.sent();
                    console.error(error_1);
                    if (error_1 instanceof base_error_1.default) {
                        return [2, Status.APP_ERROR];
                    }
                    return [2, Status.UNKNOWN_ERROR];
                case 6: return [2, Status.SUCCESS];
            }
        });
    });
}
exports.default = vueGen;
