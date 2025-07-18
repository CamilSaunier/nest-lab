import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsOptional,
  IsString,
  IsEmail,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Tu peux surcharger des règles si besoin :

  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email invalide.' })
  email?: string;

  @IsOptional()
  @MinLength(8, {
    message: 'Le mot de passe doit faire au moins 8 caractères.',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Le mot de passe doit contenir une minuscule.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Le mot de passe doit contenir une majuscule.',
  })
  @Matches(/(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?])/, {
    message: 'Le mot de passe doit contenir un caractère spécial.',
  })
  password?: string;
}
