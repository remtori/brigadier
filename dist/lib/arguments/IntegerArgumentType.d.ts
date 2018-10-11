import StringReader from "../StringReader";
import CommandContext from "../context/CommandContext";
import Suggestions from "../suggestion/Suggestions";
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder";
import ArgumentType from "./ArgumentType";
export default class IntegerArgumentType implements ArgumentType<number> {
    private minimum;
    private maximum;
    private constructor();
    static integer(min?: number, max?: number): IntegerArgumentType;
    static getInteger(context: CommandContext<any>, name: string): number;
    getMinimum(): number;
    getMaximum(): number;
    parse(reader: StringReader): number;
    equals(o: any): boolean;
    toString(): string;
    listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
    getExamples(): Iterable<string>;
}
