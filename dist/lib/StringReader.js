"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandSyntaxException_1 = __importDefault(require("./exceptions/CommandSyntaxException"));
const SYNTAX_ESCAPE = '\\';
const SYNTAX_QUOTE = '\"';
class StringReader {
    constructor(other) {
        this.cursor = 0;
        if (typeof other === "string") {
            this.string = other;
        }
        else {
            this.string = other.string;
            this.cursor = other.cursor;
        }
    }
    getString() {
        return this.string;
    }
    setCursor(cursor) {
        this.cursor = cursor;
    }
    getRemainingLength() {
        return (this.string.length - this.cursor);
    }
    getTotalLength() {
        return this.string.length;
    }
    getCursor() {
        return this.cursor;
    }
    getRead() {
        return this.string.substring(0, this.cursor);
    }
    getRemaining() {
        return this.string.substring(this.cursor);
    }
    canRead(length = 1) {
        return this.cursor + length <= this.string.length;
    }
    peek(offset = 0) {
        return this.string.charAt(this.cursor + offset);
    }
    read() {
        return this.string.charAt(this.cursor++);
    }
    skip() {
        this.cursor++;
    }
    static isAllowedNumber(c) {
        return c >= '0' && c <= '9' || c == '.' || c == '-';
    }
    skipWhitespace() {
        while ((this.canRead() && /\s/.test(this.peek()))) {
            this.skip();
        }
    }
    readInt() {
        let start = this.cursor;
        while ((this.canRead() && StringReader.isAllowedNumber(this.peek()))) {
            this.skip();
		}
		
        let number = this.string.substring(start, this.cursor);
        if (number.length === 0) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedInt().createWithContext(this);
        }
        const result = parseInt(number);
        if (isNaN(result)) {
            this.cursor = start;
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidInt().createWithContext(this, number);
        }
        else
            return result;
    }
    readFloat() {
        let start = this.cursor;
        while ((this.canRead() && StringReader.isAllowedNumber(this.peek()))) {
            this.skip();
        }
        let number = this.string.substring(start, this.cursor);
        if (number.length === 0) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedFloat().createWithContext(this);
        }
        const result = parseFloat(number);
        if (isNaN(result)) {
            this.cursor = start;
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidFloat().createWithContext(this, number);
        }
        else
            return result;
    }
    static isAllowedInUnquotedString(c) {
        return c >= '0' && c <= '9'
            || c >= 'A' && c <= 'Z'
            || c >= 'a' && c <= 'z'
            || c == '_' || c == '-'
            || c == '.' || c == '+';
    }
    readUnquotedString() {
        let start = this.cursor;
        while (this.canRead() && StringReader.isAllowedInUnquotedString(this.peek())) {
            this.skip();
        }
        return this.string.substring(start, this.cursor);
    }
    readQuotedString() {
        if (!this.canRead()) {
            return "";
        }
        else if ((this.peek() != SYNTAX_QUOTE)) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedStartOfQuote().createWithContext(this);
        }
        this.skip();
        let result = "";
        let escaped = false;
        while (this.canRead()) {
            let c = this.read();
            if (escaped) {
                if (c == SYNTAX_QUOTE || c == SYNTAX_ESCAPE) {
                    result += c;
                    escaped = false;
                }
                else {
                    this.setCursor(this.getCursor() - 1);
                    throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidEscape().createWithContext(this, c);
                }
            }
            else if (c == SYNTAX_ESCAPE) {
                escaped = true;
            }
            else if (c == SYNTAX_QUOTE) {
                return result;
            }
            else {
                result += c;
            }
        }
        throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedEndOfQuote().createWithContext(this);
    }
    readString() {
        if (this.canRead() && (this.peek() === SYNTAX_QUOTE)) {
            return this.readQuotedString();
        }
        else {
            return this.readUnquotedString();
        }
    }
    readBoolean() {
        let start = this.cursor;
        let value = this.readString();
        if (value.length === 0) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedBool().createWithContext(this);
        }
        if (value === "true") {
            return true;
        }
        else if (value === "false") {
            return false;
        }
        else {
            this.cursor = start;
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidBool().createWithContext(this, value);
        }
    }
    expect(c) {
        if (!this.canRead() || this.peek() !== c) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedSymbol().createWithContext(this, c);
        }
        this.skip();
    }
}
exports.default = StringReader;
