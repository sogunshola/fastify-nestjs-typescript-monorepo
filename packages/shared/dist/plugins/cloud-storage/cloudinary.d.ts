import { IStorage } from './IStorage';
export interface CloudinaryConfig {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
}
export declare class Cloudinary implements IStorage {
    private cloudinary;
    constructor(config: CloudinaryConfig);
    getFileUrl(filename: string): Promise<string>;
    uploadFile(path: string, body?: Buffer, option?: Record<string, unknown>): Promise<string>;
    downloadFile(filename: string): Promise<Buffer>;
}
//# sourceMappingURL=cloudinary.d.ts.map