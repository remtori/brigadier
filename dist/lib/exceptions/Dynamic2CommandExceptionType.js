"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandSyntaxException_1 = __importDefault(require("./CommandSyntaxException"));
class Dynamic2CommandExceptionType {
    constructor(fn) {
        this.fn = fn;
        Error.captureStackTrace(this, Dynamic2CommandExceptionType);
    }
    create(a, b) {
        return new CommandSyntaxException_1.default(this, this.fn(a, b));
    }
    createWithContext(reader, a, b) {
        return new CommandSyntaxException_1.default(this, this.fn(a, b), reader.getString(), reader.getCursor());
    }
}
exports.default = Dynamic2CommandExceptionType;
