import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Mentorias Academicas')
    .setDescription(
      'Sistema integral para la gestion de mentorias, alumnos y categorias de asignaturas',
    )
    .setVersion('1.0')
    .addTag('Users', 'Operaciones con Mentores y Estudiantes')
    .addTag('Categories', 'Gestion de areas de conocimiento')
    .addTag('Mentorships', 'Transacciones y flujo de citas de mentorias')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
