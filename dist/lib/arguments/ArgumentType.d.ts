import StringReader from "../StringReader";
import CommandContext from "../context/CommandContext";
import Suggestions from "../suggestion/Suggestions";
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder";
import BoolArgumentType from "./BoolArgumentType";
import IntegerArgumentType from "./IntegerArgumentType";
import FloatArgumentType from "./FloatArgumentType";
import StringArgumentType from "./StringArgumentType";
export declare const DefaultType: {
    bool: typeof BoolArgumentType.bool;
    integer: typeof IntegerArgumentType.integer;
    float: typeof FloatArgumentType.float;
    word: typeof StringArgumentType.word;
    string: typeof StringArgumentType.string;
    greedyString: typeof StringArgumentType.greedyString;
};
export default interface ArgumentType<T> {
    parse(reader: StringReader): T;
    listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
    getExamples(): Iterable<string>;
}
