import winston from 'winston';

const convertToMsg = winston.format((info) => {
  info.msg = info.message;
  delete info.message;
  return info;
});

export const loggerDateFormat = 'YYYY-MM-DD HH:mm:ss';

const l = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp({
      format: loggerDateFormat,
    }),
    convertToMsg(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

const logger = {
  ...l,
  log: function (...msg: Array<string | Record<string, unknown>>) {
    let message = '';
    for (const i in msg) {
      if (parseInt(i) > 0) message += ', ';
      if (typeof msg[i] === 'string') message += msg[i];
      else if (typeof msg[i] === 'object') message += JSON.stringify(msg[i]);
    }
    l.info(message);
  },
  /**
   * Функция для логирования ошибки. Логирует два поля: message и stack
   * Использовать необходимо так как stringify с заранее заданной схемой работает гораздо быстрее чем рандомный stringify
   * @returns
   */
  error: function (err: Error | unknown, msg?: string) {
    const error = err as Error;
    l.error(
      JSON.stringify({
        message: `${msg ? msg + ' ' : ''}${error.message}`,
        stack: error ? error.stack : '',
      }),
    );
  },
};

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[APP]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
  ),
);

const logger1 = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime,
      ),
    }),
  ],
});

export { logger, logger1 };
