import CommandContextBuilder from "./context/CommandContextBuilder";
import CommandSyntaxException from "./exceptions/CommandSyntaxException";
import CommandNode from "./tree/CommandNode";
import ImmutableStringReader from "./ImmutableStringReader";
export default class ParseResults<S> {
    private context;
    private exceptions;
    private reader;
    constructor(context: CommandContextBuilder<S>, reader: ImmutableStringReader, exceptions: Map<CommandNode<S>, CommandSyntaxException>);
    getContext(): CommandContextBuilder<S>;
    getReader(): ImmutableStringReader;
    getExceptions(): Map<CommandNode<S>, CommandSyntaxException>;
}
