import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  // Ici, tous les champs de CreatePublicationDto sont optionnels
  // grâce à PartialType, ce qui permet de mettre à jour partiellement une publication
}
