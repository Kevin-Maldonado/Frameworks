import { Body, Controller, Get, Post } from '@nestjs/common';
import { MentorshipsService } from './mentorships.service';

@Controller('mentorships')
export class MentorshipsController {
  constructor(private readonly mentorshipsService: MentorshipsService) {}

  @Post()
  create(
    @Body('studentId') studentId: number,
    @Body('mentorId') mentorId: number,
    @Body('categoryId') categoryId: number,
    @Body('scheduleAt') scheduleAt: string,
    @Body('notes') notes?: string,
  ) {
    return this.mentorshipsService.create(
      studentId,
      mentorId,
      categoryId,
      scheduleAt,
      notes,
    );
  }

  @Get()
  getAll(): any[] {
    return this.mentorshipsService.findAll();
  }
}
