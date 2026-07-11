import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/generated/prisma/enums';

export class MentorshipEntity {
  @ApiProperty({
    description: 'Identificador unico de la mentoria',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Fecha y hora agendada para la mentoria',
    example: '2026-07-20T15:00:00.000Z',
  })
  scheduleAt!: Date;

  @ApiProperty({
    description: 'Estado actual de la mentoria',
    enum: Status,
    example: Status.PENDING,
  })
  status!: Status;

  @ApiProperty({
    description: 'Notas u observaciones sobre la mentoria',
    example: 'Repasar inyeccion de dependencias y modulos',
    nullable: true,
  })
  notes!: string | null;

  @ApiProperty({
    description: 'Indica si la mentoria esta activa (soft delete)',
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'ID del usuario estudiante',
    example: 1,
  })
  studentId!: number;

  @ApiProperty({
    description: 'ID del usuario mentor',
    example: 2,
  })
  mentorId!: number;

  @ApiProperty({
    description: 'ID de la categoria de la mentoria',
    example: 1,
  })
  categoryId!: number;

  @ApiProperty({
    description: 'Fecha de creacion del registro',
    example: '2026-07-11T15:30:00.000Z',
  })
  createdAt!: Date;
}
