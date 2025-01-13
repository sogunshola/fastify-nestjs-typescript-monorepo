import { IStorage } from './IStorage';
export declare class CloudStorage {
    private readonly storage;
    constructor(storage: IStorage);
    getFileUrl(filename: string): Promise<string>;
    uploadFile(filenameOrPath: string, body?: Buffer | Express.Multer.File, options?: Record<string, unknown>): Promise<string>;
    downloadFile(filename: string): Promise<Buffer>;
}
//# sourceMappingURL=storage.d.ts.map