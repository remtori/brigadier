"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandSyntaxException_1 = __importDefault(require("./CommandSyntaxException"));
class DynamicCommandExceptionType {
    constructor(fn) {
        this.fn = fn;
        Error.captureStackTrace(this, DynamicCommandExceptionType);
    }
    create(...args) {
        return new CommandSyntaxException_1.default(this, this.fn(...args));
    }
    createWithContext(reader, ...args) {
        return new CommandSyntaxException_1.default(this, this.fn(...args), reader.getString(), reader.getCursor());
    }
}
exports.default = DynamicCommandExceptionType;
