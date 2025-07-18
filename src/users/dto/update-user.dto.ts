import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// utilisation de CreateUserDTO comme base pour UpdateUserDto
// PartialType permet de rendre tous les champs de CreateUserDto optionnels
// sans affecté les règles de validation déjà définies
export class UpdateUserDto extends PartialType(CreateUserDto) {}
