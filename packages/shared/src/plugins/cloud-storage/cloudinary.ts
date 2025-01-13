import { v2 } from 'cloudinary';
import { IStorage } from './IStorage';

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export class Cloudinary implements IStorage {
  private cloudinary;
  constructor(config: CloudinaryConfig) {
    this.cloudinary = v2;
    this.cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });
  }

  async getFileUrl(filename: string): Promise<string> {
    const { secure_url } = await this.cloudinary.uploader.upload(filename);
    return secure_url;
  }

  async uploadFile(path: string, body?: Buffer, option?: Record<string, unknown>): Promise<string> {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      ...option,
    };
    const { secure_url } = await this.cloudinary.uploader.upload(path, options);
    return secure_url;
  }

  async downloadFile(filename: string): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }
}
