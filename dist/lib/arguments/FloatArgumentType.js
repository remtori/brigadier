"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandSyntaxException_1 = __importDefault(require("../exceptions/CommandSyntaxException"));
const Suggestions_1 = __importDefault(require("../suggestion/Suggestions"));
const EXAMPLES = ["0", "1.2", ".5", "-1", "-.5", "-1234.56"];
class FloatArgumentType {
    constructor(minimum, maximum) {
        this.minimum = minimum;
        this.maximum = maximum;
    }
    static float(min = -Infinity, max = Infinity) {
        return new FloatArgumentType(min, max);
    }
    static getFloat(context, name) {
        return context.getArgument(name, 1 /* Float */);
    }
    getMinimum() {
        return this.minimum;
    }
    getMaximum() {
        return this.maximum;
    }
    parse(reader) {
        let start = reader.getCursor();
        let result = reader.readFloat();
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
        if (!(o instanceof FloatArgumentType))
            return false;
        return this.maximum == o.maximum && this.minimum == o.minimum;
    }
    toString() {
        if (this.minimum === -Infinity && this.maximum === Infinity) {
            return "float()";
        }
        else if (this.maximum == Infinity) {
            return "float(" + this.minimum + ")";
        }
        else {
            return "float(" + this.minimum + ", " + this.maximum + ")";
        }
    }
    listSuggestions(context, builder) {
        return Suggestions_1.default.empty();
    }
    ;
    getExamples() {
        return EXAMPLES;
    }
}
exports.default = FloatArgumentType;
