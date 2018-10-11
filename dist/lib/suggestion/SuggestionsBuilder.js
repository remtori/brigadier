"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringRange_1 = __importDefault(require("../context/StringRange"));
const Suggestion_1 = __importDefault(require("./Suggestion"));
const Suggestions_1 = __importDefault(require("./Suggestions"));
const IntegerSuggestion_1 = __importDefault(require("./IntegerSuggestion"));
class SuggestionsBuilder {
    constructor(input, start) {
        this.result = [];
        this.input = input;
        this.start = start;
        this.remaining = input.substring(start);
    }
    getInput() {
        return this.input;
    }
    getStart() {
        return this.start;
    }
    getRemaining() {
        return this.remaining;
    }
    build() {
        return Suggestions_1.default.create(this.input, this.result);
    }
    buildPromise() {
        return Promise.resolve(this.build());
    }
    suggest(text, tooltip = null) {
        if (typeof text === "number") {
            this.result.push(new IntegerSuggestion_1.default(StringRange_1.default.between(this.start, this.input.length), text, tooltip));
            return this;
        }
        if (text === this.remaining)
            return this;
        this.result.push(new Suggestion_1.default(StringRange_1.default.between(this.start, this.input.length), text, tooltip));
        return this;
    }
    add(other) {
        this.result.push(...other.result);
        return this;
    }
    createOffset(start) {
        return new SuggestionsBuilder(this.input, this.start);
    }
    restart() {
        return new SuggestionsBuilder(this.input, this.start);
    }
}
exports.default = SuggestionsBuilder;
