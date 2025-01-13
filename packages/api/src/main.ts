import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utility/all-exceptions.filter';
import { env } from '@monorepo/shared';
import multipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(`Tech test API`)
    .setDescription(`The @monorepo/ap API description`)
    .setVersion('1.0')
    .addBearerAuth()
    .setExternalDoc('Postman Collection', '/swagger-json')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      persistAuthorization: true,
      customSiteTitle: `@monorepo/api API Docs`,
    },
  });

  app.enableCors();

  await app.register(multipart);
  await app.listen(env.port || 3000);
  console.log(
    `Application is running on: localhost:${env.port || 3000}. \nSwagger documentation is available at: localhost:${env.port || 3000}/swagger`,
  );
}
bootstrap();
