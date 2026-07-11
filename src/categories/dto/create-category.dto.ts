/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre unico de la categoria o asignatura',
    example: 'Desarrollo Backend con NestJS',
  })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name!: string;

  @ApiProperty({
    description: 'Descripcion breve de los temas que abarca',
    example: 'Conceptos de arquitectura, inyeccion de depedencias y ORMs',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
