"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandNode_1 = __importDefault(require("./CommandNode"));
const Suggestions_1 = __importDefault(require("../suggestion/Suggestions"));
class RootCommandNode extends CommandNode_1.default {
    constructor() {
        super(null, s => true, null, (s) => s.getSource(), false);
    }
    getNodeType() {
        return "root";
    }
    getName() {
        return "";
    }
    getUsageText() {
        return "";
    }
    parse(reader, contextBuilder) {
    }
    listSuggestions(context, builder) {
        return Suggestions_1.default.empty();
    }
    isValidInput(input) {
        return false;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof RootCommandNode))
            return false;
        return super.equals(o);
    }
    createBuilder() {
        throw new Error("Cannot convert root into a builder");
    }
    getSortedKey() {
        return "";
    }
    getExamples() {
        return [];
    }
    toString() {
        return "<root>";
    }
}
exports.default = RootCommandNode;
