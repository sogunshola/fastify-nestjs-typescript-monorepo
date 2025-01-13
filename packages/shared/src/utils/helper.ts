import slugify from 'slugify';
import { faker } from '@faker-js/faker';
import * as tokenGen from 'otp-generator';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import dayjs from 'dayjs';


interface SlugifyOptions {
  lower: boolean;
  replacement: string;
}

export class Helper {
  static faker = faker;
  static dayjs = dayjs;

  static async hash(string: string) {
    return bcrypt.hash(string, 10);
  }

  static async compare(original: string, existing: string): Promise<boolean> {
    return bcrypt.compare(original, existing);
  }

  static slugify(name: string, options?: SlugifyOptions) {
    if (options) {
      return slugify(name, options);
    }
    return slugify(name, { lower: true, replacement: '_' });
  }

  /** 
    @param letters number of letters
    @param numbers number of numbers
    @param either number of either letters or numbers
  */
  static randString(letters: number, numbers: number, either: number) {
    const chars = [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      '0123456789',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    ];

    return [letters, numbers, either]
      .map((len, i) => {
        return Array(len)
          .fill(chars[i])
          .map((x) => {
            return x[Math.floor(Math.random() * x.length)];
          })
          .join('');
      })
      .concat()
      .join('')
      .split('')
      .sort(() => {
        return 0.5 - Math.random();
      })
      .join('');
  }

  static generateToken(length = 6, options: Record<string, any> = {}) {
    return tokenGen.generate(length, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      ...options,
    });
  }

  static numberWithCommas(x: number | string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static cleanQuery(value: string) {
    if (!value) {
      return null;
    }
    if (value === '') {
      return null;
    }
    return value;
  }

  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  }

  static isEmail(text: string): boolean {
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    return regexExp.test(text);
  }

  static moneyFormat(amount: number, currency = 'NGN'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  }

  static getCurrencySymbol(currency: 'NGN' | 'USD' | 'GBP' | 'EUR'): string {
    const currencies = {
      NGN: '₦',
      USD: '$',
      GBP: '£',
      EUR: '€',
    };
    return currencies[currency];
  }

  static formatDate(date: Date, format = 'YYYY-MM-DD') {
    return dayjs(date).format(format);
  }

  static removeEmptyObjValues(obj: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
  }

  static removeEmptyObjKeysOrValues(obj: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => k && v));
  }
}
