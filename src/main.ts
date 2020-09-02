import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  // if NODE_ENV its not defined, the config takes the development mode config by default
  // this will get the server value from default.yml and development.yml 
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap'); // filename goes in the quotes which is displayed when the logger logs the information
  const app = await NestFactory.create(AppModule);
  app.enableCors();  
  console.log(serverConfig);
  // to user process use the following command to start the app:- PORT=3005 yarn start:dev
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application running of port : ${port}`);
}
bootstrap();
