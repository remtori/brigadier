import LiteralCommandNode from "../tree/LiteralCommandNode";
import ArgumentBuilder from "./ArgumentBuilder";
export default class LiteralArgumentBuilder<S> extends ArgumentBuilder<S, LiteralArgumentBuilder<S>> {
    private literal;
    constructor(literal: string);
    static literal<S>(name: string): LiteralArgumentBuilder<S>;
    getThis(): LiteralArgumentBuilder<S>;
    getLiteral(): string;
    build(): LiteralCommandNode<S>;
}
export declare const literal: typeof LiteralArgumentBuilder.literal;
