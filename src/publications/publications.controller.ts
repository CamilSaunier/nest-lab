import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationsService } from './services/publications.service';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {
    console.log('PublicationsController instancié');
  }

  // Requête GET pour récupérer toutes les publications
  @Get()
  async findAll() {
    return this.publicationsService.findAll();
  }

  // Requête GET pour récupérer une publication par son ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.publicationsService.findOneBy({ id: +id });
  }

  // Requête POST pour créer une nouvelle publication
  @Post()
  async create(@Body() dto: CreatePublicationDto) {
    return this.publicationsService.createPublication(dto);
  }

  // Requête PUT pour mettre à jour une publication par son ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePublicationDto) {
    // spread operator pour ajouter l'id à l'objet dto
    // et le convertir en number
    // car l'ID est reçu en string depuis les paramètres de la route
    // et le service attend un number
    console.log('DTO reçu:', dto);
    console.log('DTO envoyé au service:', { ...dto, id: +id });
    return this.publicationsService.updatePublication({ ...dto, id: +id });
  }

  // Requête DELETE pour supprimer une publication par son ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.publicationsService.deletePublication(+id);
  }
}
