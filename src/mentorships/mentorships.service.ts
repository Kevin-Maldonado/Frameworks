import { BadRequestException, Injectable } from '@nestjs/common';
import { Mentorship } from './interfaces/mentorship.interface';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class MentorshipsService {
  private mentorships: Mentorship[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  create(
    studentId: number,
    mentorId: number,
    categoryId: number,
    scheduleAt: string,
    notes?: string,
  ) {
    const student = this.usersService.findOne(studentId);
    const mentor = this.usersService.findOne(mentorId);
    const category = this.categoriesService.findOne(categoryId);

    if (!student || student.role !== 'STUDENT') {
      throw new BadRequestException(
        'El ID del estudiante no es válido o no tiene el rol de STUDENT',
      );
    }
    if (!mentor || mentor.role !== 'MENTOR') {
      throw new BadRequestException(
        'El ID del mentor no es válido o no tiene el rol de MENTOR',
      );
    }
    if (!category) {
      throw new BadRequestException('La categoría especifica no existe');
    }

    const newMentorship: Mentorship = {
      id: this.mentorships.length + 1,
      studentId,
      mentorId,
      categoryId,
      scheduleAt,
      notes,
      status: 'PENDING',
      isActive: true,
    };

    this.mentorships.push(newMentorship);
    return newMentorship;
  }

  findAll(): any[] {
    return this.mentorships
      .filter((m) => m.isActive)
      .map((m) => ({
        id: m.id,
        scheduleAt: m.scheduleAt,
        status: m.status,
        notes: m.notes,
        student: this.usersService.findOne(m.studentId),
        mentor: this.usersService.findOne(m.mentorId),
        category: this.categoriesService.findOne(m.categoryId),
      }));
  }
}
