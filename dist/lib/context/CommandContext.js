"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("../util/isEqual"));
const PRIMITIVE_TO_WRAPPER = new Map();
PRIMITIVE_TO_WRAPPER.set(0 /* Int */, v => parseInt(v));
PRIMITIVE_TO_WRAPPER.set(1 /* Float */, v => parseFloat(v));
PRIMITIVE_TO_WRAPPER.set(2 /* Boolean */, v => v == true); // == is used intentionally here 
PRIMITIVE_TO_WRAPPER.set(3 /* String */, v => v.toString());
class CommandContext {
    constructor(source, input, args, command, rootNode, nodes, range, child, modifier, forks) {
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
    copyFor(source) {
        if (this.source === source)
            return this;
        return new CommandContext(source, this.input, this.args, this.command, this.rootNode, this.nodes, this.range, this.child, this.modifier, this.forks);
    }
    getChild() {
        return this.child;
    }
    getLastChild() {
        let result = this;
        while (!(result.getChild() == null)) {
            result = result.getChild();
        }
        return result;
    }
    getCommand() {
        return this.command;
    }
    getSource() {
        return this.source;
    }
    getArgument(name, clazz) {
        const arg = this.args.get(name);
        if (arg == null) {
            throw new Error("No such argument '" + name + "' exists on this command");
		}		
		const result = arg.getResult();
        if (PRIMITIVE_TO_WRAPPER.has(clazz)) {
            return PRIMITIVE_TO_WRAPPER.get(clazz)(result);
        }
        else if (result instanceof clazz) {
            return result;
        }
        else {
            throw new Error("Invail Type");
        }
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof CommandContext))
            return false;
        if (!isEqual_1.default(this.args, o.args))
            return false;
        if (!this.rootNode.equals(o.rootNode))
            return false;
        if (this.nodes.length != o.nodes.length || !isEqual_1.default(this.nodes, o.nodes))
            return false;
        if (!(this.command == null) ? !isEqual_1.default(this.command, o.command) : o.command != null)
            return false;
        if (!isEqual_1.default(this.source, o.source))
            return false;
        if (!(this.child == null) ? !this.child.equals(o.child) : o.child != null)
            return false;
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
    getRedirectModifier() {
        return this.modifier;
    }
    getRange() {
        return this.range;
    }
    getInput() {
        return this.input;
    }
    getRootNode() {
        return this.rootNode;
    }
    getNodes() {
        return this.nodes;
    }
    hasNodes() {
        return this.nodes.length >= 0;
    }
    isForked() {
        return this.forks;
    }
}
exports.default = CommandContext;
