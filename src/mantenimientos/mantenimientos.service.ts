import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { EquipoStatus } from '../generated/prisma/enums';

@Injectable()
export class MantenimientosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMantenimientoDto) {
    // 1. Regla de Negocio: Verificar que el equipo exista
    const equipo = await this.prisma.equipo.findUnique({
      where: { id: dto.equipoId },
    });

    if (!equipo || !equipo.isActive) {
      throw new NotFoundException(`El equipo con ID ${dto.equipoId} no fue encontrado`);
    }

    // 2. Regla de Negocio: No se permite mantenimiento si el equipo está de BAJA
    if (equipo.status === EquipoStatus.BAJA) {
      throw new BadRequestException('No se puede asignar un mantenimiento a un equipo dado de BAJA');
    }

    // 3. Transacción: Registrar Mantenimiento y Actualizar Estado del Equipo a EN_MANTENIMIENTO
    return this.prisma.$transaction(async (tx) => {
      const mantenimiento = await tx.mantenimiento.create({
        data: {
          equipoId: dto.equipoId,
          technicianId: dto.technicianId,
          scheduledAt: new Date(dto.scheduledAt),
          notes: dto.notes,
          cost: dto.cost,
          status: dto.status,
        },
      });

      // Cambiar el estado del equipo automáticamente
      await tx.equipo.update({
        where: { id: dto.equipoId },
        data: { status: EquipoStatus.EN_MANTENIMIENTO },
      });

      return mantenimiento;
    });
  }

  async findAll() {
    return this.prisma.mantenimiento.findMany({
      include: {
        equipo: true,
        technician: { select: { id: true, name: true, email: true } },
      },
    });
  }
}