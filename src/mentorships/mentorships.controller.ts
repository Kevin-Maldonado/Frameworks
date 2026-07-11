import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MentorshipsService } from './mentorships.service';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { MentorshipEntity } from './entities/mentorship.entity';

@ApiTags('Mentorships')
@Controller('mentorships')
export class MentorshipsController {
  constructor(private readonly mentorshipsService: MentorshipsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las mentorias activas' })
  @ApiOkResponse({
    description: 'Listado de mentorias activas',
    type: MentorshipEntity,
    isArray: true,
  })
  getAllMentorships() {
    return this.mentorshipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una mentoria activa por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la mentoria', example: 1 })
  @ApiOkResponse({
    description: 'Mentoria encontrada',
    type: MentorshipEntity,
  })
  @ApiNotFoundResponse({ description: 'La mentoria no existe' })
  getMentorshipById(@Param('id', ParseIntPipe) id: number) {
    return this.mentorshipsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva mentoria' })
  @ApiCreatedResponse({
    description: 'Mentoria creada exitosamente',
    type: MentorshipEntity,
  })
  @ApiBadRequestResponse({
    description:
      'El estudiante, mentor o categoria no son validos o no existen',
  })
  create(@Body() createMentorshipDto: CreateMentorshipDto) {
    return this.mentorshipsService.create(createMentorshipDto);
  }
}
