import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as chalk from 'chalk';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Startups For All Events API')
    .setDescription(
      'An API for accessing, creating, updating, and removing events from the Startups For All shared events calendar.'
    )
    .setVersion('0.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || process.env.PORT || 1323;
  await app.listen(port);
  console.log(
    `${chalk.yellow.bold('API is running at:')} ${chalk.underline.magentaBright.bold(`${await app.getUrl()}`)}`
  );
}
bootstrap();
