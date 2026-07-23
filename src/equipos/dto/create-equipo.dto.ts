import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EquipoStatus } from '../../generated/prisma/enums';

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty({ message: 'El número de serie es obligatorio' })
  serialNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del equipo es obligatorio' })
  name: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsInt({ message: 'El ID de la categoría debe ser un número entero' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  categoryId: number;

  @IsEnum(EquipoStatus)
  @IsOptional()
  status?: EquipoStatus;
}