"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("../util/isEqual"));
const StringReader_1 = __importDefault(require("../StringReader"));
const RequiredArgumentBuilder_1 = __importDefault(require("../builder/RequiredArgumentBuilder"));
const ParsedArgument_1 = __importDefault(require("../context/ParsedArgument"));
const CommandNode_1 = __importDefault(require("./CommandNode"));
const USAGE_ARGUMENT_OPEN = "<";
const USAGE_ARGUMENT_CLOSE = ">";
class ArgumentCommandNode extends CommandNode_1.default {
    constructor(name, type, command, requirement, redirect, modifier, forks, customSuggestions) {
        super(command, requirement, redirect, modifier, forks);
        this.name = name;
        this.type = type;
        this.customSuggestions = customSuggestions;
    }
    getNodeType() {
        return "argument";
    }
    getType() {
        return this.type;
    }
    getName() {
        return this.name;
    }
    getUsageText() {
        return USAGE_ARGUMENT_OPEN + this.name + USAGE_ARGUMENT_CLOSE;
    }
    getCustomSuggestions() {
        return this.customSuggestions;
    }
    parse(reader, contextBuilder) {
        let start = reader.getCursor();
        let result = this.type.parse(reader);
        let parsed = new ParsedArgument_1.default(start, reader.getCursor(), result);
        contextBuilder.withArgument(this.name, parsed);
        contextBuilder.withNode(this, parsed.getRange());
    }
    listSuggestions(context, builder) {
        if (this.customSuggestions == null) {
            return this.type.listSuggestions(context, builder);
        }
        else {
            return this.customSuggestions.getSuggestions(context, builder);
        }
    }
    createBuilder() {
        let builder = RequiredArgumentBuilder_1.default.argument(this.name, this.type);
        builder.requires(this.getRequirement());
        builder.forward(this.getRedirect(), this.getRedirectModifier(), this.isFork());
        builder.suggests(this.customSuggestions);
        if (this.getCommand() != null) {
            builder.executes(this.getCommand());
        }
        return builder;
    }
    isValidInput(input) {
        try {
            let reader = new StringReader_1.default(input);
            this.type.parse(reader);
            return !reader.canRead() || reader.peek() == ' ';
        }
        catch (ignored) {
        }
        return false;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof ArgumentCommandNode))
            return false;
        if (!(this.name === o.name))
            return false;
        if (!isEqual_1.default(this.type, o.type))
            return false;
        return super.equals(o);
    }
    // public hashCode(): number {
    //     let result = this.name.hashCode();
    //     result = 31 * result + this.type.hashCode();
    //     return result;
    // }
    getSortedKey() {
        return this.name;
    }
    getExamples() {
        return this.type.getExamples();
    }
    toString() {
        return "<argument " + this.name + ":" + this.type + ">";
    }
}
exports.default = ArgumentCommandNode;
