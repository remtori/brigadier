import ArgumentType from "../arguments/ArgumentType";
import SuggestionProvider from "../suggestion/SuggestionProvider";
import ArgumentCommandNode from "../tree/ArgumentCommandNode";
import ArgumentBuilder from "./ArgumentBuilder";
export default class RequiredArgumentBuilder<S, T> extends ArgumentBuilder<S, RequiredArgumentBuilder<S, T>> {
    private name;
    private type;
    private suggestionsProvider;
    private constructor();
    static argument<S, T>(name: string, type: ArgumentType<T>): RequiredArgumentBuilder<S, T>;
    suggests(provider: SuggestionProvider<S>): RequiredArgumentBuilder<S, T>;
    getSuggestionsProvider(): SuggestionProvider<S>;
    getThis(): RequiredArgumentBuilder<S, T>;
    getType(): ArgumentType<T>;
    getName(): string;
    build(): ArgumentCommandNode<S, T>;
}
export declare const argument: typeof RequiredArgumentBuilder.argument;
