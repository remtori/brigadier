"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuiltInExceptions_1 = __importDefault(require("./BuiltInExceptions"));
class CommandSyntaxException extends Error {
    constructor(type, message, input = null, cursor = -1) {
        super(message.getString());
        Error.captureStackTrace(this, CommandSyntaxException);
        this.type = type;
        this.__message = message;
        this.input = input;
        this.cursor = cursor;
        this.message = this.getMessage();
    }
    getMessage() {
        let message = this.__message.getString();
        let context = this.getContext();
        if (context != null) {
            message += " at position " + this.cursor + ": " + context;
        }
        return message;
    }
    getRawMessage() {
        return this.__message;
    }
    getContext() {
        if (this.input == null || this.cursor < 0) {
            return null;
        }
        let builder = "";
        let cursor = Math.min(this.input.length, this.cursor);
        if (cursor > CommandSyntaxException.CONTEXT_AMOUNT) {
            builder += "...";
        }
        builder += this.input.substring(Math.max(0, cursor - CommandSyntaxException.CONTEXT_AMOUNT), cursor);
        builder += "<--[HERE]";
        return builder;
    }
    getType() {
        return this.type;
    }
    getInput() {
        return this.input;
    }
    getCursor() {
        return this.cursor;
    }
    toString() {
        return this.message;
    }
}
CommandSyntaxException.CONTEXT_AMOUNT = 10;
CommandSyntaxException.BUILT_IN_EXCEPTIONS = new BuiltInExceptions_1.default();
exports.default = CommandSyntaxException;
