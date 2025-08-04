import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsService } from './services/publications.service';
import { PublicationsController } from './publications.controller';
import { User } from 'src/users/entities/user.entity';
import { Publication } from './entities/publication.entity';

@Module({
  // Important : je dois déclarer les entités utilisées par ce module
  // pour que TypeOrmModule puisse les gérer
  imports: [TypeOrmModule.forFeature([Publication, User])],
  providers: [PublicationsService],
  controllers: [PublicationsController],
})
export class PublicationsModule {}
