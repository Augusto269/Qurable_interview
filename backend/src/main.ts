import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'], // Allow your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials to be included in requests
  });

  const config = {
    appName: 'Qurable backend',
    port: 5001,
    environment: process.env.NODE_ENV || 'development',
    skipDocEnvs: ['sandbox', 'production'],
  };
  if (config.environment === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Qurable backend Manager API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(process.env.PORT || 5001);
}
bootstrap();
