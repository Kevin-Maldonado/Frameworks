/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/generated/prisma/enums';

export class CreateMentorshipDto {
  @ApiProperty({
    description: 'Fecha y hora agendada para la mentoria (formato ISO8601)',
    example: '2026-07-20T15:00:00.000Z',
  })
  @IsISO8601(
    {},
    { message: 'La fecha scheduledAt debe ser formato ISO8601 valido' },
  )
  scheduledAt!: string;

  @ApiProperty({
    description: 'Notas u observaciones sobre la mentoria',
    example: 'Repasar inyeccion de dependencias y modulos',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'ID del usuario estudiante que solicita la mentoria',
    example: 1,
  })
  @IsInt({ message: 'El studentId debe ser un número entero' })
  studentId!: number;

  @ApiProperty({
    description: 'ID del usuario mentor que impartira la mentoria',
    example: 2,
  })
  @IsInt({ message: 'El mentorId debe ser un número entero' })
  mentorId!: number;

  @ApiProperty({
    description: 'ID de la categoria o asignatura de la mentoria',
    example: 1,
  })
  @IsInt({ message: 'El categoryId debe ser un número entero' })
  categoryId!: number;
}

export class UpdateMentorShipStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la mentoria',
    enum: Status,
    example: Status.ACCEPTED,
  })
  @IsEnum(Status, {
    message: 'El estado debe ser PENDING, ACCEPTED o REJECTED',
  })
  status!: Status;
}
