"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const slugify_1 = __importDefault(require("slugify"));
const faker_1 = require("@faker-js/faker");
const tokenGen = __importStar(require("otp-generator"));
const bcrypt = __importStar(require("bcryptjs"));
const dayjs_1 = __importDefault(require("dayjs"));
class Helper {
    static async hash(string) {
        return bcrypt.hash(string, 10);
    }
    static async compare(original, existing) {
        return bcrypt.compare(original, existing);
    }
    static slugify(name, options) {
        if (options) {
            return (0, slugify_1.default)(name, options);
        }
        return (0, slugify_1.default)(name, { lower: true, replacement: '_' });
    }
    /**
      @param letters number of letters
      @param numbers number of numbers
      @param either number of either letters or numbers
    */
    static randString(letters, numbers, either) {
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
    static generateToken(length = 6, options = {}) {
        return tokenGen.generate(length, {
            digits: true,
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            ...options,
        });
    }
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    static cleanQuery(value) {
        if (!value) {
            return null;
        }
        if (value === '') {
            return null;
        }
        return value;
    }
    static shuffleArray(array) {
        const shuffled = array.sort(() => Math.random() - 0.5);
        return shuffled;
    }
    static isEmail(text) {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return regexExp.test(text);
    }
    static moneyFormat(amount, currency = 'NGN') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            currencyDisplay: 'symbol',
        }).format(amount);
    }
    static getCurrencySymbol(currency) {
        const currencies = {
            NGN: '₦',
            USD: '$',
            GBP: '£',
            EUR: '€',
        };
        return currencies[currency];
    }
    // static async cloudinaryUpload(file: Express.Multer.File, options?: Record<string, unknown>) {
    //   const storage = new CloudStorage(new Cloudinary());
    //   const folder = isProd() ? 'production' : 'development';
    //   options.folder = `${folder}/${options.folder}`;
    //   const { path } = file;
    //   const fileUrl = await storage.uploadFile(path, undefined, options);
    //   return fileUrl;
    // }
    static formatDate(date, format = 'YYYY-MM-DD') {
        return (0, dayjs_1.default)(date).format(format);
    }
    static removeEmptyObjValues(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
    }
    static removeEmptyObjKeysOrValues(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([k, v]) => k && v));
    }
}
exports.Helper = Helper;
Helper.faker = faker_1.faker;
Helper.dayjs = dayjs_1.default;
