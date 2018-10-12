"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual_1 = __importDefault(require("../util/isEqual"));
class Suggestion {
    constructor(range, text, tooltip = null) {
        this.range = range;
        this.text = text;
        this.tooltip = tooltip;
    }
    getRange() {
        return this.range;
    }
    getText() {
        return this.text;
    }
    getTooltip() {
        return this.tooltip;
    }
    apply(input) {
        if (this.range.getStart() === 0 && this.range.getEnd() == input.length) {
            return this.text;
        }
        let result = "";
        if (this.range.getStart() > 0) {
            result += input.substring(0, this.range.getStart());
        }
        result += this.text;
        if (this.range.getEnd() < input.length) {
            result += input.substring(this.range.getEnd());
        }
        return result;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof Suggestion))
            return false;
        return isEqual_1.default(this.range, o.range) && (this.text === o.text) && isEqual_1.default(this.tooltip, o.tooltip);
    }
    toString() {
        return "Suggestion{" +
            "range=" + this.range +
            ", text='" + this.text + '\'' +
            ", tooltip='" + this.tooltip + '\'' +
            '}';
    }
    compareTo(o) {
        return this.text < o.text ? 1 : -1;
    }
    compareToIgnoreCase(b) {
        return this.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1;
    }
    expand(command, range) {
        if (range.equals(this.range)) {
            return this;
        }
        let result = "";
        if (range.getStart() < this.range.getStart()) {
            result += command.substring(range.getStart(), this.range.getStart());
        }
        result += this.text;
        if (range.getEnd() > this.range.getEnd()) {
            result += command.substring(this.range.getEnd(), range.getEnd());
        }
        return new Suggestion(range, result, this.tooltip);
    }
}
exports.default = Suggestion;
