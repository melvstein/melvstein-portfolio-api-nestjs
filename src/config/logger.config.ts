import { ConsoleLogger } from '@nestjs/common';

export const loggerConfig = new ConsoleLogger({
  json: process.env.ENABLE_JSON_LOGS === 'true',
  colors: true,
});
