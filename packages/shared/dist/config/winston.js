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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
const rootPath = __importStar(require("app-root-path"));
const winston = __importStar(require("winston"));
const { format } = winston;
const { align, colorize, combine, label, prettyPrint, printf, timestamp } = format;
const fileOptions = {
    filename: `${rootPath}/logs/cache-${new Date().toISOString().slice(0, 10)}.log`,
    format: combine(timestamp(), align(), printf((info) => `${info.level}: ${info.label} : ${[info.timestamp]}: ${info.message}`)),
};
class Logger {
    constructor(fileName, env) {
        this.transports = [new winston.transports.Console()];
        if (env === "development") {
            this.transports.push(new winston.transports.File(fileOptions));
        }
        this.logger = winston.createLogger(this.logConfiguration(fileName));
    }
    getLogger() {
        return this.logger;
    }
    logConfiguration(fileName) {
        return {
            transports: this.transports,
            format: combine(label({
                label: `🔊 {${fileName}}`,
            }), timestamp(), prettyPrint(), colorize(), printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)),
        };
    }
}
exports.Logger = Logger;
// This is for app logs
const logger = new Logger("API").getLogger();
exports.logger = logger;
