import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('helthcheck')
export class AppController {
  @Get('helthcheck')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Api is ready' })
  isReady(): string {
    return 'ok';
  }
}
