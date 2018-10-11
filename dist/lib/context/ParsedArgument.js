"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringRange_1 = __importDefault(require("./StringRange"));
class ParsedArgument {
    constructor(start, end, result) {
        this.range = StringRange_1.default.between(start, end);
        this.result = result;
    }
    getRange() {
        return this.range;
    }
    getResult() {
        return this.result;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof ParsedArgument))
            return false;
        return this.range.equals(o.range) && this.result === o.result;
    }
}
exports.default = ParsedArgument;
