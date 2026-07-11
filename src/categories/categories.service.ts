import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findFirst({
      where: { id, isActive: true },
    });

    if (!category)
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });
    if (exists) throw new ConflictException('La categoria ya existe');

    return this.prisma.category.create({ data: createCategoryDto });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
