import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { logger } from '../libs/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    logger.error(exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const error = {
      message: 'Server error',
      validationFieldsErrors: [] as ValidationError[],
    };
    if (exception instanceof HttpException) {
      const response: any = exception.getResponse();
      if (
        response instanceof Object &&
        response.hasOwnProperty('pipeValidation')
      ) {
        if (response.hasOwnProperty('errors')) {
          error.validationFieldsErrors = response['errors'];
        }
      }
      error.message = exception.message;
      httpStatus = exception.getStatus();
    }

    const responseBody = {
      error,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
