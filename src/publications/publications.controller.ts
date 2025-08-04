import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationsService } from './services/publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  // Requête GET pour récupérer toutes les publications
  @Get()
  async findAll() {
    return this.publicationsService.findAll();
  }

  // Requête POST pour créer une nouvelle publication
  @Post()
  async create(@Body() dto: CreatePublicationDto) {
    return this.publicationsService.createPublication(dto);
  }
}
