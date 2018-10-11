import Primitive from "../Primitive"
import StringReader from "../StringReader"
import CommandContext from "../context/CommandContext"
import Suggestions from "../suggestion/Suggestions"
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder"
import ArgumentType from "./ArgumentType"

const EXAMPLES: IterableIterator<string> = new Set(["true", "false"]).values();

export default class BoolArgumentType implements ArgumentType<boolean> {        
    
    private constructor () {        
    }
    
    public static bool(): BoolArgumentType {
        return new BoolArgumentType();
    }
    
    public static getBool(context: CommandContext<any>, name: string): boolean {
        return context.getArgument(name, Primitive.Boolean);
    }

    public parse(reader: StringReader): boolean {
        return reader.readBoolean();
    }

    public listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions> {
        if ("true".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("true");
        }
        
        if ("false".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("false");
        }
        
        return builder.buildPromise();
    }

    public getExamples(): IterableIterator<string> {
        return EXAMPLES;
    }
}