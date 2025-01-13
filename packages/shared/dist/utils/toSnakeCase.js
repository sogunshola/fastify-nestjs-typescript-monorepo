"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSnakeCase = exports.toSnake = void 0;
const toSnake = (value) => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
};
exports.toSnake = toSnake;
const isObject = function (o) {
    return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};
const toSnakeCase = (data) => {
    if (isObject(data)) {
        const n = {};
        Object.keys(data).forEach((k) => {
            // @ts-ignore TODO: fix typing
            n[(0, exports.toSnake)(k)] = (0, exports.toSnakeCase)(data[k]);
        });
        return n;
    }
    if (Array.isArray(data)) {
        // @ts-ignore TODO: difficult to type with recursive arrays
        return data.map((i) => {
            return (0, exports.toSnakeCase)(i);
        });
    }
    return data;
};
exports.toSnakeCase = toSnakeCase;
