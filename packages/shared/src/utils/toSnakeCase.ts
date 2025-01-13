type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : '';

export type Snakify<T> = {
  [K in keyof T as SnakeCase<string & K>]: T[K] extends Array<infer U>
    ? U extends object
      ? Array<Snakify<U>>
      : T[K]
    : T[K] extends object
    ? Snakify<T[K]>
    : T[K];
};

export const toSnake = (value: string) => {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
};

const isObject = function (o: object) {
  return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};

export const toSnakeCase = <T extends object>(data: T): Snakify<T> => {
  if (isObject(data)) {
    const n: Record<string, unknown> = {};

    Object.keys(data).forEach((k) => {
      // @ts-ignore TODO: fix typing
      n[toSnake(k)] = toSnakeCase(data[k]);
    });

    return n as Snakify<T>;
  }

  if (Array.isArray(data)) {
    // @ts-ignore TODO: difficult to type with recursive arrays
    return data.map((i) => {
      return toSnakeCase(i);
    });
  }

  return data as Snakify<T>;
};
