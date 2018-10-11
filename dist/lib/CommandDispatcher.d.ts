import ParseResults from "./ParseResults";
import ResultConsumer from "./ResultConsumer";
import AmbiguityConsumer from "./AmbiguityConsumer";
import LiteralArgumentBuilder from "./builder/LiteralArgumentBuilder";
import Suggestions from "./suggestion/Suggestions";
import CommandNode from "./tree/CommandNode";
import LiteralCommandNode from "./tree/LiteralCommandNode";
import RootCommandNode from "./tree/RootCommandNode";
import StringReader from "./StringReader";
export default class CommandDispatcher<S> {
    private root;
    private consumer;
    constructor(root?: RootCommandNode<S>);
    register(command: LiteralArgumentBuilder<S>): LiteralCommandNode<S>;
    setConsumer(consumer: ResultConsumer<S>): void;
    execute(input: string | StringReader | ParseResults<S>, source?: S): number;
    parse(command: string | StringReader, source: S): ParseResults<S>;
    private parseNodes;
    getAllUsage(node: CommandNode<S>, source: S, restricted: boolean): string[];
    private __getAllUsage;
    getSmartUsage(node: CommandNode<S>, source: S): Map<CommandNode<S>, string>;
    private __getSmartUsage;
    getCompletionSuggestions(parse: ParseResults<S>, cursor?: number): Promise<Suggestions>;
    getRoot(): RootCommandNode<S>;
    getPath(target: CommandNode<S>): string[];
    findNode(path: string[]): CommandNode<S>;
    findAmbiguities(consumer: AmbiguityConsumer<S>): void;
    private addPaths;
}
