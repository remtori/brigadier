"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("../util/isEqual"));
class CommandNode {
    constructor(command, requirement, redirect, modifier, forks) {
        this.children = new Map();
        this.literals = new Map();
        this.args = new Map();
        this.command = command;
        this.requirement = requirement || (() => true);
        this.redirect = redirect;
        this.modifier = modifier;
        this.forks = forks;
    }
    getCommand() {
        return this.command;
    }
    getChildren() {
        return this.children.values();
    }
    getChildrenCount() {
        return this.children.size;
    }
    getChild(name) {
        return this.children.get(name);
    }
    getRedirect() {
        return this.redirect;
    }
    getRedirectModifier() {
        return this.modifier;
    }
    canUse(source) {
        return this.requirement(source);
    }
    addChild(node) {
        if (node.getNodeType() === "root") {
            throw new Error("Cannot add a RootCommandNode as a child to any other CommandNode");
        }
        let child = this.children.get(node.getName());
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
        this.children = new Map([...this.children.entries()].sort((a, b) => a[1].compareTo(b[1])));
    }
    findAmbiguities(consumer) {
        let matches = new Set();
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
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof CommandNode))
            return false;
        if (this.children.size !== o.children.size) {
            return false;
        }
        if (!isEqual_1.default(this.children, o.children))
            return false;
        if (this.command != null ? !isEqual_1.default(this.command, o.command) : o.command != null)
            return false;
        return true;
    }
    // public hashCode(): number {
    //     return 31 * this.children.hashCode() + (this.command != null ? this.command.hashCode() : 0);
    // }
    getRequirement() {
        return this.requirement;
    }
    getRelevantNodes(input) {
        if (this.literals.size > 0) {
            let cursor = input.getCursor();
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
    compareTo(o) {
        if (this.getNodeType() === o.getNodeType()) {
            return this.getSortedKey() > o.getSortedKey() ? 1 : -1;
        }
        return (o.getNodeType() === "literal") ? 1 : -1;
    }
    isFork() {
        return this.forks;
    }
}
exports.default = CommandNode;
