"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = exports.toCamel = void 0;
const toCamel = (value) => {
    return value.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};
exports.toCamel = toCamel;
const isObject = function (o) {
    return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};
const toCamelCase = (data) => {
    if (isObject(data)) {
        const n = {};
        Object.keys(data).forEach((k) => {
            // @ts-ignore TODO: fix typing
            n[(0, exports.toCamel)(k)] = (0, exports.toCamelCase)(data[k]);
        });
        return n;
    }
    if (Array.isArray(data)) {
        // @ts-ignore TODO: difficult to type with recursive arrays
        return data.map((i) => {
            return (0, exports.toCamelCase)(i);
        });
    }
    return data;
};
exports.toCamelCase = toCamelCase;
