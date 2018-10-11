"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LiteralMessage_1 = __importDefault(require("../LiteralMessage"));
const SimpleCommandExceptionType_1 = __importDefault(require("./SimpleCommandExceptionType"));
const DynamicCommandExceptionType_1 = __importDefault(require("./DynamicCommandExceptionType"));
const Dynamic2CommandExceptionType_1 = __importDefault(require("./Dynamic2CommandExceptionType"));
class BuiltInExceptions {
    floatTooLow() {
        return BuiltInExceptions.FLOAT_TOO_SMALL;
    }
    floatTooHigh() {
        return BuiltInExceptions.FLOAT_TOO_BIG;
    }
    integerTooLow() {
        return BuiltInExceptions.INTEGER_TOO_SMALL;
    }
    integerTooHigh() {
        return BuiltInExceptions.INTEGER_TOO_BIG;
    }
    literalIncorrect() {
        return BuiltInExceptions.LITERAL_INCORRECT;
    }
    readerExpectedStartOfQuote() {
        return BuiltInExceptions.READER_EXPECTED_START_OF_QUOTE;
    }
    readerExpectedEndOfQuote() {
        return BuiltInExceptions.READER_EXPECTED_END_OF_QUOTE;
    }
    readerInvalidEscape() {
        return BuiltInExceptions.READER_INVALID_ESCAPE;
    }
    readerInvalidBool() {
        return BuiltInExceptions.READER_INVALID_BOOL;
    }
    readerInvalidInt() {
        return BuiltInExceptions.READER_INVALID_INT;
    }
    readerExpectedInt() {
        return BuiltInExceptions.READER_EXPECTED_INT;
    }
    readerInvalidFloat() {
        return BuiltInExceptions.READER_INVALID_FLOAT;
    }
    readerExpectedFloat() {
        return BuiltInExceptions.READER_EXPECTED_FLOAT;
    }
    readerExpectedBool() {
        return BuiltInExceptions.READER_EXPECTED_BOOL;
    }
    readerExpectedSymbol() {
        return BuiltInExceptions.READER_EXPECTED_SYMBOL;
    }
    dispatcherUnknownCommand() {
        return BuiltInExceptions.DISPATCHER_UNKNOWN_COMMAND;
    }
    dispatcherUnknownArgument() {
        return BuiltInExceptions.DISPATCHER_UNKNOWN_ARGUMENT;
    }
    dispatcherExpectedArgumentSeparator() {
        return BuiltInExceptions.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR;
    }
    dispatcherParseException() {
        return BuiltInExceptions.DISPATCHER_PARSE_EXCEPTION;
    }
}
BuiltInExceptions.FLOAT_TOO_SMALL = new Dynamic2CommandExceptionType_1.default((found, min) => new LiteralMessage_1.default("Float must not be less than " + min + ", found " + found));
BuiltInExceptions.FLOAT_TOO_BIG = new Dynamic2CommandExceptionType_1.default((found, max) => new LiteralMessage_1.default("Float must not be more than " + max + ", found " + found));
BuiltInExceptions.INTEGER_TOO_SMALL = new Dynamic2CommandExceptionType_1.default((found, min) => new LiteralMessage_1.default("Integer must not be less than " + min + ", found " + found));
BuiltInExceptions.INTEGER_TOO_BIG = new Dynamic2CommandExceptionType_1.default((found, max) => new LiteralMessage_1.default("Integer must not be more than " + max + ", found " + found));
BuiltInExceptions.LITERAL_INCORRECT = new DynamicCommandExceptionType_1.default(expected => new LiteralMessage_1.default("Expected literal " + expected));
BuiltInExceptions.READER_EXPECTED_START_OF_QUOTE = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected quote to start a string"));
BuiltInExceptions.READER_EXPECTED_END_OF_QUOTE = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Unclosed quoted string"));
BuiltInExceptions.READER_INVALID_ESCAPE = new DynamicCommandExceptionType_1.default(character => new LiteralMessage_1.default("Invalid escape sequence '" + character + "' in quoted string"));
BuiltInExceptions.READER_INVALID_BOOL = new DynamicCommandExceptionType_1.default(value => new LiteralMessage_1.default("Invalid bool, expected true or false but found '" + value + "'"));
BuiltInExceptions.READER_INVALID_INT = new DynamicCommandExceptionType_1.default(value => new LiteralMessage_1.default("Invalid integer '" + value + "'"));
BuiltInExceptions.READER_EXPECTED_INT = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected integer"));
BuiltInExceptions.READER_INVALID_FLOAT = new DynamicCommandExceptionType_1.default(value => new LiteralMessage_1.default("Invalid float '" + value + "'"));
BuiltInExceptions.READER_EXPECTED_FLOAT = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected float"));
BuiltInExceptions.READER_EXPECTED_BOOL = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected bool"));
BuiltInExceptions.READER_EXPECTED_SYMBOL = new DynamicCommandExceptionType_1.default(symbol => new LiteralMessage_1.default("Expected '" + symbol + "'"));
BuiltInExceptions.DISPATCHER_UNKNOWN_COMMAND = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Unknown command"));
BuiltInExceptions.DISPATCHER_UNKNOWN_ARGUMENT = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Incorrect argument for command"));
BuiltInExceptions.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected whitespace to end one argument, but found trailing data"));
BuiltInExceptions.DISPATCHER_PARSE_EXCEPTION = new DynamicCommandExceptionType_1.default(message => new LiteralMessage_1.default(("Could not parse command: " + message)));
exports.default = BuiltInExceptions;
