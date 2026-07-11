import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({
    description: 'Identificador unico de la categoria',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Nombre unico de la categoria o asignatura',
    example: 'Desarrollo Backend con NestJS',
  })
  name!: string;

  @ApiProperty({
    description: 'Descripcion breve de los temas que abarca',
    example: 'Conceptos de arquitectura, inyeccion de depedencias y ORMs',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    description: 'Indica si la categoria esta activa (soft delete)',
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'Fecha de creacion de la categoria',
    example: '2026-07-11T15:30:00.000Z',
  })
  createdAt!: Date;
}
