"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStorage = void 0;
class CloudStorage {
    constructor(storage) {
        this.storage = storage;
    }
    async getFileUrl(filename) {
        return this.storage.getFileUrl(filename);
    }
    async uploadFile(filenameOrPath, body, options) {
        return this.storage.uploadFile(filenameOrPath, body, options);
    }
    async downloadFile(filename) {
        return this.storage.downloadFile(filename);
    }
}
exports.CloudStorage = CloudStorage;
