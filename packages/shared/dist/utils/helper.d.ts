import dayjs from 'dayjs';
interface SlugifyOptions {
    lower: boolean;
    replacement: string;
}
export declare class Helper {
    static faker: import("@faker-js/faker").Faker;
    static dayjs: typeof dayjs;
    static hash(string: string): Promise<string>;
    static compare(original: string, existing: string): Promise<boolean>;
    static slugify(name: string, options?: SlugifyOptions): string;
    /**
      @param letters number of letters
      @param numbers number of numbers
      @param either number of either letters or numbers
    */
    static randString(letters: number, numbers: number, either: number): string;
    static generateToken(length?: number, options?: Record<string, any>): string;
    static numberWithCommas(x: number | string): string;
    static cleanQuery(value: string): string | null;
    static shuffleArray<T>(array: T[]): T[];
    static isEmail(text: string): boolean;
    static moneyFormat(amount: number, currency?: string): string;
    static getCurrencySymbol(currency: 'NGN' | 'USD' | 'GBP' | 'EUR'): string;
    static formatDate(date: Date, format?: string): string;
    static removeEmptyObjValues(obj: Record<string, unknown>): {
        [k: string]: unknown;
    };
    static removeEmptyObjKeysOrValues(obj: Record<string, unknown>): {
        [k: string]: unknown;
    };
}
export {};
//# sourceMappingURL=helper.d.ts.map