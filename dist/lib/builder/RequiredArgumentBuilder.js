"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentCommandNode_1 = __importDefault(require("../tree/ArgumentCommandNode"));
const ArgumentBuilder_1 = __importDefault(require("./ArgumentBuilder"));
class RequiredArgumentBuilder extends ArgumentBuilder_1.default {
    constructor(name, type) {
        super();
        this.name = name;
        this.type = type;
    }
    static argument(name, type) {
        return new RequiredArgumentBuilder(name, type);
    }
    suggests(provider) {
        this.suggestionsProvider = provider;
        return this.getThis();
    }
    getSuggestionsProvider() {
        return this.suggestionsProvider;
    }
    getThis() {
        return this;
    }
    getType() {
        return this.type;
    }
    getName() {
        return this.name;
    }
    build() {
        let result = new ArgumentCommandNode_1.default(this.getName(), this.getType(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork(), this.getSuggestionsProvider());
        for (let arg of this.getArguments()) {
            result.addChild(arg);
        }
        return result;
    }
}
exports.default = RequiredArgumentBuilder;
exports.argument = RequiredArgumentBuilder.argument;
