import { Module } from '@nestjs/common';
import { MentorshipsController } from './mentorships.controller';
import { MentorshipsService } from './mentorships.service';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [UsersModule, CategoriesModule],
  controllers: [MentorshipsController],
  providers: [MentorshipsService],
})
export class MentorshipsModule {}
