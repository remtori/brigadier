"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringRange_1 = __importDefault(require("./StringRange"));
const CommandContext_1 = __importDefault(require("./CommandContext"));
const SuggestionContext_1 = __importDefault(require("./SuggestionContext"));
const ParsedCommandNode_1 = __importDefault(require("./ParsedCommandNode"));
class CommandContextBuilder {
    constructor(dispatcher, source, rootNode, start) {
        this.args = new Map();
        this.nodes = [];
        this.modifier = null;
        this.rootNode = rootNode;
        this.dispatcher = dispatcher;
        this.source = source;
        this.range = StringRange_1.default.at(start);
    }
    withSource(source) {
        this.source = source;
        return this;
    }
    getSource() {
        return this.source;
    }
    getRootNode() {
        return this.rootNode;
    }
    withArgument(name, argument) {
        this.args.set(name, argument);
        return this;
    }
    getArguments() {
        return this.args;
    }
    withCommand(command) {
        this.command = command;
        return this;
    }
    withNode(node, range) {
        this.nodes.push(new ParsedCommandNode_1.default(node, range));
        this.range = StringRange_1.default.encompassing(this.range, range);
        this.modifier = node.getRedirectModifier();
        this.forks = node.isFork();
        return this;
    }
    copy() {
        const copy = new CommandContextBuilder(this.dispatcher, this.source, this.rootNode, this.range.getStart());
        copy.command = this.command;
        copy.args = new Map([...copy.args, ...this.args]);
        copy.nodes.push(...this.nodes);
        copy.child = this.child;
        copy.range = this.range;
        copy.forks = this.forks;
        return copy;
    }
    withChild(child) {
        this.child = child;
        return this;
    }
    getChild() {
        return this.child;
    }
    getLastChild() {
        let result = this;
        while (result.getChild() != null) {
            result = result.getChild();
        }
        return result;
    }
    getCommand() {
        return this.command;
    }
    getNodes() {
        return this.nodes;
    }
    build(input) {
        return new CommandContext_1.default(this.source, input, this.args, this.command, this.rootNode, this.nodes, this.range, this.child == null ? null : this.child.build(input), this.modifier, this.forks);
    }
    getDispatcher() {
        return this.dispatcher;
    }
    getRange() {
        return this.range;
    }
    findSuggestionContext(cursor) {
        if ((this.range.getStart() <= cursor)) {
            if ((this.range.getEnd() < cursor)) {
                if ((this.child != null)) {
                    return this.child.findSuggestionContext(cursor);
                }
                else if (this.nodes.length > 0) {
                    let last = this.nodes[this.nodes.length - 1];
                    return new SuggestionContext_1.default(last.getNode(), last.getRange().getEnd() + 1);
                }
                else {
                    return new SuggestionContext_1.default(this.rootNode, this.range.getStart());
                }
            }
            else {
                let prev = this.rootNode;
                for (let node of this.nodes) {
                    let nodeRange = node.getRange();
                    if (nodeRange.getStart() <= cursor && cursor <= nodeRange.getEnd()) {
                        return new SuggestionContext_1.default(prev, nodeRange.getStart());
                    }
                    prev = node.getNode();
                }
                if ((prev == null)) {
                    throw new Error("Can't find node before cursor");
                }
                return new SuggestionContext_1.default(prev, this.range.getStart());
            }
        }
        throw new Error("Can't find node before cursor");
    }
}
exports.default = CommandContextBuilder;
