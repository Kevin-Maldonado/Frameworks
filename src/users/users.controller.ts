import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios activos' })
  @ApiOkResponse({
    description: 'Listado de usuarios activos',
    type: UserEntity,
    isArray: true,
  })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario activo por su ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 1 })
  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'El usuario no existe' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiCreatedResponse({
    description: 'Usuario creado exitosamente',
    type: UserEntity,
  })
  @ApiConflictResponse({ description: 'Ya existe un usuario con ese correo' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 1 })
  @ApiOkResponse({
    description: 'Usuario actualizado exitosamente',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'El usuario no existe' })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un usuario (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 1 })
  @ApiOkResponse({
    description: 'Usuario desactivado exitosamente',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'El usuario no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
