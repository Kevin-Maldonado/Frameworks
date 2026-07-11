import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/generated/prisma/enums';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';

@Injectable()
export class MentorshipsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.mentorship.findMany({
      where: { isActive: true },
    });
  }

  async findOne(id: number) {
    const mentorship = await this.prisma.mentorship.findFirst({
      where: { id, isActive: true },
    });

    if (!mentorship)
      throw new NotFoundException(`Mentoria con ID ${id} no encontrada`);

    return mentorship;
  }

  async create(createMentorshipDto: CreateMentorshipDto) {
    const { studentId, mentorId, categoryId, scheduledAt, notes } =
      createMentorshipDto;

    const student = await this.prisma.user.findFirst({
      where: { id: studentId, isActive: true },
    });
    if (!student || student.role !== Role.STUDENT) {
      throw new BadRequestException(
        'El ID del estudiante no es válido o no tiene el rol de STUDENT',
      );
    }

    const mentor = await this.prisma.user.findFirst({
      where: { id: mentorId, isActive: true },
    });
    if (!mentor || mentor.role !== Role.MENTOR) {
      throw new BadRequestException(
        'El ID del mentor no es válido o no tiene el rol de MENTOR',
      );
    }

    const category = await this.prisma.category.findFirst({
      where: { id: categoryId, isActive: true },
    });
    if (!category) {
      throw new BadRequestException('La categoría especifica no existe');
    }

    return this.prisma.mentorship.create({
      data: {
        studentId,
        mentorId,
        categoryId,
        scheduleAt: new Date(scheduledAt),
        notes,
      },
    });
  }
}
