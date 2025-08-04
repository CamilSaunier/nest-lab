import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe est un middleware qui utulise la librairie class-validator pour valider
  // les objet reçus dans les requêtes HTTP (comme les DTOs). avant d'atteindre les contrôleurs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignore les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // renvoie une erreur si des propriétés non définies dans le DTO sont présentes
      transform: true, // transforme les données entrantes en instances de classe
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  // Log the error and exit the process
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
