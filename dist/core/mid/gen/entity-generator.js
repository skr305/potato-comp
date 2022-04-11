"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var boot = function (model) {
    var ConstructotInitialValueMap = {
        "string": "\"\"",
        "longstring": "\"\"",
        "int": "0",
        "longint": "0"
    };
    var output = {};
    var PRIMARY_KEY_ANO = "@PrimaryColumn()";
    var COLUMN_ANO = "@Column()";
    var drawEntityAno = function (tableKey) {
        return "\n@Entity(\"".concat(tableKey, "\")");
    };
    var META_IMPORT = "\nimport { Entity, Column, PrimaryColumn } from 'typeorm';\n    ";
    var tables = model.tables;
    if (tables) {
        Object.keys(tables).map(function (tableKey) {
            var nested = "";
            var tableData = tables[tableKey];
            Object.keys(tableData).map(function (sectionKey) {
                var sectionOutpose = tableData[sectionKey];
                if (sectionOutpose.isID === undefined) {
                    nested += "\n".concat(COLUMN_ANO, "\n").concat(sectionKey, ": ").concat(constants_1.MODEL_TYPES_MAPS[tableData[sectionKey]], "\n= ").concat(ConstructotInitialValueMap[tableData[sectionKey]], ";\n\n                    ");
                }
                else {
                    nested += "\n".concat(sectionOutpose.isID ? PRIMARY_KEY_ANO : COLUMN_ANO, "\n").concat(sectionKey, ": ").concat(constants_1.MODEL_TYPES_MAPS[sectionOutpose.type], "\n= ").concat(ConstructotInitialValueMap[sectionOutpose.type], ";\n\n");
                }
            });
            output[tableKey] = "\n".concat(META_IMPORT, "\n\n").concat(drawEntityAno(tableKey), "\nexport default class ").concat(tableKey, " {\n    ").concat(nested, "\n};            \n            ");
        });
    }
    return output;
};
exports.default = boot;
