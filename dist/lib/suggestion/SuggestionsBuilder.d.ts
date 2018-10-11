import Message from "../Message";
import Suggestions from "./Suggestions";
export default class SuggestionsBuilder {
    private input;
    private start;
    private remaining;
    private result;
    constructor(input: string, start: number);
    getInput(): String;
    getStart(): number;
    getRemaining(): string;
    build(): Suggestions;
    buildPromise(): Promise<Suggestions>;
    suggest(text: string | number, tooltip?: Message): SuggestionsBuilder;
    add(other: SuggestionsBuilder): SuggestionsBuilder;
    createOffset(start: number): SuggestionsBuilder;
    restart(): SuggestionsBuilder;
}
