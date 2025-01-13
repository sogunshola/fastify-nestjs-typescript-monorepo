import { IStorage } from './IStorage';

export class CloudStorage {
  constructor(private readonly storage: IStorage) {}

  async getFileUrl(filename: string): Promise<string> {
    return this.storage.getFileUrl(filename);
  }

  async uploadFile(
    filenameOrPath: string,
    body?: Buffer | unknown,
    options?: Record<string, unknown>,
  ): Promise<string> {
    return this.storage.uploadFile(filenameOrPath, body, options);
  }

  async downloadFile(filename: string): Promise<Buffer> {
    return this.storage.downloadFile(filename);
  }
}
