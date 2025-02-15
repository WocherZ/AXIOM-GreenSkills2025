import { Module } from '@nestjs/common';

import { WsGateway } from './ws.gateway';
import { FileUploadGateway } from './file-upload.gateway';

@Module({
  providers: [WsGateway, FileUploadGateway],
  exports: [WsGateway, FileUploadGateway],
})
export class WsModule {}
