export interface IStorage {
  getFileUrl(filename: string): Promise<string>;
  uploadFile(
    filenameOrPath: string,
    body?: Buffer | any,
    options?: Record<string, unknown>,
  ): Promise<string>;
  downloadFile(filename: string): Promise<Buffer>;
}
