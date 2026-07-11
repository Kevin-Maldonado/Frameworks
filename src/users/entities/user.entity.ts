import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/generated/prisma/enums';

export class UserEntity {
  @ApiProperty({
    description: 'Identificador unico del usuario',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Alumno',
  })
  name!: string;

  @ApiProperty({
    description: 'Correo electronico unico del usuario',
    example: 'juan@email.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Rol del usuario dentro del sistema',
    enum: Role,
    example: Role.STUDENT,
  })
  role!: Role;

  @ApiProperty({
    description: 'Indica si el usuario esta activo (soft delete)',
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'Fecha de creacion del usuario',
    example: '2026-07-11T15:30:00.000Z',
  })
  createdAt!: Date;
}
