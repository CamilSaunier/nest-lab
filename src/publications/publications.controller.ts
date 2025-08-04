import { Controller, Post, Body } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationsService } from './services/publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() dto: CreatePublicationDto) {
    return this.publicationsService.createPublication(dto);
  }
}
