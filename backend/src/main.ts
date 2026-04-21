import { NestFactory, Reflector } from '@nestjs/core';
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ========================================
  // SEGURIDAD GLOBAL — ValidationPipe
  // ========================================
  // whitelist: elimina propiedades no definidas en el DTO (previene mass assignment)
  // forbidNonWhitelisted: rechaza requests con propiedades extra (detección de ataques)
  // transform: convierte payloads a las instancias DTO para type safety
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ========================================
  // SEGURIDAD GLOBAL — HttpExceptionFilter
  // ========================================
  // Captura todas las excepciones y devuelve respuestas genéricas.
  // Los errores 500 NUNCA exponen stack traces ni mensajes de BD.
  app.useGlobalFilters(new HttpExceptionFilter());

  // ========================================
  // SEGURIDAD GLOBAL — ClassSerializerInterceptor
  // ========================================
  // Aplica @Exclude() y @Expose() de class-transformer a todas las respuestas.
  // Esto garantiza que campos como 'password' marcados con @Exclude()
  // nunca se incluyan en las respuestas JSON.
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // ========================================
  // CORS
  // ========================================
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN || '*',
  });

  // ========================================
  // INICIAR SERVIDOR
  // ========================================
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
  logger.log(`📍 Entorno: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
