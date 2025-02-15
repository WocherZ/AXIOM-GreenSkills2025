import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

interface FileMetadata {
  fileName: string;
  totalParts: number;
  chunks: Buffer[];
}

@WebSocketGateway({ namespace: '/socket.io' })
export class FileUploadGateway {
  @WebSocketServer()
  server: Server;

  private s3Client: S3Client;
  private fileMetadataMap: Map<string, FileMetadata> = new Map(); // Map to store file metadata

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.MINIO_REGION,
      endpoint: process.env.MINIO_ENDPOINT,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },
    });
  }

  @SubscribeMessage('uploadChunk')
  async handleFileUpload(
    @MessageBody()
    data: {
      chunk: Buffer;
      fileName: string;
      fileId: string;
      partNumber: number;
      totalParts: number;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { chunk, fileName, fileId, partNumber, totalParts } = data;

    try {
      if (!this.fileMetadataMap.has(fileId)) {
        this.fileMetadataMap.set(fileId, {
          fileName,
          totalParts,
          chunks: [],
        });
      }

      const fileMetadata = this.fileMetadataMap.get(fileId);
      fileMetadata.chunks[partNumber - 1] = chunk; // Store the chunk at the correct index

      client.emit('uploadProgress', { fileId, partNumber, status: 'uploaded' });

      if (partNumber === totalParts) {
        const reassembledFile = Buffer.concat(fileMetadata.chunks);

        const upload = new Upload({
          client: this.s3Client,
          params: {
            Bucket: process.env.MINIO_BUCKET_NAME,
            Key: fileName,
            Body: reassembledFile,
          },
        });

        console.log('[UPLOAD]', upload);

        upload.on('httpUploadProgress', (progress) => {
          console.log(`File ${fileId} upload progress:`, progress);
          client.emit('processingProgress', { fileId, progress });
        });

        await upload.done();

        client.emit('uploadComplete', { fileId, fileName });

        this.fileMetadataMap.delete(fileId);
      }
    } catch (error) {
      console.error(
        `Error uploading file ${fileId} - Part ${partNumber}:`,
        error,
      );
      client.emit('uploadError', { fileId, partNumber, error: error.message });
    }
  }
}
