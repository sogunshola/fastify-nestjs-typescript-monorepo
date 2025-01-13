import { S3 } from 'aws-sdk';
import { IStorage } from './IStorage';
export interface AWSS3Config {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucketName: string;
}
export declare class AWSStorage implements IStorage {
    private config;
    constructor(config: AWSS3Config);
    s3(): S3;
    getFileMetadata(filename: string): Promise<S3.GetObjectOutput>;
    bucketExist(): Promise<S3.GetBucketLocationOutput>;
    getListBucket(): Promise<S3.ListBucketsOutput>;
    downloadFile(filename: string): Promise<Buffer>;
    getFileUrl(filename: string): Promise<string>;
    uploadFile(filename: string, body: Buffer): Promise<string>;
}
//# sourceMappingURL=aws-s3.d.ts.map