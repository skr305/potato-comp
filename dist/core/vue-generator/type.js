"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.VNode = exports.jsonModel = void 0;
var jsonModel = (function () {
    function jsonModel(config, VNode) {
        this.config = config;
        this.VNode = VNode;
    }
    return jsonModel;
}());
exports.jsonModel = jsonModel;
var VNode = (function () {
    function VNode() {
    }
    return VNode;
}());
exports.VNode = VNode;
var Config = (function () {
    function Config(username, date, operate) {
        this.username = username;
        this.date = date;
        this.operate = operate;
    }
    return Config;
}());
exports.Config = Config;
