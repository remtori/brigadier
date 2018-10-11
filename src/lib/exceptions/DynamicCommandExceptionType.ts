import CommandExceptionType from "./CommandExceptionType"
import CommandSyntaxException from "./CommandSyntaxException"
import ImmutableStringReader from "../ImmutableStringReader"

export default class DynamicCommandExceptionType implements CommandExceptionType {
    
    private fn: Function;
    
    public constructor(fn: Function) {
		this.fn = fn;
		Error.captureStackTrace(this, DynamicCommandExceptionType)
    }
    
    public create(arg: Object): CommandSyntaxException {
        return new CommandSyntaxException(this, this.fn(arg));
    }
    
    public createWithContext(reader: ImmutableStringReader, arg: Object): CommandSyntaxException {
        return new CommandSyntaxException(this, this.fn(arg), reader.getString(), reader.getCursor());
    }
}
