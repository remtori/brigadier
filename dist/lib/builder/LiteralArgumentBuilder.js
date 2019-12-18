"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LiteralCommandNode_1 = __importDefault(require("../tree/LiteralCommandNode"));
const ArgumentBuilder_1 = __importDefault(require("./ArgumentBuilder"));
class LiteralArgumentBuilder extends ArgumentBuilder_1.default {
    constructor(literal) {
        super();
        this.literal = literal;
    }
    static literal(name) {
        return new LiteralArgumentBuilder(name);
    }
    getThis() {
        return this;
    }
    getLiteral() {
        return this.literal;
    }
    build() {
        let result = new LiteralCommandNode_1.default(this.getLiteral(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork());
        for (let arg of this.getArguments()) {
            result.addChild(arg);
        }
        return result;
    }
}
exports.default = LiteralArgumentBuilder;
exports.literal = LiteralArgumentBuilder.literal;
