import { Module } from '@nestjs/common';
import { MentorshipsController } from './mentorships.controller';
import { MentorshipsService } from './mentorships.service';

@Module({
  controllers: [MentorshipsController],
  providers: [MentorshipsService],
})
export class MentorshipsModule {}
