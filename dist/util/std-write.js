"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdRmRf = exports.stdMkdir = exports.stdWriteFilePush = exports.stdWriteFileCover = exports.stdWriteFile = void 0;
var fs_1 = __importDefault(require("fs"));
var stdWriteFile = function (path, content, options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(path, content, options, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(true);
        });
    });
};
exports.stdWriteFile = stdWriteFile;
var stdWriteFileCover = function (path, content) { return (0, exports.stdWriteFile)(path, content, { "flag": "w+" }); };
exports.stdWriteFileCover = stdWriteFileCover;
var stdWriteFilePush = function (path, content) { return (0, exports.stdWriteFile)(path, content, { "flag": "a+" }); };
exports.stdWriteFilePush = stdWriteFilePush;
var stdMkdir = function (path, options) {
    if (options === void 0) { options = { "recursive": true }; }
    return fs_1.default.promises.mkdir(path, options);
};
exports.stdMkdir = stdMkdir;
var stdRmRf = function (path, options) {
    if (options === void 0) { options = {}; }
    return fs_1.default.promises.rm(path, __assign({ recursive: true, force: true }, options));
};
exports.stdRmRf = stdRmRf;
