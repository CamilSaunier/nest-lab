import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //requête GET pour récupérer tous les utilisateurs
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  //requête GET pour récupérer un utilisateur par son ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  //requête POST pour créer un nouvel utilisateur
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  //requête PUT pour mettre à jour un utilisateur par son ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  //Requête DELETE pour supprimer un utilisateur par son ID
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(+id); // on convertit en number
  }
}
