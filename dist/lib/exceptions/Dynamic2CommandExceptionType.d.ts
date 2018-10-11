import CommandExceptionType from "./CommandExceptionType";
import CommandSyntaxException from "./CommandSyntaxException";
import ImmutableStringReader from "../ImmutableStringReader";
export default class Dynamic2CommandExceptionType implements CommandExceptionType {
    private fn;
    constructor(fn: Function);
    create(a: Object, b: Object): CommandSyntaxException;
    createWithContext(reader: ImmutableStringReader, a: Object, b: Object): CommandSyntaxException;
}
