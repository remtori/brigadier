import CommandExceptionType from "./CommandExceptionType"
import CommandSyntaxException from "./CommandSyntaxException"
import ImmutableStringReader from "../ImmutableStringReader"

export default class Dynamic2CommandExceptionType implements CommandExceptionType {
    
    private fn: Function;
    
    public constructor (fn: Function) {
		this.fn = fn;
		Error.captureStackTrace(this, Dynamic2CommandExceptionType)
    }
    
    public create(a: Object, b: Object): CommandSyntaxException {
        return new CommandSyntaxException(this, this.fn(a, b));
    }
    
    public createWithContext(reader: ImmutableStringReader, a: Object, b: Object): CommandSyntaxException {
        return new CommandSyntaxException(this, this.fn(a, b), reader.getString(), reader.getCursor());
    }
}
