import Command from "../Command";
import CommandNode from "./CommandNode";
import Predicate from "../Predicate";
import RedirectModifier from "../RedirectModifier";
import StringReader from "../StringReader";
import LiteralArgumentBuilder from "../builder/LiteralArgumentBuilder";
import CommandContext from "../context/CommandContext";
import CommandContextBuilder from "../context/CommandContextBuilder";
import Suggestions from "../suggestion/Suggestions";
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder";
export default class LiteralCommandNode<S> extends CommandNode<S> {
    private literal;
    constructor(literal: string, command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean);
    getNodeType(): string;
    getLiteral(): string;
    getName(): string;
    parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
    private __parse;
    listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
    isValidInput(input: string): boolean;
    equals(o: any): boolean;
    getUsageText(): string;
    createBuilder(): LiteralArgumentBuilder<S>;
    getSortedKey(): string;
    getExamples(): Iterable<string>;
    toString(): string;
}
