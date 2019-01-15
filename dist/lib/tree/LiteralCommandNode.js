"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandNode_1 = __importDefault(require("./CommandNode"));
const StringReader_1 = __importDefault(require("../StringReader"));
const LiteralArgumentBuilder_1 = __importDefault(require("../builder/LiteralArgumentBuilder"));
const StringRange_1 = __importDefault(require("../context/StringRange"));
const CommandSyntaxException_1 = __importDefault(require("../exceptions/CommandSyntaxException"));
const Suggestions_1 = __importDefault(require("../suggestion/Suggestions"));
class LiteralCommandNode extends CommandNode_1.default {
    constructor(literal, command, requirement, redirect, modifier, forks) {
        super(command, requirement, redirect, modifier, forks);
        this.literal = literal;
    }
    getNodeType() {
        return "literal";
    }
    getLiteral() {
        return this.literal;
    }
    getName() {
        return this.literal;
    }
    parse(reader, contextBuilder) {
        let start = reader.getCursor();
        let end = this.__parse(reader);
        if (end > -1) {
            contextBuilder.withNode(this, StringRange_1.default.between(start, end));
            return;
        }
        throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.literalIncorrect().createWithContext(reader, this.literal);
    }
    __parse(reader) {
        let start = reader.getCursor();
        if (reader.canRead(this.literal.length)) {
            let end = start + this.literal.length;
            if (reader.getString().substring(start, end) === this.literal) {
                reader.setCursor(end);
                if (!reader.canRead() || reader.peek() == ' ') {
                    return end;
                }
                else {
                    reader.setCursor(start);
                }
            }
        }
        return -1;
    }
    listSuggestions(context, builder) {
        if (this.literal.toLowerCase().startsWith(builder.getRemaining().toLowerCase())) {
            return builder.suggest(this.literal).buildPromise();
        }
        else {
            return Suggestions_1.default.empty();
        }
    }
    isValidInput(input) {
        return this.__parse(new StringReader_1.default(input)) > -1;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof LiteralCommandNode))
            return false;
        if (!(this.literal === o.literal))
            return false;
        return super.equals(o);
    }
    getUsageText() {
        return this.literal;
    }
    createBuilder() {
        let builder = LiteralArgumentBuilder_1.default.literal(this.literal);
        builder.requires(this.getRequirement());
        builder.forward(this.getRedirect(), this.getRedirectModifier(), this.isFork());
        if (this.getCommand() != null)
            builder.executes(this.getCommand());
        return builder;
    }
    getSortedKey() {
        return this.literal;
    }
    getExamples() {
        return [this.literal];
    }
    toString() {
        return "<literal " + this.literal + ">";
    }
}
exports.default = LiteralCommandNode;
