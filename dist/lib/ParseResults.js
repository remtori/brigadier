"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringReader_1 = __importDefault(require("./StringReader"));
class ParseResults {
    constructor(context, reader, exceptions) {
        this.context = context;
        this.reader = reader || new StringReader_1.default("");
        this.exceptions = exceptions || new Map();
    }
    getContext() {
        return this.context;
    }
    getReader() {
        return this.reader;
    }
    getExceptions() {
        return this.exceptions;
    }
}
exports.default = ParseResults;
