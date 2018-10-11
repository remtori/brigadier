import Dynamic2CommandExceptionType from "./Dynamic2CommandExceptionType";
import DynamicCommandExceptionType from "./DynamicCommandExceptionType";
import SimpleCommandExceptionType from "./SimpleCommandExceptionType";
export default interface BuiltInExceptionProvider {
    floatTooLow(): Dynamic2CommandExceptionType;
    floatTooHigh(): Dynamic2CommandExceptionType;
    integerTooLow(): Dynamic2CommandExceptionType;
    integerTooHigh(): Dynamic2CommandExceptionType;
    literalIncorrect(): DynamicCommandExceptionType;
    readerExpectedStartOfQuote(): SimpleCommandExceptionType;
    readerExpectedEndOfQuote(): SimpleCommandExceptionType;
    readerInvalidEscape(): DynamicCommandExceptionType;
    readerInvalidBool(): DynamicCommandExceptionType;
    readerInvalidInt(): DynamicCommandExceptionType;
    readerExpectedInt(): SimpleCommandExceptionType;
    readerInvalidFloat(): DynamicCommandExceptionType;
    readerExpectedFloat(): SimpleCommandExceptionType;
    readerExpectedBool(): SimpleCommandExceptionType;
    readerExpectedSymbol(): DynamicCommandExceptionType;
    dispatcherUnknownCommand(): SimpleCommandExceptionType;
    dispatcherUnknownArgument(): SimpleCommandExceptionType;
    dispatcherExpectedArgumentSeparator(): SimpleCommandExceptionType;
    dispatcherParseException(): DynamicCommandExceptionType;
}
