import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import io from 'socket.io';

@WebSocketGateway({ namespace: '/socket.io' })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: io.Server;

  public clients = new Map<unknown, io.Socket>();

  // private receivedChunks: Buffer[] = [];
  // private totalSize = 0;
  // private processingProgress = 0;

  // @SubscribeMessage('uploadChunk')
  // handleUploadChunk(
  //   @MessageBody() chunk: Buffer,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   // Store the received chunk
  //   this.receivedChunks.push(chunk);
  //   this.totalSize += chunk.length;

  //   // Calculate upload progress
  //   const progress = Math.round((this.totalSize / 1024 / 1024) * 100); // Progress in MB
  //   client.emit('uploadProgress', progress);
  // }

  // @SubscribeMessage('uploadComplete')
  // handleUploadComplete(@MessageBody() fileName: string) {
  //   // Concatenate all received chunks into a single buffer
  //   const fileBuffer = Buffer.concat(this.receivedChunks);

  //   console.log('__dirname', __dirname);
  //   console.log('cwd', process.cwd());
  //   // Save the file to the server
  //   writeFile(`${process.cwd()}/public/${fileName}`, fileBuffer, (err) => {
  //     if (err) {
  //       console.error('Error saving file:', err);
  //     } else {
  //       console.log('File saved successfully');

  //       // Simulate processing and send progress updates
  //       this.simulateProcessing(fileName);
  //     }
  //   });
  // }

  // private simulateProcessing(fileName: string) {
  //   const interval = setInterval(() => {
  //     this.processingProgress += 10;
  //     this.server.emit('processingProgress', this.processingProgress);

  //     if (this.processingProgress >= 100) {
  //       clearInterval(interval);
  //       console.log(`Processing of ${fileName} completed`);
  //     }
  //   }, 1000);
  // }

  private getClientQuery(client: io.Socket): Record<string, unknown> {
    return client.handshake.query;
  }

  public broadcastAll(event_name: string, message: Record<string, unknown>) {
    this.server.emit(event_name, message);
  }

  public async handleConnection(client: io.Socket) {
    const { user_id } = this.getClientQuery(client);

    const payload = client.handshake.headers.authorization;

    console.log('[TOKEN]', payload);
    this.clients.set(user_id, client);

    return this.broadcastAll('event', { connected: user_id });
  }

  public async handleDisconnect(client: io.Socket) {
    const { user_id } = this.getClientQuery(client);

    this.clients.delete(user_id);

    return this.broadcastAll('event', { disconnected: user_id });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log(`Received message: ${payload}`);
    return 'Message received';
  }
}
