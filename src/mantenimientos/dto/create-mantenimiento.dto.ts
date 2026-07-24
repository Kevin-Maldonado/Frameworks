import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MantenimientoStatus } from '../../generated/prisma/enums';

export class CreateMantenimientoDto {
  @IsInt()
  @IsNotEmpty({ message: 'El ID del equipo es obligatorio' })
  equipoId!: number;

  @IsInt()
  @IsNotEmpty({ message: 'El ID del técnico asignado es obligatorio' })
  userId!: number;

  @IsString()
  @IsNotEmpty({ message: 'La fecha programada es requerida' })
  scheduledAt!: string; // Recibe formato ISO en el payload JSON

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber({}, { message: 'El costo debe ser un número válido' })
  @Min(0, { message: 'El costo no puede ser un valor negativo' })
  cost!: number;

  @IsEnum(MantenimientoStatus)
  @IsOptional()
  status?: MantenimientoStatus;
}