"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
class Cloudinary {
    constructor(config) {
        this.cloudinary = cloudinary_1.v2;
        this.cloudinary.config({
            cloud_name: config.cloudName,
            api_key: config.apiKey,
            api_secret: config.apiSecret,
        });
    }
    async getFileUrl(filename) {
        const { secure_url } = await this.cloudinary.uploader.upload(filename);
        return secure_url;
    }
    async uploadFile(path, body, option) {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            ...option,
        };
        const { secure_url } = await this.cloudinary.uploader.upload(path, options);
        return secure_url;
    }
    async downloadFile(filename) {
        throw new Error('Method not implemented.');
    }
}
exports.Cloudinary = Cloudinary;
