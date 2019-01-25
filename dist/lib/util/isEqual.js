"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEqual(a, b) {
    if (a === b)
        return true;
    if (typeof a != typeof b)
        return false;
    if (!(a instanceof Object))
        return false;
    if (typeof a === "function")
        return a.toString() === b.toString();
    if (a.constructor !== b.constructor)
        return false;
    if (a instanceof Map)
        return isMapEqual(a, b);
    if (a instanceof Set)
        return isArrayEqual([...a], [...b]);
    if (a instanceof Array)
        return isArrayEqual(a, b);
    if (typeof a === "object")
        return isObjectEqual(a, b);
    return false;
}
exports.default = isEqual;
function isMapEqual(a, b) {
    if (a.size != b.size)
        return false;
    for (let [key, val] of a) {
        const testVal = b.get(key);
        if (!isEqual(testVal, val))
            return false;
        if (testVal === undefined && !b.has(key))
            return false;
    }
    return true;
}
function isArrayEqual(a, b) {
    if (a.length != b.length)
        return false;
    for (let i = 0; i < a.length; i++)
        if (!isEqual(a[i], b[i]))
            return false;
    return true;
}
function isObjectEqual(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length != bKeys.length)
        return false;
    if (!aKeys.every(key => b.hasOwnProperty(key)))
        return false;
    return aKeys.every((key) => {
        return isEqual(a[key], b[key]);
    });
}
;
