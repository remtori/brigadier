import CommandExceptionType from "./CommandExceptionType";
import CommandSyntaxException from "./CommandSyntaxException";
import ImmutableStringReader from "../ImmutableStringReader";
export default class DynamicCommandExceptionType implements CommandExceptionType {
    private fn;
    constructor(fn: Function);
    create(arg: Object): CommandSyntaxException;
    createWithContext(reader: ImmutableStringReader, arg: Object): CommandSyntaxException;
}
