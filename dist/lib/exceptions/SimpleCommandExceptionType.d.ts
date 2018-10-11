import Message from "../Message";
import ImmutableStringReader from "../ImmutableStringReader";
import CommandExceptionType from "./CommandExceptionType";
import CommandSyntaxException from "./CommandSyntaxException";
export default class SimpleCommandExceptionType implements CommandExceptionType {
    private message;
    constructor(message: Message);
    create(): CommandSyntaxException;
    createWithContext(reader: ImmutableStringReader): CommandSyntaxException;
    toString(): string;
}
