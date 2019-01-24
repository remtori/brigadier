// Type definitions for brigadier[0.0.6]
// Project: Brigadier
// Definitions by: Remtori <https://github.com/Remtori>

declare const enum Primitive {
    Int, Float, Boolean, String
}
declare interface Command<S> {
    (context: CommandContext<S>): number;
}
declare interface ResultConsumer<S> {    
    onCommandComplete(context: CommandContext<S>, success: boolean, result: number): void;
}
declare interface SingleRedirectModifier<S> {
    apply(context: CommandContext<S>): S;
}
declare interface RedirectModifier<S> {
	apply(context: CommandContext<S>): S[];
}
declare interface Predicate<T> {
	(t: T): boolean;
}
declare interface AmbiguityConsumer<S> {
	ambiguous(parent: CommandNode<S>, child: CommandNode<S>, sibling: CommandNode<S>, inputs: Iterable<string>): void;
}
declare interface ImmutableStringReader {
	getString(): string;
	getRemainingLength(): number;
	getTotalLength(): number;
	getCursor(): number;
	getRead(): string;
	getRemaining(): string;
	canRead(length: number): boolean;
	canRead(): boolean;
	peek(): string;
	peek(offset: number): string;
}
declare interface Message {
    getString(): string;
}
declare interface CommandExceptionType {
}
declare interface ArgumentType<T> {
	parse(reader: StringReader): T;
	listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
	getExamples(): Iterable<string>;
}
declare interface SuggestionProvider<S> {
    getSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
}
declare abstract class ArgumentBuilder<S, T extends ArgumentBuilder<S, T>> {
	abstract getThis(): T;
	then(arg: ArgumentBuilder<S, any> | CommandNode<S>): T;
	getArguments(): Iterable<CommandNode<S>>;
	executes(command: Command<S>): T;
	getCommand(): Command<S>;
	requires(requirement: Predicate<S>): T;
	getRequirement(): Predicate<S>;
	redirect(target: CommandNode<S>, modifier?: SingleRedirectModifier<S>): T;
	fork(target: CommandNode<S>, modifier: RedirectModifier<S>): T;
	forward(target: CommandNode<S>, modifier: RedirectModifier<S>, fork: boolean): T;
	getRedirect(): CommandNode<S>;
	getRedirectModifier(): RedirectModifier<S>;
	isFork(): boolean;
	abstract build(): CommandNode<S>;
}
declare abstract class CommandNode<S> {	    	    
	constructor(command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean);
	abstract getNodeType(): string;
	getCommand(): Command<S>;
	getChildren(): Iterable<CommandNode<S>>;
	getChildrenCount(): number;
	getChild(name: string): CommandNode<S>;
	getRedirect(): CommandNode<S>;
	getRedirectModifier(): RedirectModifier<S>;
	canUse(source: S): boolean;
	addChild(node: CommandNode<S>): void;
	findAmbiguities(consumer: AmbiguityConsumer<S>): void;
	abstract isValidInput(input: string): boolean;
	equals(o: any): boolean;
	getRequirement(): Predicate<S>;
	abstract getName(): string;
	abstract getUsageText(): string;
	abstract parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
	abstract listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
	abstract createBuilder(): ArgumentBuilder<S, any>;
	abstract getSortedKey(): string;
	getRelevantNodes(input: StringReader): Iterable<CommandNode<S>>;
	compareTo(o: CommandNode<S>): number;
	isFork(): boolean;
	abstract getExamples(): Iterable<string>;
}
declare class LiteralMessage implements Message {
	constructor(str: string);
	getString(): string;
	toString(): string;
}
declare class CommandSyntaxException extends Error {
	static CONTEXT_AMOUNT: number;
	getMessage(): string;
	getRawMessage(): Message;
	getContext(): string;
	getType(): CommandExceptionType;
	getInput(): string;
	getCursor(): number;
}
declare class DynamicCommandExceptionType implements CommandExceptionType {
    constructor(fn: (...args: any[]) => Message);
	create(...args: any[]): CommandSyntaxException;
	createWithContext(reader: ImmutableStringReader, ...args: any[]): CommandSyntaxException;
}
declare class SimpleCommandExceptionType implements CommandExceptionType {
	private message;
	constructor(message: Message);
	create(): CommandSyntaxException;
	createWithContext(reader: ImmutableStringReader): CommandSyntaxException;
	toString(): string;
}
declare class BuiltInExceptions {
	private static FLOAT_TOO_SMALL;
	private static FLOAT_TOO_BIG;
	private static INTEGER_TOO_SMALL;
	private static INTEGER_TOO_BIG;
	private static LITERAL_INCORRECT;
	private static READER_EXPECTED_START_OF_QUOTE;
	private static READER_EXPECTED_END_OF_QUOTE;
	private static READER_INVALID_ESCAPE;
	private static READER_INVALID_BOOL;
	private static READER_INVALID_INT;
	private static READER_EXPECTED_INT;
	private static READER_INVALID_FLOAT;
	private static READER_EXPECTED_FLOAT;
	private static READER_EXPECTED_BOOL;
	private static READER_EXPECTED_SYMBOL;
	private static DISPATCHER_UNKNOWN_COMMAND;
	private static DISPATCHER_UNKNOWN_ARGUMENT;
	private static DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR;
	private static DISPATCHER_PARSE_EXCEPTION;
}
declare class StringReader implements ImmutableStringReader {
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
declare class StringRange {
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
declare class Suggestion {
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
declare class Suggestions {
	getRange(): StringRange;
	getList(): Array<Suggestion>;
	isEmpty(): boolean;
	equals(o: any): boolean;
	toString(): String;
	static empty(): Promise<Suggestions>;
	static merge(command: string, input: Array<Suggestions>): Suggestions;
	static create(command: string, suggestions: Array<Suggestion>): Suggestions;
}
declare class IntegerSuggestion extends Suggestion {
	getValue(): number;
	equals(o: any): boolean;
	toString(): String;
	compareTo(o: Suggestion): number;
	compareToIgnoreCase(b: Suggestion): number;
}
declare class SuggestionsBuilder {
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
declare class RootCommandNode<S> extends CommandNode<S> {
	getNodeType(): string;
	getName(): string;
	getUsageText(): string;
	parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
	listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
	isValidInput(input: String): boolean;
	equals(o: any): boolean;
	createBuilder(): ArgumentBuilder<S, any>;
	getSortedKey(): string;
	getExamples(): IterableIterator<string>;
	toString(): string;
}
declare class ParsedArgument<S, T> {
	constructor(start: number, end: number, result: T);
	getRange(): StringRange;
	getResult(): T;
	equals(o: any): boolean;
}
declare class ParsedCommandNode<S> {
	constructor(node: CommandNode<S>, range: StringRange);
	getNode(): CommandNode<S>;
	getRange(): StringRange;
	toString(): String;
	equals(o: any): boolean;
}
declare class CommandContext<S> {
	constructor(source: S, input: string, args: Map<String, ParsedArgument<S, any>>, command: Command<S>, rootNode: CommandNode<S>, nodes: Array<ParsedCommandNode<S>>, range: StringRange, child: CommandContext<S>, modifier: RedirectModifier<S>, forks: boolean);
	copyFor(source: S): CommandContext<S>;
	getChild(): CommandContext<S>;
	getLastChild(): CommandContext<S>;
	getCommand(): Command<S>;
	getSource(): S;
	getArgument(name: string, clazz: any): any;
	equals(o: any): boolean;
	getRedirectModifier(): RedirectModifier<S>;
	getRange(): StringRange;
	getInput(): string;
	getRootNode(): CommandNode<S>;
	getNodes(): Array<ParsedCommandNode<S>>;
	hasNodes(): boolean;
	isForked(): boolean;
}
declare class SuggestionContext<S> {
	constructor(parent: CommandNode<S>, startPos: number);
}
declare class CommandContextBuilder<S> {
	constructor(dispatcher: CommandDispatcher<S>, source: S, rootNode: CommandNode<S>, start: number);
	withSource(source: S): CommandContextBuilder<S>;
	getSource(): S;
	getRootNode(): CommandNode<S>;
	withArgument(name: String, argument: ParsedArgument<S, any>): CommandContextBuilder<S>;
	getArguments(): Map<String, ParsedArgument<S, any>>;
	withCommand(command: Command<S>): CommandContextBuilder<S>;
	withNode(node: CommandNode<S>, range: StringRange): CommandContextBuilder<S>;
	copy(): CommandContextBuilder<S>;
	withChild(child: CommandContextBuilder<S>): CommandContextBuilder<S>;
	getChild(): CommandContextBuilder<S>;
	getLastChild(): CommandContextBuilder<S>;
	getCommand(): Command<S>;
	getNodes(): Array<ParsedCommandNode<S>>;
	build(input: string): CommandContext<S>;
	getDispatcher(): CommandDispatcher<S>;
	getRange(): StringRange;
	findSuggestionContext(cursor: number): SuggestionContext<S>;
}
declare class ParseResults<S> {
	constructor(context: CommandContextBuilder<S>, reader: ImmutableStringReader, exceptions: Map<CommandNode<S>, CommandSyntaxException>);
	getContext(): CommandContextBuilder<S>;
	getReader(): ImmutableStringReader;
	getExceptions(): Map<CommandNode<S>, CommandSyntaxException>;
}
declare interface ResultConsumer<S> {
    onCommandComplete(context: CommandContext<S>, success: boolean, result: number): void;
}
declare class LiteralCommandNode<S> extends CommandNode<S> {
	constructor(literal: string, command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean);
	getNodeType(): string;
	getLiteral(): string;
	getName(): string;
	parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
	listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
	isValidInput(input: string): boolean;
	equals(o: any): boolean;
	getUsageText(): string;
	createBuilder(): LiteralArgumentBuilder<S>;
	getSortedKey(): string;
	getExamples(): IterableIterator<string>;
	toString(): string;
}
declare class LiteralArgumentBuilder<S> extends ArgumentBuilder<S, LiteralArgumentBuilder<S>> {
	constructor(literal: string);
	getThis(): LiteralArgumentBuilder<S>;
	getLiteral(): string;
	build(): LiteralCommandNode<S>;
}
declare class BoolArgumentType implements ArgumentType<boolean> {
	static getBool(context: CommandContext<any>, name: string): boolean;
	parse(reader: StringReader): boolean;
	listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
	getExamples(): IterableIterator<string>;
}
declare class IntegerArgumentType implements ArgumentType<number> {	
	static getInteger(context: CommandContext<any>, name: string): number;
	getMinimum(): number;
	getMaximum(): number;
	parse(reader: StringReader): number;
	equals(o: any): boolean;
	toString(): string;
	listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
	getExamples(): IterableIterator<string>;
}
declare class FloatArgumentType implements ArgumentType<number> {	    
	static getFloat(context: CommandContext<any>, name: string): number;
	getMinimum(): number;
	getMaximum(): number;
	parse(reader: StringReader): number;
	equals(o: any): boolean;
	toString(): string;
	listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
	getExamples(): IterableIterator<string>;
}
declare enum StringType {
	SINGLE_WORD = "words_with_underscores",
	QUOTABLE_PHRASE = "\"quoted phrase\"",
	GREEDY_PHRASE = "words with spaces"
}
declare class StringArgumentType implements ArgumentType<string> {	
	static getString(context: CommandContext<any>, name: string): string;
	getType(): StringType;
	parse(reader: StringReader): string;
	toString(): string;
	listSuggestions(context: CommandContext<any>, builder: SuggestionsBuilder): Promise<Suggestions>;
	getExamples(): IterableIterator<string>;
	static escapeIfRequired(input: string): String;
	private static escape;
}
declare class ArgumentCommandNode<S, T> extends CommandNode<S> {
	constructor(name: string, type: ArgumentType<T>, command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean, customSuggestions: SuggestionProvider<S>);
	getNodeType(): string;
	getType(): ArgumentType<T>;
	getName(): string;
	getUsageText(): string;
	getCustomSuggestions(): SuggestionProvider<S>;
	parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
	listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
	createBuilder(): RequiredArgumentBuilder<S, T>;
	isValidInput(input: string): boolean;
	equals(o: any): boolean;
	getSortedKey(): string;
	getExamples(): IterableIterator<string>;
	toString(): string;
}
declare class RequiredArgumentBuilder<S, T> extends ArgumentBuilder<S, RequiredArgumentBuilder<S, T>> {
	private name;
	private type;
	private suggestionsProvider;
	private constructor();	
	suggests(provider: SuggestionProvider<S>): RequiredArgumentBuilder<S, T>;
	getSuggestionsProvider(): SuggestionProvider<S>;
	getThis(): RequiredArgumentBuilder<S, T>;
	getType(): ArgumentType<T>;
	getName(): string;
	build(): ArgumentCommandNode<S, T>;
}
export function bool(): BoolArgumentType;
export function integer(min?: number, max?: number): IntegerArgumentType;
export function float(min?: number, max?: number): FloatArgumentType;
export declare function word(): StringArgumentType;
export declare function string(): StringArgumentType;
export declare function greedyString(): StringArgumentType;
export declare function literal<S>(name: string): LiteralArgumentBuilder<S>;
export declare function argument<S, T>(name: string, type: ArgumentType<T>): RequiredArgumentBuilder<S, T>;
/**
 * The core command dispatcher, for registering, parsing, and executing commands.
 *
 * @param <S> a custom "source" type, such as a user or originator of a command
 */
export declare class CommandDispatcher<S> {
	
    /**
     * Create a new {@link CommandDispatcher} with the specified root node.
     *
     * <p>This is often useful to copy existing or pre-defined command trees.</p>
     *
     * @param root the existing {@link RootCommandNode} to use as the basis for this tree
     */
    constructor(root?: RootCommandNode<S>)

    /**
     * Utility method for registering new commands.
     *
     * <p>This is a shortcut for calling {@link RootCommandNode#addChild(CommandNode)} after building the provided {@code command}.</p>
     *
     * <p>As {@link RootCommandNode} can only hold literals, this method will only allow literal arguments.</p>
     *
     * @param command a literal argument builder to add to this command tree
     * @return the node added to this tree
     */
    public register(command: LiteralArgumentBuilder<S>): LiteralCommandNode<S>

    /**
     * Sets a callback to be informed of the result of every command.
     *
     * @param consumer the new result consumer to be called
     */
    public setConsumer(consumer: ResultConsumer<S>): void

    /**
     * Parses and executes a given command.    
     *
     * <p>It is recommended to parse and execute as separate steps, as parsing is often the most expensive step, and easiest to cache.</p>
     *
     * <p>If this command returns a value, then it successfully executed something. If it could not parse the command, or the execution was a failure,
     * then an exception will be thrown. Most exceptions will be of type {@link CommandSyntaxException}, but it is possible that a {@link RuntimeException}
     * may bubble up from the result of a command. The meaning behind the returned result is arbitrary, and will depend
     * entirely on what command was performed.</p>
     *
     * <p>If the command passes through a node that is {@link CommandNode#isFork()} then it will be 'forked'.
     * A forked command will not bubble up any {@link CommandSyntaxException}s, and the 'result' returned will turn into
     * 'amount of successful commands executes'.</p>
     *
     * <p>After each and any command is ran, a registered callback given to {@link #setConsumer(ResultConsumer)}
     * will be notified of the result and success of the command. You can use that method to gather more meaningful
     * results than this method will return, especially when a command forks.</p>
     *
     * @param input a command string to parse &amp execute
     * @param source a custom "source" object, usually representing the originator of this command
     * @return a numeric result from a "command" that was performed
     * @throws CommandSyntaxException if the command failed to parse or execute
     * @throws RuntimeException if the command failed to execute and was not handled gracefully
     * @see #parse(String, Object)
     * @see #parse(StringReader, Object)
     * @see #execute(ParseResults)
     * @see #execute(StringReader, Object)
     */
    public execute(input: string | StringReader, source: S): number    
    public execute(input: ParseResults<S>): number

    /**
     * Parses a given command.
     *
     * <p>The result of this method can be cached, and it is advised to do so where appropriate. Parsing is often the
     * most expensive step, and this allows you to essentially "precompile" a command if it will be ran often.</p>
     *
     * <p>If the command passes through a node that is {@link CommandNode#isFork()} then the resulting context will be marked as 'forked'.
     * Forked contexts may contain child contexts, which may be modified by the {@link RedirectModifier} attached to the fork.</p>
     *
     * <p>Parsing a command can never fail, you will always be provided with a new {@link ParseResults}.
     * However, that does not mean that it will always parse into a valid command. You should inspect the returned results
     * to check for validity. If its {@link ParseResults#getReader()} {@link StringReader#canRead()} then it did not finish
     * parsing successfully. You can use that position as an indicator to the user where the command stopped being valid.
     * You may inspect {@link ParseResults#getExceptions()} if you know the parse failed, as it will explain why it could
     * not find any valid commands. It may contain multiple exceptions, one for each "potential node" that it could have visited,
     * explaining why it did not go down that node.</p>
     *
     * <p>When you eventually call {@link #execute(ParseResults)} with the result of this method, the above error checking
     * will occur. You only need to inspect it yourself if you wish to handle that yourself.</p>
     *
     * @param command a command string to parse
     * @param source a custom "source" object, usually representing the originator of this command
     * @return the result of parsing this command
     * @see #parse(StringReader, Object)
     * @see #execute(ParseResults)
     * @see #execute(String, Object)
     */
    public parse(command: string | StringReader, source: S): ParseResults<S>

    /**
     * Gets all possible executable commands following the given node.
     *
     * <p>You may use {@link #getRoot()} as a target to get all usage data for the entire command tree.</p>
     *
     * <p>The returned syntax will be in "simple" form: {@code <param>} and {@code literal}. "Optional" nodes will be
     * listed as multiple entries: the parent node, and the child nodes.
     * For example, a required literal "foo" followed by an optional param "int" will be two nodes:</p>
     * <ul>
     *     <li>{@code foo}</li>
     *     <li>{@code foo <int>}</li>
     * </ul>
     *
     * <p>The path to the specified node will <b>not</b> be prepended to the output, as there can theoretically be many
     * ways to reach a given node. It will only give you paths relative to the specified node, not absolute from root.</p>
     *
     * @param node target node to get child usage strings for
     * @param source a custom "source" object, usually representing the originator of this command
     * @param restricted if true, commands that the {@code source} cannot access will not be mentioned
     * @return array of full usage strings under the target node
     */
    public getAllUsage(node: CommandNode<S>, source: S, restricted: boolean): string[]

    /**
     * Gets the possible executable commands from a specified node.
     *
     * <p>You may use {@link #getRoot()} as a target to get usage data for the entire command tree.</p>
     *
     * <p>The returned syntax will be in "smart" form: {@code <param>}, {@code literal}, {@code [optional]} and {@code (either|or)}.
     * These forms may be mixed and matched to provide as much information about the child nodes as it can, without being too verbose.
     * For example, a required literal "foo" followed by an optional param "int" can be compressed into one string:</p>
     * <ul>
     *     <li>{@code foo [<int>]}</li>
     * </ul>
     *
     * <p>The path to the specified node will <b>not</b> be prepended to the output, as there can theoretically be many
     * ways to reach a given node. It will only give you paths relative to the specified node, not absolute from root.</p>
     *
     * <p>The returned usage will be restricted to only commands that the provided {@code source} can use.</p>
     *
     * @param node target node to get child usage strings for
     * @param source a custom "source" object, usually representing the originator of this command
     * @return array of full usage strings under the target node
     */
    public getSmartUsage(node: CommandNode<S>, source: S): Map<CommandNode<S>, String>

    /**
     * Gets suggestions for a parsed input string on what comes next.
     *
     * <p>As it is ultimately up to custom argument types to provide suggestions, it may be an asynchronous operation,
     * for example getting in-game data or player names etc. As such, this method returns a future and no guarantees
     * are made to when or how the future completes.</p>
     *
     * <p>The suggestions provided will be in the context of the end of the parsed input string, but may suggest
     * new or replacement strings for earlier in the input string. For example, if the end of the string was
     * {@code foobar} but an argument preferred it to be {@code minecraft:foobar}, it will suggest a replacement for that
     * whole segment of the input.</p>
     *
     * @param parse the result of a {@link #parse(StringReader, Object)}
     * @return a future that will eventually resolve into a {@link Suggestions} object
     */
    public getCompletionSuggestions(parse: ParseResults<S>): Promise<Suggestions>

    /**
     * Gets the root of this command tree.
     *
     * <p>This is often useful as a target of a {@link com.mojang.brigadier.builder.ArgumentBuilder#redirect(CommandNode)},
     * {@link #getAllUsage(CommandNode, Object, boolean)} or {@link #getSmartUsage(CommandNode, Object)}.
     * You may also use it to clone the command tree via {@link #CommandDispatcher(RootCommandNode)}.</p>
     *
     * @return root of the command tree
     */
    public getRoot(): RootCommandNode<S>

    /**
     * Finds a valid path to a given node on the command tree.
     *
     * <p>There may theoretically be multiple paths to a node on the tree, especially with the use of forking or redirecting.
     * As such, this method makes no guarantees about which path it finds. It will not look at forks or redirects,
     * and find the first instance of the target node on the tree.</p>
     *
     * <p>The only guarantee made is that for the same command tree and the same version of this library, the result of
     * this method will <b>always</b> be a valid input for {@link #findNode(Array)}, which should return the same node
     * as provided to this method.</p>
     *
     * @param target the target node you are finding a path for
     * @return a path to the resulting node, or an empty list if it was not found
     */
    public getPath(target: CommandNode<S>): Array<String>

    /**
     * Finds a node by its path
     *
     * <p>Paths may be generated with {@link #getPath(CommandNode)}, and are guaranteed (for the same tree, and the
     * same version of this library) to always produce the same valid node by this method.</p>
     *
     * <p>If a node could not be found at the specified path, then {@code null} will be returned.</p>
     *
     * @param path a generated path to a node
     * @return the node at the given path, or null if not found
     */
    public findNode(path: Array<String>): CommandNode<S>

    /**
     * Scans the command tree for potential ambiguous commands.
     *
     * <p>This is a shortcut for {@link CommandNode#findAmbiguities(AmbiguityConsumer)} on {@link #getRoot()}.</p>
     *
     * <p>Ambiguities are detected by testing every {@link CommandNode#getExamples()} on one node verses every sibling
     * node. This is not fool proof, and relies a lot on the providers of the used argument types to give good examples.</p>
     *
     * @param consumer a callback to be notified of potential ambiguities
     */
    public findAmbiguities(consumer: AmbiguityConsumer<S>): void    
}

export declare let dispatcher: CommandDispatcher<object>;