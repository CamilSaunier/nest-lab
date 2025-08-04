import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [
    // Charge automatiquement .env et le rend accessible partout
    ConfigModule.forRoot({
      isGlobal: true, // évite de devoir importer ConfigModule partout
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true, // optionnel, mais pratique
    }),
    UsersModule,
    PublicationsModule,
  ],
})
export class AppModule {}
