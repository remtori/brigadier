import CommandNode from "./CommandNode";
import StringReader from "../StringReader";
import ArgumentBuilder from "../builder/ArgumentBuilder";
import CommandContext from "../context/CommandContext";
import CommandContextBuilder from "../context/CommandContextBuilder";
import Suggestions from "../suggestion/Suggestions";
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder";
export default class RootCommandNode<S> extends CommandNode<S> {
    constructor();
    getNodeType(): string;
    getName(): string;
    getUsageText(): string;
    parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
    listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
    isValidInput(input: String): boolean;
    equals(o: any): boolean;
    createBuilder(): ArgumentBuilder<S, any>;
    getSortedKey(): string;
    getExamples(): Iterable<string>;
    toString(): string;
}
