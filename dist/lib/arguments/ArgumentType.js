"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BoolArgumentType_1 = __importDefault(require("./BoolArgumentType"));
const IntegerArgumentType_1 = __importDefault(require("./IntegerArgumentType"));
const FloatArgumentType_1 = __importDefault(require("./FloatArgumentType"));
const StringArgumentType_1 = __importDefault(require("./StringArgumentType"));
exports.DefaultType = {
    bool: BoolArgumentType_1.default.bool,
    integer: IntegerArgumentType_1.default.integer,
    float: FloatArgumentType_1.default.float,
    word: StringArgumentType_1.default.word,
    string: StringArgumentType_1.default.string,
    greedyString: StringArgumentType_1.default.greedyString
};
