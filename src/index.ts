import StringReader from "./lib/StringReader"
import CommandContext from "./lib/context/CommandContext"
import CommandDispatcher from "./lib/CommandDispatcher"
import { literal } from "./lib/builder/LiteralArgumentBuilder"
import { argument } from "./lib/builder/RequiredArgumentBuilder"
import { DefaultType } from "./lib/arguments/ArgumentType"
import SuggestionsBuilder from "./lib/suggestion/SuggestionsBuilder";

const { word, string, greedyString, bool, integer, float} = DefaultType

module.exports = {
	word, string, greedyString, bool, integer, float,	
	literal, argument,
	SuggestionsBuilder,
	CommandDispatcher,
	CommandContext,	
	StringReader
}