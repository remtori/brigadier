import CommandNode from "../tree/CommandNode";
import StringRange from "./StringRange";
export default class ParsedCommandNode<S> {
    private node;
    private range;
    constructor(node: CommandNode<S>, range: StringRange);
    getNode(): CommandNode<S>;
    getRange(): StringRange;
    toString(): String;
    equals(o: any): boolean;
}
