import Message from "../Message";
import StringRange from "../context/StringRange";
export default class Suggestion {
    private range;
    private text;
    private tooltip;
    constructor(range: StringRange, text: string, tooltip?: Message);
    getRange(): StringRange;
    getText(): string;
    getTooltip(): Message;
    apply(input: string): string;
    equals(o: any): boolean;
    toString(): String;
    compareTo(o: Suggestion): number;
    compareToIgnoreCase(b: Suggestion): number;
    expand(command: string, range: StringRange): Suggestion;
}
