type SnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Uppercase<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}` : '';
export type Snakify<T> = {
    [K in keyof T as SnakeCase<string & K>]: T[K] extends Array<infer U> ? U extends object ? Array<Snakify<U>> : T[K] : T[K] extends object ? Snakify<T[K]> : T[K];
};
export declare const toSnake: (value: string) => string;
export declare const toSnakeCase: <T extends object>(data: T) => Snakify<T>;
export {};
//# sourceMappingURL=toSnakeCase.d.ts.map