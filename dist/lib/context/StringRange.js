"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    static at(pos) {
        return new StringRange(pos, pos);
    }
    static between(start, end) {
        return new StringRange(start, end);
    }
    static encompassing(a, b) {
        return new StringRange(Math.min(a.getStart(), b.getStart()), Math.max(a.getEnd(), b.getEnd()));
    }
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
    get(str) {
        if (typeof str === "string")
            return str.substring(this.start, this.end);
        else
            return str.getString().substring(this.start, this.end);
    }
    isEmpty() {
        return this.start === this.end;
    }
    getLength() {
        return this.end - this.start;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof StringRange))
            return false;
        return this.start === o.start && this.end == o.end;
    }
    toString() {
        return "StringRange{" + "start=" + this.start + ", end=" + this.end + '}';
    }
}
exports.default = StringRange;
