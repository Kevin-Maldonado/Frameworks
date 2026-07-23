import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEquipoDto: CreateEquipoDto) {
    // Validar si el número de serie ya existe
    const exists = await this.prisma.equipo.findUnique({
      where: { serialNumber: createEquipoDto.serialNumber },
    });

    if (exists) {
      throw new ConflictException('El número de serie ya se encuentra registrado');
    }

    return this.prisma.equipo.create({
      data: createEquipoDto,
      include: { category: true },
    });
  }

  async findAll() {
    return this.prisma.equipo.findMany({
      where: { isActive: true },
      include: { category: true },
    });
  }

  async findOne(id: number) {
    const equipo = await this.prisma.equipo.findUnique({
      where: { id },
      include: { category: true, mantenimientos: true },
    });

    if (!equipo || !equipo.isActive) {
      throw new NotFoundException(`El equipo con ID ${id} no existe`);
    }

    return equipo;
  }
}