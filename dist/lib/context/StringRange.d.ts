import ImmutableStringReader from "../ImmutableStringReader";
export default class StringRange {
    private start;
    private end;
    constructor(start: number, end: number);
    static at(pos: number): StringRange;
    static between(start: number, end: number): StringRange;
    static encompassing(a: StringRange, b: StringRange): StringRange;
    getStart(): number;
    getEnd(): number;
    get(str: ImmutableStringReader | string): string;
    isEmpty(): boolean;
    getLength(): number;
    equals(o: any): boolean;
    toString(): string;
}
