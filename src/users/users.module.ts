import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // permet à Nest d'injecter Repository<User>
  providers: [UsersService], // permet à Nest d'injecter UsersService dans UsersController
  controllers: [UsersController], // permet à Nest de gérer les routes définies dans UsersController
  exports: [UsersService], //si d'autres modules utilisent UserService on utilise exports
})
export class UsersModule {}
