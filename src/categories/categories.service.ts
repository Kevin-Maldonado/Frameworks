import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (categoryExists) {
      throw new ConflictException('La categoría ya existe');
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { equipos: true } } }, // Devuelve cuántos equipos tiene asociados
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { equipos: true },
    });

    if (!category || !category.isActive) {
      throw new NotFoundException(`La categoría con ID ${id} no existe`);
    }

    return category;
  }
}