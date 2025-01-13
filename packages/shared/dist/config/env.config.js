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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = __importStar(require("dotenv"));
const envVar = __importStar(require("env-var"));
dotenv.config();
exports.env = {
    appName: envVar.get('APP_NAME').required().asString(),
    jwtSecret: envVar.get('JWT_SECRET').required().asString(),
    expiresIn: (_a = envVar.get('JWT_DURATION').asString()) !== null && _a !== void 0 ? _a : '5 year',
    databaseUrl: envVar.get('DATABASE_URL').required().asString(),
    port: (_b = envVar.get('PORT').asInt()) !== null && _b !== void 0 ? _b : 3000,
    dbLogging: envVar.get('DATABASE_LOGGING').asBool(),
    docsPassword: envVar.get('DOCS_PASSWORD').required().asString(),
    redisUrl: envVar.get('REDIS_URL').required().asString(),
    emailHost: envVar.get('EMAIL_HOST').required().asString(),
    emailUser: envVar.get('EMAIL_USER').required().asString(),
    emailPassword: envVar.get('EMAIL_PASSWORD').required().asString(),
    environment: envVar.get('NODE_ENV').required().asString(),
    awsAccessKey: envVar.get('AWS_ACCESS_KEY').required().asString(),
    awsSecretKey: envVar.get('AWS_SECRET_KEY').required().asString(),
    s3BucketName: envVar.get('S3_BUCKET_NAME').required().asString(),
    awsRegion: envVar.get('AWS_REGION').required().asString(),
    cloudinary: {
        cloudName: envVar.get('CLOUDINARY_CLOUD_NAME').required().asString(),
        apiKey: envVar.get('CLOUDINARY_API_KEY').required().asString(),
        apiSecret: envVar.get('CLOUDINARY_API_SECRET').required().asString(),
    },
    smtp: {
        smtpHost: envVar.get('SMTP_HOST').required().asString(),
        smtpPort: envVar.get('SMTP_PORT').required().asString(),
        smtpUser: envVar.get('SMTP_USER').required().asString(),
        smtpPass: envVar.get('SMTP_PASS').required().asString(),
    },
};
