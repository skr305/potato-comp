"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTemplate = void 0;
var base_error_1 = __importDefault(require("../error/base-error"));
var error_code_1 = require("../error/error-code");
var keyof_1 = require("../../util/keyof");
function parseTemplate(vnode) {
    var template = "".concat(parseElement(vnode), "\n\n<script>\nexport default {}\n</script> \n\n<style>\n</style>  \n");
    return template;
}
exports.parseTemplate = parseTemplate;
function parseElement(vnode) {
    if (vnode.type === 'text') {
        if (vnode.value)
            return vnode.value;
        else
            throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.EMPTY_ERROR, 'textNode can not be empty');
    }
    else if (vnode.type === 'comment')
        if (vnode.value)
            return "<!-- ".concat(vnode.value, " -->");
        else
            throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.EMPTY_ERROR, 'cmomentNode can not be empty');
    else {
        if (!vnode.children) {
            var attrs = parseAttrs(vnode);
            return "<".concat(vnode.tagName, " ").concat(attrs, "></").concat(vnode.tagName, ">");
        }
        else {
            var childrenContents = [];
            for (var _i = 0, _a = vnode.children; _i < _a.length; _i++) {
                var childNode = _a[_i];
                var childContent = parseElement(childNode);
                childrenContents.push(childContent);
            }
            var attrs = parseAttrs(vnode);
            var res = "<".concat(vnode.tagName, " ").concat(attrs, ">\n").concat(childrenContents.join('\n'), "\n</").concat(vnode.tagName, ">");
            return res;
        }
    }
}
function parseAttrs(vnode) {
    var attrs = '';
    if (vnode.style)
        attrs += parseStyle(vnode.style) + ' ';
    if (vnode.v_bind)
        attrs += parseBind(vnode.v_bind) + ' ';
    if (vnode.v_on)
        attrs += parseOn(vnode.v_on) + ' ';
    if (vnode.v_if)
        attrs += parseIf(vnode.v_if) + ' ';
    if (vnode.v_show)
        attrs += parseShow(vnode.v_show) + ' ';
    if (vnode.v_for)
        attrs += parseFor(vnode.v_for) + ' ';
    return attrs;
}
function parseStyle(styleObj) {
    if (Object.keys(styleObj).length === 0) {
        return '';
    }
    else {
        var styleItems = '';
        for (var key in styleObj) {
            if ((0, keyof_1.isValidKey)(key, styleObj)) {
                styleItems += "".concat(key, ": ").concat(styleObj[key], ";");
            }
        }
        return "style=\"".concat(styleItems, "\"");
    }
}
function parseBind(pairs) {
    if (pairs.length === 0)
        return '';
    else {
        var bindStr = '';
        for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
            var pair = pairs_1[_i];
            bindStr += ":".concat(pair.key, "=\"").concat(pair.value, "\" ");
        }
        return bindStr;
    }
}
function parseOn(pairs) {
    if (pairs.length === 0)
        return '';
    else {
        var onStr = '';
        for (var _i = 0, pairs_2 = pairs; _i < pairs_2.length; _i++) {
            var pair = pairs_2[_i];
            onStr += "@".concat(pair.key, "=\"").concat(pair.value, "\" ");
        }
        return onStr;
    }
}
function parseIf(variable) {
    if (variable === '')
        return '';
    else
        return "v-if=\"".concat(variable, "\"");
}
function parseShow(variable) {
    if (variable === '')
        return '';
    else
        return "v-show=\"".concat(variable, "\"");
}
function parseFor(variable) {
    if (variable === '')
        return '';
    else
        return "v-for=\"(item,index) in ".concat(variable, "\"");
}
