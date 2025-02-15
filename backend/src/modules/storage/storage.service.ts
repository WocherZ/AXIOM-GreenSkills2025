import { Injectable } from '@nestjs/common';
import {
  GetObjectCommandOutput,
  PutObjectCommandOutput,
  S3,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private S3: S3;

  private BUCKET: string;

  constructor() {
    this.S3 = new S3({
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },

      endpoint: process.env.MINIO_ENDPOINT,
      region: process.env.MINIO_REGION,

      forcePathStyle: true,
    });
    this.BUCKET = process.env.MINIO_BUCKET_NAME || '';
  }

  async uploadFile(
    file: Buffer,
    fileKey: string,
  ): Promise<PutObjectCommandOutput> {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.BUCKET,
        Key: fileKey,
        Body: file,
      };
      this.S3.putObject(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  // async uploadFileInChunks(
  //   fileBuffer: Buffer,
  //   fileName: string,
  //   bucketName: string,
  // ): Promise<void> {
  //   const upload = new Upload({
  //     client: this.S3,
  //     params: {
  //       Bucket: bucketName,
  //       Key: fileName,
  //       Body: fileBuffer,
  //     },
  //   });

  //   upload.on('httpUploadProgress', (progress) => {
  //     console.log(progress);
  //   });

  //   await upload.done();
  // }

  async deleteFile(fileKey: string) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.BUCKET,
        Key: fileKey,
      };
      this.S3.deleteObject(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }

  async getObject(Key: string): Promise<GetObjectCommandOutput> {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.BUCKET,
        Key,
      };
      this.S3.getObject(params, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }
}
