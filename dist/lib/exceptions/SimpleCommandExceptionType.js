"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandSyntaxException_1 = __importDefault(require("./CommandSyntaxException"));
class SimpleCommandExceptionType {
    constructor(message) {
        this.message = message;
    }
    create() {
        return new CommandSyntaxException_1.default(this, this.message);
    }
    createWithContext(reader) {
        return new CommandSyntaxException_1.default(this, this.message, reader.getString(), reader.getCursor());
    }
    toString() {
        return this.message.getString();
    }
}
exports.default = SimpleCommandExceptionType;
