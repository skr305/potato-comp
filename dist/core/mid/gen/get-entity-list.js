"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getEntityList = function (model) {
    if (model.Model &&
        model.Model.tables) {
        return Object.keys(model.Model.tables);
    }
    return [];
};
exports.default = getEntityList;
