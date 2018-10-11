import StringReader from "../StringReader"
import CommandContext from "../context/CommandContext"
import Suggestions from "../suggestion/Suggestions"
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder"

import BoolArgumentType from "./BoolArgumentType"
import IntegerArgumentType from "./IntegerArgumentType"
import FloatArgumentType from "./FloatArgumentType"
import StringArgumentType from "./StringArgumentType"

export const DefaultType = {
	bool: BoolArgumentType.bool,
	integer: IntegerArgumentType.integer,
	float: FloatArgumentType.float,
	word: StringArgumentType.word,
	string: StringArgumentType.string,
	greedyString: StringArgumentType.greedyString
}

export default interface ArgumentType<T> {
    
    parse(reader: StringReader): T;
    
    listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
    
    getExamples(): Iterable<string>;
}