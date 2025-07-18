import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //requête GET pour récupérer tous les utilisateurs
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  //requête POST pour créer un nouvel utilisateur
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
