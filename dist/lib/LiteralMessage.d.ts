import Message from "./Message";
export default class LiteralMessage implements Message {
    str: string;
    constructor(str: string);
    getString(): string;
    toString(): string;
}
