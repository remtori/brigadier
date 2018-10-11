import StringRange from "./StringRange";
export default class ParsedArgument<S, T> {
    private range;
    private result;
    constructor(start: number, end: number, result: T);
    getRange(): StringRange;
    getResult(): T;
    equals(o: any): boolean;
}
