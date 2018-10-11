"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Suggestion_1 = __importDefault(require("./Suggestion"));
class IntegerSuggestion extends Suggestion_1.default {
    constructor(range, value, tooltip = null) {
        super(range, value.toString(), tooltip);
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof IntegerSuggestion))
            return false;
        return this.value == o.value && super.equals(o);
    }
    // public hashCode(): number {
    //     return Objects.hash(super.hashCode(), this.value);
    // }
    toString() {
        return "IntegerSuggestion{" +
            "value=" + this.value +
            ", range=" + this.getRange() +
            ", text='" + this.getText() + '\'' +
            ", tooltip='" + this.getTooltip() + '\'' +
            '}';
    }
    compareTo(o) {
        if (o instanceof IntegerSuggestion) {
            return this.value < o.value ? 1 : -1;
        }
        return super.compareTo(o);
    }
    compareToIgnoreCase(b) {
        return this.compareTo(b);
    }
}
exports.default = IntegerSuggestion;
