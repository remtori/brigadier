import CommandNode from "../tree/CommandNode";
export default class SuggestionContext<S> {
    parent: CommandNode<S>;
    startPos: number;
    constructor(parent: CommandNode<S>, startPos: number);
}
