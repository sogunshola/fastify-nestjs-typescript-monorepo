"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSStorage = void 0;
/* eslint-disable @typescript-eslint/no-shadow */
const aws_sdk_1 = require("aws-sdk");
const winston_1 = require("../../config/winston");
class AWSStorage {
    constructor(config) {
        this.config = config;
    }
    s3() {
        return new aws_sdk_1.S3({
            apiVersion: '2012-10-17',
            // eslint-disable-next-line etc/no-commented-out-code
            // credentials: {
            //   accessKeyId: env.awsAccessKey,
            //   secretAccessKey: env.awsAccessKey,
            // },
            region: this.config.region,
            logger: {
                log(content) {
                    winston_1.logger.info(`S3 CloudStorage Info: ${content}`);
                },
                warn(content) {
                    winston_1.logger.warn(`S3 CloudStorage Warning: ${content}`);
                },
            },
        });
    }
    getFileMetadata(filename) {
        return new Promise((resolve, reject) => {
            this.s3().getBucketLocation({ Bucket: this.config.bucketName }, (err, result) => {
                if (result) {
                    this.s3().getObject({ Bucket: this.config.bucketName, Key: filename, ResponseContentType: 'application/octet-stream' }, (err, result) => {
                        if (!err) {
                            resolve(result);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    }
    bucketExist() {
        return new Promise((resolve, reject) => {
            this.s3().getBucketLocation({ Bucket: this.config.bucketName }, (err, result) => {
                if (!err) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    getListBucket() {
        return new Promise((resolve, reject) => {
            this.s3().listBuckets((err, result) => {
                if (!err) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    downloadFile(filename) {
        return new Promise((resolve, reject) => {
            this.s3().getBucketLocation({ Bucket: this.config.bucketName }, (err, result) => {
                if (result) {
                    this.s3().getObject({ Bucket: this.config.bucketName, Key: filename }, (err, result) => {
                        if (!err) {
                            resolve(result.Body);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    }
    getFileUrl(filename) {
        return new Promise((resolve, reject) => {
            this.s3().getBucketLocation({ Bucket: this.config.bucketName }, (err, result) => {
                if (result) {
                    this.s3().getSignedUrl(this.config.bucketName, filename, (err, result) => {
                        if (!err) {
                            resolve(result);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    }
    uploadFile(filename, body) {
        return new Promise((resolve, reject) => {
            this.s3().getBucketLocation({ Bucket: this.config.bucketName }, (err, result) => {
                if (result) {
                    this.s3().upload({ Bucket: this.config.bucketName, Key: filename, Body: body, ACL: 'public-read' }, (err, result) => {
                        if (!err) {
                            resolve(result.Location);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
exports.AWSStorage = AWSStorage;
