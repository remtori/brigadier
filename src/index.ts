import CommandDispatcher from "./lib/CommandDispatcher"
import { literal } from "./lib/builder/LiteralArgumentBuilder"
import { argument } from "./lib/builder/RequiredArgumentBuilder"
import { DefaultType } from "./lib/arguments/ArgumentType"

const { word, string, greedyString, bool, integer, float} = DefaultType

module.exports = {
	word, string, greedyString, bool, integer, float,	
	literal, argument,
	CommandDispatcher,
}