import Message from "../Message";
import BuiltInExceptionProvider from "./BuiltInExceptionProvider";
import CommandExceptionType from "./CommandExceptionType";
export default class CommandSyntaxException extends Error {
    static CONTEXT_AMOUNT: number;
    static ENABLE_COMMAND_STACK_TRACES: boolean;
    static BUILT_IN_EXCEPTIONS: BuiltInExceptionProvider;
    private type;
    private __message;
    private input;
    private cursor;
    constructor(type: CommandExceptionType, message: Message, input?: string, cursor?: number);
    getMessage(): string;
    getRawMessage(): Message;
    getContext(): string;
    getType(): CommandExceptionType;
    getInput(): string;
    getCursor(): number;
}
