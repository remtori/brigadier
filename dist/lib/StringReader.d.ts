import ImmutableStringReader from "./ImmutableStringReader";
export default class StringReader implements ImmutableStringReader {
    private string;
    private cursor;
    constructor(other: string | StringReader);
    getString(): string;
    setCursor(cursor: number): void;
    getRemainingLength(): number;
    getTotalLength(): number;
    getCursor(): number;
    getRead(): string;
    getRemaining(): string;
    canRead(length?: number): boolean;
    peek(offset?: number): string;
    read(): string;
    skip(): void;
    static isAllowedNumber(c: string): boolean;
    skipWhitespace(): void;
    readInt(): number;
    readFloat(): number;
    static isAllowedInUnquotedString(c: string): boolean;
    readUnquotedString(): string;
    readQuotedString(): string;
    readString(): string;
    readBoolean(): boolean;
    expect(c: string): void;
}
