import isEqual from "../util/isEqual"
import Predicate from "../Predicate"
import AmbiguityConsumer from "../AmbiguityConsumer"
import Command from "../Command"
import RedirectModifier from "../RedirectModifier"
import StringReader from "../StringReader"
import ArgumentBuilder from "../builder/ArgumentBuilder"
import CommandContext from "../context/CommandContext"
import CommandContextBuilder from "../context/CommandContextBuilder"
import Suggestions from "../suggestion/Suggestions"
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder"

abstract class CommandNode<S> {
    
    private children: Map<string, CommandNode<S>> = new Map();
    
    private literals: Map<string, any> = new Map();
    
    private args: Map<string, any> = new Map();
    
    private requirement: Predicate<S>;
    
    private redirect: CommandNode<S>;
    
    private modifier: RedirectModifier<S>;
    
    private forks: boolean;
    
	private command: Command<S>;
	
	public abstract getNodeType(): string;
    
    public constructor (command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean) {
        this.command = command;
        this.requirement = requirement || (() => true);
        this.redirect = redirect;
        this.modifier = modifier;
        this.forks = forks;
    }
    
    public getCommand(): Command<S> {
        return this.command;
    }
    
    public getChildren(): IterableIterator<CommandNode<S>> {
        return this.children.values();
	}
	
	public getChildrenCount(): number {
		return this.children.size;
	}
    
    public getChild(name: string): CommandNode<S> {
        return this.children.get(name);
    }
    
    public getRedirect(): CommandNode<S> {
        return this.redirect;
    }
    
    public getRedirectModifier(): RedirectModifier<S> {
        return this.modifier;
    }
    
    public canUse(source: S): boolean {
        return this.requirement(source);
    }
    
    public addChild(node: CommandNode<S>) {
        if (node.getNodeType() === "root") {
            throw new Error("Cannot add a RootCommandNode as a child to any other CommandNode");
        }
        
        let child= this.children.get(node.getName());
        if (child != null) {
            //  We've found something to merge onto
            if ((node.getCommand() != null)) {
                child.command = node.getCommand();
            }
            
            for (let grandchild of node.getChildren()) {
                child.addChild(grandchild);
            }
            
        }
        else {
            this.children.set(node.getName(), node);
            if (node.getNodeType() === "literal") {
                this.literals.set(node.getName(), node);
            }
            else if (node.getNodeType() === "argument") {
                this.args.set(node.getName(), node);
            }
            
        }
        
		this.children = new Map([...this.children.entries()].sort((a, b) => a[1].compareTo(b[1])))
    }
    
    public findAmbiguities(consumer: AmbiguityConsumer<S>) {
        let matches: Set<string> = new Set();
        for (let child of this.children.values()) {
            for (let sibling of this.children.values()) {
                if (child === sibling) {
                    continue;
                }
                
                for (let input of child.getExamples()) {
                    if (sibling.isValidInput(input)) {
                        matches.add(input);
                    }                    
                }
                
                if (matches.size > 0) {
                    consumer.ambiguous(this, child, sibling, matches.values());
                    matches = new Set();
                }
                
            }
            
            child.findAmbiguities(consumer);
        }
        
    }
    
    public abstract isValidInput(input: string): boolean;
    
    public equals(o): boolean {
        if (this === o) return true;
        if (!(o instanceof CommandNode)) return false;

		if (this.children.size !== o.children.size) {
			return false;
		}
		
		if (!isEqual(this.children, o.children)) return false;

		if (this.command != null ? !isEqual(this.command, o.command) : o.command != null) 
			return false;

        return true;
    }
    
    // public hashCode(): number {
    //     return 31 * this.children.hashCode() + (this.command != null ? this.command.hashCode() : 0);
    // }
    
    public getRequirement() {
        return this.requirement;
    }
    
    public abstract getName(): string;
    
    public abstract getUsageText(): string;
    
    public abstract parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
    
    public abstract listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
    
    public abstract createBuilder(): ArgumentBuilder<S, any>;
    
    public abstract getSortedKey(): string;
    
    public getRelevantNodes(input: StringReader): Iterable<CommandNode<S>> {
        if (this.literals.size > 0) {
            let cursor: number = input.getCursor();
            while ((input.canRead() 
                        && (input.peek() != ' '))) {
                input.skip();
            }
            
            let text = input.getString().substring(cursor, input.getCursor());
            input.setCursor(cursor);
            let literal = this.literals.get(text);
            if (literal != null) {
				return new Set([literal]).values();
            }
            else {
                return this.args.values();
            }
            
        }
        else {
            return this.args.values();
        }
        
    }
    
    public compareTo(o: CommandNode<S>): number {
		if (this.getNodeType() === o.getNodeType()) {
            return this.getSortedKey() > o.getSortedKey() ? 1 : -1;
        }

        return (o.getNodeType() === "literal") ? 1 : -1;
    }
    
    public isFork(): boolean {
        return this.forks;
    }
    
    public abstract getExamples(): Iterable<string>;
}

export default CommandNode;