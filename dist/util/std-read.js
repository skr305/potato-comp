"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdReadDir = exports.stdReadFile = void 0;
var fs_1 = __importDefault(require("fs"));
var stdReadFile = function (pathname, raw) {
    if (raw === void 0) { raw = false; }
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(pathname, function (err, data) {
            if (err) {
                return reject(err);
            }
            var transout = raw ? data : data.toString('utf8');
            resolve(transout);
        });
    });
};
exports.stdReadFile = stdReadFile;
var stdReadDir = function (pathname) { return new Promise(function (resolve, reject) {
    fs_1.default.readdir(pathname, function (err, data) {
        if (err) {
            return reject(err);
        }
        var transout = data;
        resolve(transout);
    });
}); };
exports.stdReadDir = stdReadDir;
