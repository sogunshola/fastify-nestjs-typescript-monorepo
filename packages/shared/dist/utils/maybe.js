"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybe = maybe;
function maybe(value, transform) {
    if (value == null) {
        return undefined;
    }
    if (transform) {
        return transform(value);
    }
    return value;
}
