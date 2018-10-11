import isEqual from "../util/isEqual"
import Primitive from "../Primitive"
import Command from "../Command"
import RedirectModifier from "../RedirectModifier"
import CommandNode from "../tree/CommandNode"
import StringRange from "./StringRange"
import ParsedArgument from "./ParsedArgument"
import ParsedCommandNode from "./ParsedCommandNode"
import ArgumentType from "../arguments/ArgumentType"

const PRIMITIVE_TO_WRAPPER = new Map<Primitive, Function>();
PRIMITIVE_TO_WRAPPER.set(Primitive.Int, v => parseInt(v));
PRIMITIVE_TO_WRAPPER.set(Primitive.Float, v => parseFloat(v));
PRIMITIVE_TO_WRAPPER.set(Primitive.Boolean, v => v == true); // == is used intentionally here 
PRIMITIVE_TO_WRAPPER.set(Primitive.String, v => v.toString());

export default class CommandContext<S> {    
	
	private source: S;
	private input: string;
	private command: Command<S>;
	private args: Map<String, ParsedArgument<S, any>>;
	private rootNode: CommandNode<S>;
	private nodes: Array<ParsedCommandNode<S>>;
	private range: StringRange;
	private child: CommandContext<S>;
	private modifier: RedirectModifier<S>;
	private forks: boolean;

    public constructor (source: S, input: string, args: Map<String, ParsedArgument<S, any>>, command: Command<S>, rootNode: CommandNode<S>, nodes: Array<ParsedCommandNode<S>>, range: StringRange, child: CommandContext<S>, modifier: RedirectModifier<S>, forks: boolean) {
        this.source = source;
        this.input = input;
        this.args = args;
        this.command = command;
        this.rootNode = rootNode;
        this.nodes = nodes;
        this.range = range;
        this.child = child;
        this.modifier = modifier;
        this.forks = forks;
    }

    public copyFor(source: S): CommandContext<S> {
        if (this.source === source)
            return this;
        
        return new CommandContext<S>(source, this.input, this.args, this.command, this.rootNode, this.nodes, this.range, this.child, this.modifier, this.forks);
    }

    public getChild(): CommandContext<S> {
        return this.child;
    }

    public getLastChild(): CommandContext<S> {
        let result: CommandContext<S> = this;
        while (!(result.getChild() == null)) {
            result = result.getChild();
        }
        return result;
    }

    public getCommand(): Command<S> {
        return this.command;
    }

    public getSource(): S {
        return this.source;
    }

    public getArgument(name: string, clazz: any): any {
        const arg: ParsedArgument<S, any> = this.args.get(name);

        if (arg == null) {
            throw new Error("No such argument '" + name + "' exists on this command");
        }

		const result = arg.getResult();
		if (clazz == null) {
			return result;
		} else if (PRIMITIVE_TO_WRAPPER.has(clazz)) {
            return PRIMITIVE_TO_WRAPPER.get(clazz)(result);
		} else {
			try {
				if (result instanceof clazz)
					return result;			
			} catch(ignore) {
				throw new Error("Invail Type: " + clazz.toString());
			}
		}
    }

    public equals(o): boolean {
        if (this === o) return true;
        if (!(o instanceof CommandContext)) return false;

        if (!isEqual(this.args, o.args)) return false;
        if (!this.rootNode.equals(o.rootNode)) return false;
        if (this.nodes.length != o.nodes.length || !isEqual(this.nodes, o.nodes)) return false;
        if (!(this.command == null) ? !isEqual(this.command, o.command) : o.command != null) return false;
        if (!isEqual(this.source, o.source)) return false;
        if (!(this.child == null) ? !this.child.equals(o.child) : o.child != null) return false;

        return true;
    }

    // public int hashCode() {
    //     int result = source.hashCode();
    //     result = 31 * result + arguments.hashCode();
    //     result = 31 * result + (command != null ? command.hashCode() : 0);
    //     result = 31 * result + rootNode.hashCode();
    //     result = 31 * result + nodes.hashCode();
    //     result = 31 * result + (child != null ? child.hashCode() : 0);
    //     return result;
    // }

    public getRedirectModifier(): RedirectModifier<S> {
        return this.modifier;
    }

    public getRange(): StringRange {
        return this.range;
    }

    public getInput(): string {
        return this.input;
    }

    public getRootNode(): CommandNode<S> {
        return this.rootNode;
    }

    public getNodes(): Array<ParsedCommandNode<S>> {
        return this.nodes;
    }

    public hasNodes(): boolean {
        return this.nodes.length >= 0
    }

    public isForked(): boolean {
        return this.forks;
    }
}
