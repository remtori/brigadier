import CommandDispatcher from "./lib/CommandDispatcher"
import LiteralMessage from "./lib/LiteralMessage"
import ParseResults from "./lib/ParseResults"
import StringReader from "./lib/StringReader"
import { DefaultType } from "./lib/arguments/ArgumentType"
import LiteralArgumentBuilder, { literal } from "./lib/builder/LiteralArgumentBuilder"
import RequiredArgumentBuilder, { argument } from "./lib/builder/RequiredArgumentBuilder"
import CommandContext from "./lib/context/CommandContext"
import CommandContextBuilder from "./lib/context/CommandContextBuilder"
import ParsedArgument from "./lib/context/ParsedArgument"
import ParsedCommandNode from "./lib/context/ParsedCommandNode"
import StringRange from "./lib/context/StringRange"
import SuggestionsContext from "./lib/context/SuggestionContext"
import CommandSyntaxException from "./lib/exceptions/CommandSyntaxException"
import Dynamic2CommandExceptionType from "./lib/exceptions/Dynamic2CommandExceptionType"
import DynamicCommandExceptionType from "./lib/exceptions/DynamicCommandExceptionType"
import SimpleCommandExceptionType from "./lib/exceptions/SimpleCommandExceptionType"
import Suggestion from "./lib/suggestion/Suggestion"
import Suggestions from "./lib/suggestion/Suggestions"
import SuggestionsBuilder from "./lib/suggestion/SuggestionsBuilder";
import CommandNode from "./lib/tree/CommandNode"
import ArgumentCommandNode from "./lib/tree/ArgumentCommandNode"
import LiteralCommandNode from "./lib/tree/LiteralCommandNode"
import RootCommandNode from "./lib/tree/RootCommandNode"

const { word, string, greedyString, bool, integer, float} = DefaultType

module.exports = {
	word, string, greedyString, bool, integer, float,	
	literal, argument,
	CommandDispatcher,
	LiteralMessage,
	ParseResults,
	StringReader,
	LiteralArgumentBuilder,
	RequiredArgumentBuilder,
	CommandContext,
	CommandContextBuilder,
	ParsedArgument,
	ParsedCommandNode,
	StringRange,
	SuggestionsContext,
	CommandSyntaxException,
	SimpleCommandExceptionType,
	DynamicCommandExceptionType,
	Dynamic2CommandExceptionType,
	Suggestion,
	Suggestions,
	SuggestionsBuilder,
	CommandNode,
	ArgumentCommandNode,
	LiteralCommandNode,
	RootCommandNode
}