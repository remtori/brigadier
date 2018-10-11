import StringRange from "../context/StringRange";
import Suggestion from "./Suggestion";
export default class Suggestions {
    private static EMPTY;
    private range;
    private suggestions;
    constructor(range: StringRange, suggestions: Array<Suggestion>);
    getRange(): StringRange;
    getList(): Array<Suggestion>;
    isEmpty(): boolean;
    equals(o: any): boolean;
    toString(): String;
    static empty(): Promise<Suggestions>;
    static merge(command: string, input: Array<Suggestions>): Suggestions;
    static create(command: string, suggestions: Array<Suggestion>): Suggestions;
}
