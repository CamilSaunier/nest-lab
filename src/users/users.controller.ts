import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
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
  //Requête DELETE pour supprimer un utilisateur par son ID
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(+id); // on convertit en number
  }
}
