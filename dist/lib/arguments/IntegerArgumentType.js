"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandSyntaxException_1 = __importDefault(require("../exceptions/CommandSyntaxException"));
const EXAMPLES = ["0", "123", "-123"];
class IntegerArgumentType {
    constructor(minimum, maximum) {
        this.minimum = minimum;
        this.maximum = maximum;
    }
    static integer(min = -Infinity, max = Infinity) {
        return new IntegerArgumentType(min, max);
    }
    static getInteger(context, name) {
        return context.getArgument(name, 0 /* Int */);
    }
    getMinimum() {
        return this.minimum;
    }
    getMaximum() {
        return this.maximum;
    }
    parse(reader) {
        let start = reader.getCursor();
        let result = reader.readInt();
        if (result < this.minimum) {
            reader.setCursor(start);
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.integerTooLow().createWithContext(reader, result, this.minimum);
        }
        if (result > this.maximum) {
            reader.setCursor(start);
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.integerTooHigh().createWithContext(reader, result, this.maximum);
        }
        return result;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof IntegerArgumentType))
            return false;
        return this.maximum == o.maximum && this.minimum == o.minimum;
    }
    toString() {
        if (this.minimum === -Infinity && this.maximum === Infinity) {
            return "integer()";
        }
        else if (this.maximum == Infinity) {
            return "integer(" + this.minimum + ")";
        }
        else {
            return "integer(" + this.minimum + ", " + this.maximum + ")";
        }
    }
    getExamples() {
        return EXAMPLES;
    }
}
exports.default = IntegerArgumentType;
