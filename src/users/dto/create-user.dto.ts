/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'Correo electronico unico del usuario',
    example: 'juan@email.com',
  })
  @IsEmail({}, { message: 'El correo electronico no es valido' })
  email!: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Alumno',
  })
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name!: string;

  @ApiProperty({
    description: 'Rol del usuario dentro del sistema',
    enum: Role,
    example: Role.STUDENT,
  })
  @IsEnum(Role, { message: 'El rol no es valido, debe ser STUDENT o MENTOR' })
  role!: Role;
}
