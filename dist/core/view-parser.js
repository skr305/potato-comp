var joinTagToElementWithN = function (tag) {
    return ["<".concat(tag, ">\n"), "</".concat(tag, ">\n")];
};
var joinTagToElement = function (tag) {
    return ["<".concat(tag, ">"), "</".concat(tag, ">")];
};
var drawDefaultHtmlTemplate = function (content) {
    var _a = joinTagToElementWithN("template"), templateHead = _a[0], templateFoot = _a[1];
    return "".concat(templateHead).concat(content).concat(templateFoot);
};
var compileSingleXLDCS = function (raw) {
    var _a = raw.split(">"), compCore = _a[0], compProps = _a[1];
    var _b = compCore.split(":"), compName = _b[0], compChild = _b[1];
    var propsConcated = "";
    for (var _i = 0, _c = compProps.split(","); _i < _c.length; _i++) {
        var prop = _c[_i];
        propsConcated += prop.trim();
    }
    return "<".concat(compName, " ").concat(propsConcated, "> ").concat(compChild, "</").concat(compName, ">\n");
};
var compileXLDCSs = function (xldcsRaw) {
    var xldcsArray = xldcsRaw.split(";");
    return xldcsArray.reduce(function (pre, cur) {
        return "".concat(pre).concat(cur);
    }, "");
};
var drawXLDCsToTemplateNested = function (xldcsRaw) {
    return compileXLDCSs(xldcsRaw);
};
var compileVueCore = function (nested) {
    var _a = joinTagToElementWithN("script"), scriptHead = _a[0], scriptFoot = _a[1];
    return "".concat(scriptHead, " export new Vue( ").concat(nested, " ); ").concat(scriptFoot);
};
