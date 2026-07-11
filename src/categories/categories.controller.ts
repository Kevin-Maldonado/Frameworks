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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorias activas' })
  @ApiOkResponse({
    description: 'Listado de categorias activas',
    type: CategoryEntity,
    isArray: true,
  })
  getAllCategories() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoria activa por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoria', example: 1 })
  @ApiOkResponse({
    description: 'Categoria encontrada',
    type: CategoryEntity,
  })
  @ApiNotFoundResponse({ description: 'La categoria no existe' })
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoria' })
  @ApiCreatedResponse({
    description: 'Categoria creada exitosamente',
    type: CategoryEntity,
  })
  @ApiConflictResponse({
    description: 'Ya existe una categoria con ese nombre',
  })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoria existente' })
  @ApiParam({ name: 'id', description: 'ID de la categoria', example: 1 })
  @ApiOkResponse({
    description: 'Categoria actualizada exitosamente',
    type: CategoryEntity,
  })
  @ApiNotFoundResponse({ description: 'La categoria no existe' })
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar una categoria (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID de la categoria', example: 1 })
  @ApiOkResponse({
    description: 'Categoria desactivada exitosamente',
    type: CategoryEntity,
  })
  @ApiNotFoundResponse({ description: 'La categoria no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
