import StringReader from "../StringReader";
import CommandContext from "../context/CommandContext";
import Suggestions from "../suggestion/Suggestions";
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder";
import ArgumentType from "./ArgumentType";
export default class BoolArgumentType implements ArgumentType<boolean> {
    private constructor();
    static bool(): BoolArgumentType;
    static getBool(context: CommandContext<any>, name: string): boolean;
    parse(reader: StringReader): boolean;
    listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
    getExamples(): Iterable<string>;
}
