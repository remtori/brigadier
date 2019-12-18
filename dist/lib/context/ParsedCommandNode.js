"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParsedCommandNode {
    constructor(node, range) {
        this.node = node;
        this.range = range;
    }
    getNode() {
        return this.node;
    }
    getRange() {
        return this.range;
    }
    toString() {
        return this.node + "@" + this.range;
    }
    equals(o) {
        if (this === o)
            return true;
        if (o == null || !(o instanceof ParsedCommandNode)) {
            return false;
        }
        return this.node.equals(o.node) && this.range.equals(o.range);
    }
}
exports.default = ParsedCommandNode;
