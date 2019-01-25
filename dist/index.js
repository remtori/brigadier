"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandDispatcher_1 = __importDefault(require("./lib/CommandDispatcher"));
const LiteralMessage_1 = __importDefault(require("./lib/LiteralMessage"));
const ParseResults_1 = __importDefault(require("./lib/ParseResults"));
const StringReader_1 = __importDefault(require("./lib/StringReader"));
const ArgumentType_1 = require("./lib/arguments/ArgumentType");
const LiteralArgumentBuilder_1 = __importStar(require("./lib/builder/LiteralArgumentBuilder"));
const RequiredArgumentBuilder_1 = __importStar(require("./lib/builder/RequiredArgumentBuilder"));
const CommandContext_1 = __importDefault(require("./lib/context/CommandContext"));
const CommandContextBuilder_1 = __importDefault(require("./lib/context/CommandContextBuilder"));
const ParsedArgument_1 = __importDefault(require("./lib/context/ParsedArgument"));
const ParsedCommandNode_1 = __importDefault(require("./lib/context/ParsedCommandNode"));
const StringRange_1 = __importDefault(require("./lib/context/StringRange"));
const SuggestionContext_1 = __importDefault(require("./lib/context/SuggestionContext"));
const CommandSyntaxException_1 = __importDefault(require("./lib/exceptions/CommandSyntaxException"));
const DynamicCommandExceptionType_1 = __importDefault(require("./lib/exceptions/DynamicCommandExceptionType"));
const SimpleCommandExceptionType_1 = __importDefault(require("./lib/exceptions/SimpleCommandExceptionType"));
const Suggestion_1 = __importDefault(require("./lib/suggestion/Suggestion"));
const Suggestions_1 = __importDefault(require("./lib/suggestion/Suggestions"));
const SuggestionsBuilder_1 = __importDefault(require("./lib/suggestion/SuggestionsBuilder"));
const ArgumentCommandNode_1 = __importDefault(require("./lib/tree/ArgumentCommandNode"));
const LiteralCommandNode_1 = __importDefault(require("./lib/tree/LiteralCommandNode"));
const RootCommandNode_1 = __importDefault(require("./lib/tree/RootCommandNode"));
const { word, string, greedyString, bool, integer, float } = ArgumentType_1.DefaultType;
module.exports = {
    dispatcher: new CommandDispatcher_1.default(),
    word, string, greedyString, bool, integer, float,
    literal: LiteralArgumentBuilder_1.literal, argument: RequiredArgumentBuilder_1.argument,
    CommandDispatcher: CommandDispatcher_1.default,
    LiteralMessage: LiteralMessage_1.default,
    ParseResults: ParseResults_1.default,
    StringReader: StringReader_1.default,
    LiteralArgumentBuilder: LiteralArgumentBuilder_1.default,
    RequiredArgumentBuilder: RequiredArgumentBuilder_1.default,
    CommandContext: CommandContext_1.default,
    CommandContextBuilder: CommandContextBuilder_1.default,
    ParsedArgument: ParsedArgument_1.default,
    ParsedCommandNode: ParsedCommandNode_1.default,
    StringRange: StringRange_1.default,
    SuggestionsContext: SuggestionContext_1.default,
    CommandSyntaxException: CommandSyntaxException_1.default,
    SimpleCommandExceptionType: SimpleCommandExceptionType_1.default,
    DynamicCommandExceptionType: DynamicCommandExceptionType_1.default,
    Suggestion: Suggestion_1.default,
    Suggestions: Suggestions_1.default,
    SuggestionsBuilder: SuggestionsBuilder_1.default,
    ArgumentCommandNode: ArgumentCommandNode_1.default,
    LiteralCommandNode: LiteralCommandNode_1.default,
    RootCommandNode: RootCommandNode_1.default
};
