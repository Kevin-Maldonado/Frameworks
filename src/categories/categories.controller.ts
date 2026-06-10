import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.findOne(Number(id));
  }

  @Post()
  createCategory(
    @Body('name') name: string,
    @Body('description') description?: string,
  ) {
    return this.categoriesService.create(name, description);
  }
}
